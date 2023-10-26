import {useContext, useEffect, useState} from 'react'
import {getMonth} from '../utils/constants'
import {CalendarHeader, EventModal, Month, Sidebar} from './components'
import {MonthContext} from './context'

export const App = () => {
	const [isModalOpen] = useState(true)
	const [currentMonth, setCurrentMonth] = useState(getMonth())
	const {month} = useContext(MonthContext)

	useEffect(() => {
		setCurrentMonth(getMonth(month))
	}, [month])

	return (
		<div className='h-screen flex flex-col'>
			<CalendarHeader />
			<div className='flex flex-1'>
				<Sidebar />
				<Month month={currentMonth} />
			</div>
			{isModalOpen && <EventModal isCreating={false} />}
		</div>
	)
}
