import dayjs from 'dayjs'
import React, {useContext} from 'react'

import {AuthContext, GlobalContext, SnackbarContext} from '../context'
import logOut from '../firebase/auth/logout'

export const CalendarHeader = () => {
	const {
		month,
		setMonth,
		setIsEventModalOpen,
		setSelectedDay,
		setIsAuthDialogOpen,
		setIsSnackbarOpen,
	} = useContext(GlobalContext)

	const {user, setIsLoggingIn} = useContext(AuthContext)
	const {setMessage} = useContext(SnackbarContext)

	const handleClickPrev = () => {
		setMonth(month - 1)
	}

	const handleClickNext = () => {
		setMonth(month + 1)
	}

	const handleClickToday = () => {
		setMonth(dayjs().month())
	}

	const handleOpenModal = () => {
		setIsEventModalOpen(true)
		setSelectedDay(dayjs())
	}

	const handleLogOut = async () => {
		const {error} = await logOut()

		if (error) {
			setMessage(`Error logging out: ${error.code}`)
			setIsSnackbarOpen(true)
		} else {
			setMessage('Logged out successfully')
			setIsSnackbarOpen(true)

			setTimeout(() => {
				setIsSnackbarOpen(false)
			}, 3000)
		}

		return
	}

	return (
		<header
			className='px-4 py-2 flex justify-between flex-wrap'
			data-testid='calendar-header'
		>
			<div className='flex flex-row-reverse items-center flex-wrap'>
				<div>
					<h1
						className='my-2 text-xl text-gray-600 fond-bold'
						data-testid='calendar-header-heading'
					>
						{dayjs(new Date(dayjs().year(), month)).format('MMMM YYYY').toUpperCase()}
					</h1>
				</div>

				<div className='flex flex-row items-center'>
					<button
						className='rounded-full py-1 px-2 mr-1 bg-gray-100 hover:bg-gray-200'
						onClick={handleClickPrev}
						data-testid='calendar-header-prev-button'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='w-5 h-5 text-gray-600 hover:text-gray-900'
						>
							<path
								fillRule='evenodd'
								d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
								clipRule='evenodd'
							/>
						</svg>
					</button>

					<button
						className='rounded-full py-1 px-2 mr-2 bg-gray-100 hover:bg-gray-200'
						onClick={handleClickNext}
						data-testid='calendar-header-next-button'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='w-5 h-5 text-gray-600 hover:text-gray-900'
						>
							<path
								fillRule='evenodd'
								d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
								clipRule='evenodd'
							/>
						</svg>
					</button>

					<button
						className='rounded-full py-1 px-3 mr-2 bg-gray-100 hover:bg-gray-300 text-gray-600 hover:text-gray-700 text-md max-sm:hidden'
						onClick={handleClickToday}
						data-testid='calendar-header-today-button'
					>
						TODAY
					</button>

					<button
						className='rounded-full py-1 px-2 mr-3 bg-green-100 hover:bg-green-200 max-sm:hidden'
						onClick={handleOpenModal}
						data-testid='calendar-header-add-event-button'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='w-5 h-5 text-gray-600 hover:text-gray-800'
						>
							<path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
						</svg>
					</button>
				</div>
			</div>
			<div className='flex flex-row items-center'>
				{user ? (
					<>
						<span className='text-gray-700 mr-1 max-md:hidden'>Signed in as</span>
						<span className='font-bold text-gray-700 mr-2 max-md:hidden'>
							{user?.email}
						</span>
						<button
							className='text-gray-500 hover:text-gray-800'
							onClick={handleLogOut}
						>
							Log out
						</button>
					</>
				) : (
					<>
						<button
							className='text-gray-600 hover:text-gray-900 mr-3'
							onClick={() => {
								setIsLoggingIn(false)
								setIsAuthDialogOpen(true)
							}}
						>
							Sign up
						</button>
						<button
							className='text-gray-600 hover:text-gray-900'
							onClick={() => {
								setIsLoggingIn(true)
								setIsAuthDialogOpen(true)
							}}
						>
							Log in
						</button>
					</>
				)}
			</div>
		</header>
	)
}
export default CalendarHeader
