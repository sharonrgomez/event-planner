import dayjs, {Dayjs} from 'dayjs'
import {createContext, useState} from 'react'
import {DayEvent} from '../components/EventModal'

export const GlobalContext = createContext({
	month: dayjs().month(),
	setMonth: (m: number) => {},
	isEventModalOpen: false,
	setIsEventModalOpen: (o: boolean) => {},
	selectedEvent: null,
	setSelectedEvent: (e: DayEvent) => {},
	selectedDay: null,
	setSelectedDay: (d: Dayjs) => {},
	isDayEventsModalOpen: false,
	setIsDayEventsModalOpen: (o: boolean) => {},
})

const GlobalProvider = ({children}: {children: React.ReactNode}) => {
	const [month, setMonth] = useState(dayjs().month())
	const [isEventModalOpen, setIsEventModalOpen] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [selectedDay, setSelectedDay] = useState(null)
	const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false)

	return (
		<GlobalContext.Provider
			value={{
				month,
				setMonth,
				isEventModalOpen,
				setIsEventModalOpen,
				selectedEvent,
				setSelectedEvent,
				selectedDay,
				setSelectedDay,
				isDayEventsModalOpen,
				setIsDayEventsModalOpen,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
