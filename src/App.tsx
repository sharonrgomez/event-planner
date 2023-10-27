import {useContext, useEffect, useState} from 'react'
import {getMonth} from './utils/constants'
import {CalendarHeader, EventModal, Month} from './components'
import {GlobalContext} from './context'

const App = () => {
	const {isEventModalOpen, month} = useContext(GlobalContext)
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
		</div>
	)
}

export default App
