import {useContext, useEffect, useState} from 'react'
import {getMonth} from './utils/helpers'
import {
	CalendarHeader,
	EventModal,
	DeleteConfirmationModal,
	Month,
	AuthDialog,
	Snackbar,
} from './components'
import {AuthContext, GlobalContext} from './context'

const App = () => {
	const {
		isEventModalOpen,
		isDeleteConfirmationModalOpen,
		month,
		isAuthDialogOpen,
		isSnackbarOpen,
	} = useContext(GlobalContext)
	const {isLoggingIn} = useContext(AuthContext)

	const [currentMonth, setCurrentMonth] = useState(getMonth())

	useEffect(() => {
		setCurrentMonth(getMonth(month))
	}, [month])

	return (
		<div className='h-screen flex flex-col'>
			<CalendarHeader />

			<div className='flex flex-1'>
				<Month month={currentMonth} />
			</div>

			{isEventModalOpen && <EventModal />}
			{isDeleteConfirmationModalOpen && <DeleteConfirmationModal />}
			{isAuthDialogOpen && <AuthDialog isLoggingIn={isLoggingIn} />}
			{isSnackbarOpen && <Snackbar />}
		</div>
	)
}

export default App
