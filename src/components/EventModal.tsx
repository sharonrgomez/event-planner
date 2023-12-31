import {useContext, useEffect, useRef, useState} from 'react'
import {AuthContext, GlobalContext} from '../context'
import dayjs from 'dayjs'
import {Button, Date, DateRange, LabelColorSelect} from '.'
import {v4 as uuid} from 'uuid'
import {colorOptions} from './LabelOptionsModal'
import {setFirebaseEvents} from '../context/GlobalContext'
import useClickOutside from '../hooks/useClickOutside'

export type EventType = {
	id: string
	title: string
	description: string
	time: string
	labelColor: string
	allDay: boolean
	startDate: string
	endDate: string
}

const EventModal = () => {
	const {
		setIsEventModalOpen,
		selectedEvent,
		setSelectedEvent,
		selectedDay,
		savedEvents,
		setSavedEvents,
		setIsDeleteConfirmationModalOpen,
		setIsDayEventsModalOpen,
		setIsLabelOptionsModalOpen,
	} = useContext(GlobalContext)
	const {user} = useContext(AuthContext)

	const handleCloseModal = () => {
		setIsEventModalOpen(false)
		setSelectedEvent(null)
	}

	const [required, setRequired] = useState(false)
	const [dateValidation, setDateValidation] = useState(false)

	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : '',
	)
	const [time, setTime] = useState(
		selectedEvent ? selectedEvent.time : dayjs().format('HH:mm'),
	)
	const [allDay, setAllDay] = useState(
		selectedEvent ? selectedEvent.allDay : false,
	)
	const [startDate, setStartDate] = useState(
		selectedEvent ? selectedEvent.startDate : selectedDay.format('YYYY-MM-DD'),
	)
	const [endDate, setEndDate] = useState(
		selectedEvent ? selectedEvent.endDate : selectedDay.format('YYYY-MM-DD'),
	)

	const [colorBubble, setColorBubble] = useState(colorOptions[8])
	const [eventColor, setEventColor] = useState(
		selectedEvent ? selectedEvent.labelColor : '',
	)

	const handleSelectColor = (color: string) => {
		setColorBubble(color)
		setEventColor(color)
		setIsLabelOptionsModalOpen(false)
	}

	useEffect(() => {
		if (title) {
			setRequired(false)
		}

		if (dayjs(startDate).isBefore(dayjs(endDate)) || !allDay) {
			setDateValidation(false)
		}
	}, [title, startDate, endDate, allDay])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!title) {
			setRequired(true)
			return
		}

		if (dayjs(startDate).isAfter(dayjs(endDate))) {
			setDateValidation(true)
			return
		}

		const newEvent = {
			title,
			description,
			time,
			labelColor: eventColor || colorOptions[8],
			id: selectedEvent ? selectedEvent.id : uuid(),
			allDay,
			startDate,
			endDate,
		}

		if (selectedEvent) {
			const updatedEvents = savedEvents.map((event) => {
				if (event.id === selectedEvent.id) {
					return newEvent
				} else {
					return event
				}
			})

			setSavedEvents(updatedEvents)
			setFirebaseEvents(user, updatedEvents)
		} else {
			const updatedEvents = [...savedEvents, newEvent]

			setSavedEvents(updatedEvents)
			setFirebaseEvents(user, updatedEvents)
		}

		setIsEventModalOpen(false)
		setSelectedEvent(null)
	}

	const handleClickDelete = () => {
		setIsDeleteConfirmationModalOpen(true)
		setIsEventModalOpen(false)
		setIsDayEventsModalOpen(false)
	}

	useEffect(() => {
		colorOptions.map((col) => {
			if (selectedEvent && selectedEvent.labelColor === col) {
				setColorBubble(col)
			}
		})
	}, [selectedEvent])

	const ref = useRef<HTMLDivElement>(null)
	useClickOutside(ref, handleCloseModal)

	return (
		<div
			className='h-screen w-full fixed left-0 top-0 flex justify-center items-center z-20'
			data-testid='event-modal'
		>
			<div
				className='bg-white rounded-lg shadow-2xl max-sm:mx-5 max-sm:w-full sm:max-xl:w-1/2 w-1/3'
				ref={ref}
			>
				<form action=''>
					<div className='flex justify-between items-center border-b border-gray-100 px-5 py-4'>
						<div
							className='text-gray-600 font-medium text-xl'
							data-testid='event-modal-title'
						>
							{selectedEvent ? 'Edit ' : 'Add '} event
						</div>

						<div>
							{selectedEvent && (
								<button
									onClick={handleClickDelete}
									className='mr-2'
									type='button'
									data-testid='event-modal-delete-button'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-5 h-5 text-red-500 hover:text-red-700'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
										/>
									</svg>
								</button>
							)}
						</div>
					</div>

					<div className='flex flex-col items-center p-5 pb-1'>
						<div className='flex flex-row items-center w-full'>
							<input
								type='text'
								className='w-full mb-2 mr-1 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
								placeholder='Title'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
							<LabelColorSelect
								onClick={setIsLabelOptionsModalOpen}
								selectedColor={colorBubble}
								onSelectColor={handleSelectColor}
							/>
						</div>
						{required && (
							<p className='text-red-400 text-sm ml-3 w-full'>Please enter a title</p>
						)}

						<div className='flex max-lg:flex-col w-full justify-between items-center mb-2'>
							{allDay ? (
								<DateRange
									startValue={startDate}
									endValue={endDate}
									startDateChangeHandler={(e) => setStartDate(e.target.value)}
									endDateChangeHandler={(e) => setEndDate(e.target.value)}
								/>
							) : (
								<Date
									value={startDate}
									onChangeHandler={(e) => setStartDate(e.target.value)}
								/>
							)}

							{!allDay && (
								<input
									type='time'
									className='w-full p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
									placeholder='Time'
									value={time}
									onChange={(e) => setTime(e.target.value)}
								/>
							)}
						</div>
						{dateValidation && (
							<p className='text-red-400 text-sm ml-3 w-full'>
								Start date must be before end date
							</p>
						)}

						<div className='w-full m-3 mt-0 pl-3 flex items-center'>
							<input
								type='checkbox'
								checked={allDay}
								id='allDay'
								onChange={() => setAllDay((prev) => !prev)}
							/>
							<label htmlFor='allDay' className='ml-2 p-2 text-gray-600'>
								All day
							</label>
						</div>
						<textarea
							className='w-full mb-2 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='Description'
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						{!user && !selectedEvent && (
							<p className='text-red-400 text-sm py-1'>
								Note: This event will only be saved locally. Create an account to store
								it securely and access it from any device.
							</p>
						)}
					</div>

					<div className='flex justify-end items-center w-full bg-gray-50 px-5 py-4'>
						<Button
							extraClasses='mr-2'
							onClick={handleCloseModal}
							testId='event-modal-close-button'
						>
							Close
						</Button>
						<Button
							onClick={handleSubmit}
							variant='primary'
							testId='event-modal-save-button'
							submit
						>
							Save
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EventModal
