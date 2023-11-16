import {useContext} from 'react'
import {DayEventsModal, Week} from '.'
import {GlobalContext} from '../context'
import {Dayjs} from 'dayjs'

type MonthProps = {
	month: Dayjs[][]
}

const Month = (props: MonthProps) => {
	const {month} = props

	const {isDayEventsModalOpen, savedEvents} = useContext(GlobalContext)

	return (
		<div className='flex-1 grid'>
			{month.map((week, idx) => (
				<Week week={week} key={idx} weekIdx={idx} />
			))}

			{isDayEventsModalOpen && <DayEventsModal events={savedEvents} />}
		</div>
	)
}

export default Month
