import {Dayjs} from 'dayjs'

type DayProps = {
	day: Dayjs
	rowIdx: number
}

const Day = (props: DayProps) => {
	const {day, rowIdx} = props

	return (
		<div className='border border-gray-100 flex flex-col'>
			<div className='flex flex-col items-center'>
				{rowIdx === 0 && (
					<p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
				)}
				<p className='text-sm p-1 my-1 text-center'>{day.format('DD')}</p>
			</div>
		</div>
	)
}

export default Day
