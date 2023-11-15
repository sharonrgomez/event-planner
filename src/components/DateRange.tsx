import {ChangeEvent} from 'react'

type DateProps = {
	value: string
	onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Date = (props: DateProps) => {
	const {value, onChangeHandler} = props

	return (
		<input
			type='date'
			className='w-full mr-2 max-lg:mr-0 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
			value={value}
			onChange={onChangeHandler}
		/>
	)
}

type DateRangeProps = {
	endValue: string
	startValue: string
	startDateChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
	endDateChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
	testID?: string
}

const DateRange = (props: DateRangeProps) => {
	const {
		startValue,
		startDateChangeHandler,
		endDateChangeHandler,
		endValue,
		testID,
	} = props

	return (
		<span
			className='flex max-lg:flex-col items-center justify-between w-full'
			data-testid={testID}
		>
			<Date value={startValue} onChangeHandler={startDateChangeHandler} />
			<Date value={endValue} onChangeHandler={endDateChangeHandler} />
		</span>
	)
}

export default DateRange
