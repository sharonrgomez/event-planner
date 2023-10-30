import {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context'
import dayjs from 'dayjs'
import {getColorOptions} from '../utils/helpers'
import {Button, LabelColorOptionsModal, LabelColorSelect} from '.'
import {v4 as uuid} from 'uuid'

export type EventType = {
	id: string
	title: string
	description: string
	date: string
	time: string
	label: {
		color: string
		hoverColor: string
	}
}

const EventModal = () => {
	const {
		setIsEventModalOpen,
		selectedEvent,
		setSelectedEvent,
		selectedDay,
		dispatchSaveEvent,
		setIsDeleteConfirmationModalOpen,
		setIsDayEventsModalOpen,
		setIsLabelOptionsModalOpen,
	} = useContext(GlobalContext)

	const handleCloseModal = () => {
		setIsEventModalOpen(false)
		setSelectedEvent(null)
	}

	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : '',
	)
	const [date, setDate] = useState(
		selectedEvent ? selectedEvent.date : selectedDay.format('YYYY-MM-DD'),
	)
	const [time, setTime] = useState(
		selectedEvent ? selectedEvent.time : dayjs().format('HH:mm'),
	)

	const [colorBubble, setColorBubble] = useState('yellow')
	const [eventColor, setEventColor] = useState(
		selectedEvent ? selectedEvent.label : '',
	)

	const handleSubmit = () => {
		const payload = {
			title,
			description,
			date,
			time,
			label: eventColor || {
				color: colorOptions[2].bgColor,
				hoverColor: colorOptions[2].hoverBgColor,
			},
			id: selectedEvent ? selectedEvent.id : uuid(),
		}

		if (selectedEvent) {
			dispatchSaveEvent({type: 'update', payload})
		} else {
			dispatchSaveEvent({type: 'push', payload})
		}

		setIsEventModalOpen(false)
		setSelectedEvent(null)
	}

	const handleClickDelete = () => {
		setIsDeleteConfirmationModalOpen(true)
		setIsEventModalOpen(false)
		setIsDayEventsModalOpen(false)
	}

	const colorOptions = getColorOptions(colorBubble)

	useEffect(() => {
		colorOptions.map((col) => {
			if (selectedEvent && selectedEvent.label.color.includes(col.col)) {
				setColorBubble(col.col)
			}
		})
	}, [selectedEvent])

	return (
		<div
			className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'
			data-testid='event-modal'
		>
			<form className='bg-white rounded-lg shadow-2xl max-sm:mx-5 max-sm:w-full sm:max-md:w-1/2 sm:max-2xl:w-1/3'>
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
						/>
						<LabelColorSelect onClick={setIsLabelOptionsModalOpen} />
					</div>
					<div className='flex max-lg:flex-col w-full justify-between items-center mb-2'>
						<input
							type='date'
							className='w-full mr-2 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='Date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
						<input
							type='time'
							className='w-full ml-1 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='Time'
							value={time}
							onChange={(e) => setTime(e.target.value)}
						/>
					</div>

					<textarea
						className='w-full mb-2 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
						placeholder='Description'
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
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
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	)
}

export default EventModal
