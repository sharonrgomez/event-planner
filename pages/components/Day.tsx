import {Dayjs} from 'dayjs'

type DayProps = {
	day: Dayjs
	rowIdx: number
}

const Day = (props: DayProps) => {
	const {day, rowIdx} = props

	return (
		<div className='border border-gray-100 flex flex-col'>
			{rowIdx === 0 && (
				<div className='text-sm mt-1 border-b text-center row-start-1'>
					{day.format('ddd').toUpperCase()}
				</div>
			)}
			<div className='flex flex-col items-center'>
				<p className='text-sm p-1 my-1 text-center'>{day.format('DD')}</p>
			</div>
		</div>
	)
}

export default Day
