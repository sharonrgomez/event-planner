import dayjs, {Dayjs} from 'dayjs'

type DayProps = {
	day: Dayjs
	rowIdx: number
}

const Day = (props: DayProps) => {
	const {day, rowIdx} = props

	const getCurrentDayStyles = () => {
		return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
			? 'bg-blue-400 text-white rounded-full w-7'
			: 'text-gray-800'
	}

	return (
		<div className='border border-gray-100 flex flex-col'>
			{rowIdx === 0 && (
				<div className='text-xs border-b text-center row-start-1'>
					<p className='font-medium text-gray-400 my-1 mt-1'>
						{day.format('ddd').toUpperCase()}
					</p>
				</div>
			)}
			<div className='flex flex-col items-center'>
				<p className={`text-sm p-1 my-1 text-center ${getCurrentDayStyles()}`}>
					{day.format('DD')}
				</p>
			</div>
		</div>
	)
}

export default Day
