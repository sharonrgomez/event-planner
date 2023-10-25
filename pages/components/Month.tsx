import {Fragment} from 'react'
import {Day} from '.'
import {Dayjs} from 'dayjs'

type MonthProps = {
	month: Dayjs[][]
}

const Month = (props: MonthProps) => {
	const {month} = props

	return (
		<div className='flex-1 grid grid-cols-7 grid-rows-5'>
			{month.map((row, i) => (
				<Fragment key={i}>
					{row.map((day, idx) => (
						<Day day={day} key={idx} rowIdx={i} />
					))}
				</Fragment>
			))}
		</div>
	)
}

export default Month
