import {Fragment, useContext} from 'react'
import {Day, DayEventsModal} from '.'
import {Dayjs} from 'dayjs'
import {getTotalWeeksInMonth} from '../../utils/constants'
import {GlobalContext} from '../context'

type MonthProps = {
	month: Dayjs[][]
}

const Month = (props: MonthProps) => {
	const {month} = props

	const {isDayEventsModalOpen} = useContext(GlobalContext)

	const events = [
		{
			title: 'Event one',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event two',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event three',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event four',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event five',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
	]

	return (
		<div className={`flex-1 grid grid-cols-7 grid-rows-${getTotalWeeksInMonth}`}>
			{month.map((row, i) => (
				<Fragment key={i}>
					{row.map((day, idx) => (
						<Day day={day} key={idx} rowIdx={i} />
					))}
				</Fragment>
			))}
			{isDayEventsModalOpen && <DayEventsModal events={events} />}
		</div>
	)
}

export default Month
