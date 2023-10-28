import {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context'
import dayjs from 'dayjs'
import {getColorOptions} from '../utils/helpers'

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
			id: selectedEvent ? selectedEvent.id : Date.now(),
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
		<div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
			<form className='bg-white rounded-lg shadow-2xl max-sm:mx-5 max-sm:w-full sm:max-md:w-1/2 sm:max-2xl:w-1/3'>
				<div className='flex justify-between items-center border-b border-gray-100 px-5 py-4'>
					<div className='text-gray-500 font-medium text-xl'>
						{selectedEvent ? 'Edit ' : 'Add '} event
					</div>

					<div>
						{selectedEvent && (
							<button onClick={handleClickDelete} className='mr-2' type='button'>
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

				<div className='flex flex-col items-center justify-center p-5 pb-1'>
					<input
						type='text'
						className='w-full mb-2 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<div className='flex max-lg:flex-col w-full justify-between items-center mb-2'>
						<input
							type='date'
							className='w-full mr-1 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
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

				<div className='flex flex-row items-center justify-center pb-5'>
					{colorOptions.map((col, idx) => (
						<div
							className='p-1 focus:ring-2'
							key={idx}
							onClick={() => {
								setColorBubble(col.col)
								setEventColor({color: col.bgColor, hoverColor: col.hoverBgColor})
							}}
						>
							{col.selected ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									className={`w-6 h-6 cursor-pointer ${col.class}`}
								>
									<path
										fillRule='evenodd'
										d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									className={`w-5 h-5 cursor-pointer ${col.class}`}
								>
									<path d='M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75 4.365-9.75 9.75-9.75zm0 0' />
								</svg>
							)}
						</div>
					))}
				</div>

				<div className='flex justify-end items-center w-full bg-gray-50 px-5 py-4'>
					<button
						className='bg-gray-400 hover:bg-gray-500 px-4 py-2 mr-2 rounded text-white'
						onClick={handleCloseModal}
					>
						Close
					</button>
					<button
						className='bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded text-white'
						onClick={handleSubmit}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default EventModal
