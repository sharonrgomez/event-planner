import dayjs, {Dayjs} from 'dayjs'
import Day from './Day'

import {getTotalWeeksInMonth} from '../utils/helpers'

type WeekProps = {
	week: Dayjs[]
	weekIdx: number
}

const Week: React.FC<WeekProps> = (props: WeekProps) => {
	const {week, weekIdx} = props

	const totalWeeks = getTotalWeeksInMonth(
		dayjs(week[0]).year(),
		dayjs(week[0]).month(),
	)
	console.log('totalWeeks', totalWeeks)
	return (
		<div
			className='grid grid-cols-7'
			style={{minHeight: `${totalWeeks === 4 ? '175px' : '150px'}`}}
		>
			{week.map((day, idx) => (
				<Day day={day} weekIdx={weekIdx} key={idx} />
			))}
		</div>
	)
}

export default Week
