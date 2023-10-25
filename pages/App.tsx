import {useState} from 'react'
import {getMonth} from '../utils/constants'
import {CalendarHeader, Month, Sidebar} from './components'

export const App = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth())

	return (
		<div className='h-screen flex flex-columns'>
			<CalendarHeader />
			<div className='flex flex-1'>
				<Sidebar />
				<Month month={currentMonth} />
			</div>
		</div>
	)
}
