import {Dayjs} from 'dayjs'
import Day from './Day'

import {getTotalWeeksInMonth} from '../utils/helpers'

type WeekProps = {
	week: Dayjs[]
	weekIdx: number
}

const Week: React.FC<WeekProps> = (props: WeekProps) => {
	const {week, weekIdx} = props

	return (
		<div
			className={`grid grid-cols-7 grid-rows-${getTotalWeeksInMonth}`}
			style={{height: '150px'}}
		>
			{week.map((day, idx) => (
				<Day day={day} weekIdx={weekIdx} key={idx} />
			))}
		</div>
	)
}

export default Week
