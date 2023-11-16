import {Fragment, useContext} from 'react'
import {Day, DayEventsModal} from '.'
import {Dayjs} from 'dayjs'
import {getTotalWeeksInMonth} from '../utils/helpers'
import {GlobalContext} from '../context'

type MonthProps = {
	month: Dayjs[][]
}

const Month = (props: MonthProps) => {
	const {month} = props

	const {isDayEventsModalOpen, savedEvents, selectedDay} =
		useContext(GlobalContext)

	return (
		<div className={`flex-1 grid grid-cols-7 grid-rows-${getTotalWeeksInMonth}`}>
			{month.map((row, i) => (
				<Fragment key={i}>
					{row.map((day, idx) => (
						<Day day={day} key={idx} rowIdx={i} />
					))}
				</Fragment>
			))}

			{isDayEventsModalOpen && <DayEventsModal events={savedEvents} />}
		</div>
	)
}

export default Month
