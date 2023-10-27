import dayjs, {Dayjs} from 'dayjs'
import {createContext, useEffect, useReducer, useState} from 'react'
import {DayEvent} from '../components/EventModal'

const isServerSide = typeof window === 'undefined'

const savedEventsReducer = (state, {type, payload}) => {
	switch (type) {
		case 'push':
			return [...state, payload]
		case 'update':
			return state.map((event) => (event.id === payload.id ? payload : event))
		case 'delete':
			return state.filter((event) => event.id !== payload.id)
		default:
			throw new Error()
	}
}

const initEvents = () => {
	const storageEvents = isServerSide ? '' : localStorage.getItem('savedEvents')
	const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
	return parsedEvents
}

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
	savedEvents: [],
	dispatchSaveEvent: ({type, payload}) => {},
})

const GlobalProvider = ({children}: {children: React.ReactNode}) => {
	const [month, setMonth] = useState(dayjs().month())
	const [isEventModalOpen, setIsEventModalOpen] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [selectedDay, setSelectedDay] = useState(null)
	const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false)
	const [savedEvents, dispatchSaveEvent] = useReducer(
		savedEventsReducer,
		[],
		initEvents,
	)

	useEffect(() => {
		isServerSide
			? undefined
			: localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
	}, [savedEvents])

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
				savedEvents,
				dispatchSaveEvent,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
