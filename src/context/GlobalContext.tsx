import dayjs, {Dayjs} from 'dayjs'
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react'
import {EventType} from '../components/EventModal'
import {AuthContext} from './AuthContext'
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'
import {database} from '../firebase/config'

const isServerSide = typeof window === 'undefined'

export const setFirebaseEvents = async (user, savedEvents) => {
	if (user) {
		await setDoc(doc(collection(database, 'users'), user.uid), {
			events: JSON.stringify(savedEvents),
		})
	}
}

const getFirebaseEvents = async (user) => {
	if (user) {
		const docSnap = await getDoc(doc(database, 'users', user.uid))

		if (docSnap.exists()) {
			return docSnap.data().events
		} else {
			console.log('No document found')
		}
	}
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
	setSavedEvents: Dispatch<SetStateAction<EventType[]>>
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
	setSavedEvents: (e: EventType[]) => {},
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
	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
		useState(false)
	const [isLabelOptionsModalOpen, setIsLabelOptionsModalOpen] = useState(false)
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
	const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

	const {user} = useContext(AuthContext)

	const [savedEvents, setSavedEvents] = useState([])

	useEffect(() => {
		if (user) {
			const getEvents = async () => {
				const storageEvents = isServerSide ? '' : await getFirebaseEvents(user)
				const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
				setSavedEvents(parsedEvents)
			}
			getEvents()
		}
	}, [user])

	useEffect(() => {
		if (!isEventModalOpen) setIsLabelOptionsModalOpen(false)
	}, [isEventModalOpen])

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
				setSavedEvents,
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
