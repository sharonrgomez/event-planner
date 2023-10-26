import dayjs from 'dayjs'
import {createContext, useState} from 'react'

export const GlobalContext = createContext({
	month: dayjs().month(),
	setMonth: (m: number) => {},
	isEventModalOpen: false,
	setIsEventModalOpen: (o: boolean) => {},
})

const GlobalProvider = ({children}: {children: React.ReactNode}) => {
	const [month, setMonth] = useState(dayjs().month())
	const [isEventModalOpen, setIsEventModalOpen] = useState(false)

	return (
		<GlobalContext.Provider
			value={{
				month,
				setMonth,
				isEventModalOpen,
				setIsEventModalOpen,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
