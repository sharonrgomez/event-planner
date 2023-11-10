import dayjs, {Dayjs} from 'dayjs'
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useReducer,
	useState,
} from 'react'
import {EventType} from '../components/EventModal'

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

export const GlobalContext = createContext<{
	month: number
	setMonth: Dispatch<SetStateAction<number>>
	isEventModalOpen: boolean
	setIsEventModalOpen: Dispatch<SetStateAction<boolean>>
	selectedEvent: EventType
	setSelectedEvent: Dispatch<SetStateAction<EventType>>
	selectedDay: Dayjs
	setSelectedDay: Dispatch<SetStateAction<Dayjs>>
	isDayEventsModalOpen: boolean
	setIsDayEventsModalOpen: Dispatch<SetStateAction<boolean>>
	savedEvents: EventType[]
	dispatchSaveEvent: ({type, payload}) => void
	isDeleteConfirmationModalOpen: boolean
	setIsDeleteConfirmationModalOpen: Dispatch<SetStateAction<boolean>>
	isLabelOptionsModalOpen: boolean
	setIsLabelOptionsModalOpen: Dispatch<SetStateAction<boolean>>
	isSnackbarOpen: boolean
	setIsSnackbarOpen: Dispatch<SetStateAction<boolean>>
	isAuthDialogOpen: boolean
	setIsAuthDialogOpen: Dispatch<SetStateAction<boolean>>
}>({
	month: dayjs().month(),
	setMonth: (m: number) => {},
	isEventModalOpen: false,
	setIsEventModalOpen: (o: boolean) => {},
	selectedEvent: null,
	setSelectedEvent: (e: EventType) => {},
	selectedDay: null,
	setSelectedDay: (d: Dayjs) => {},
	isDayEventsModalOpen: false,
	setIsDayEventsModalOpen: (o: boolean) => {},
	savedEvents: [],
	dispatchSaveEvent: ({type, payload}) => {},
	isDeleteConfirmationModalOpen: false,
	setIsDeleteConfirmationModalOpen: (o: boolean) => {},
	isLabelOptionsModalOpen: false,
	setIsLabelOptionsModalOpen: (o: boolean) => {},
	isSnackbarOpen: false,
	setIsSnackbarOpen: (o: boolean) => {},
	isAuthDialogOpen: false,
	setIsAuthDialogOpen: (o: boolean) => {},
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
	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
		useState(false)
	const [isLabelOptionsModalOpen, setIsLabelOptionsModalOpen] = useState(false)
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
	const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

	useEffect(() => {
		if (!isEventModalOpen) setIsLabelOptionsModalOpen(false)
	}, [isEventModalOpen])

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
				isDeleteConfirmationModalOpen,
				setIsDeleteConfirmationModalOpen,
				isLabelOptionsModalOpen,
				setIsLabelOptionsModalOpen,
				isSnackbarOpen,
				setIsSnackbarOpen,
				isAuthDialogOpen,
				setIsAuthDialogOpen,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
