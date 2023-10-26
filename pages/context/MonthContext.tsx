import dayjs from 'dayjs'
import {createContext, useState} from 'react'

export const MonthContext = createContext({
	month: dayjs().month(),
	setMonth: (m: number) => {},
})

const MonthProvider = ({children}: {children: React.ReactNode}) => {
	const [month, setMonth] = useState(dayjs().month())

	return (
		<MonthContext.Provider value={{month, setMonth}}>
			{children}
		</MonthContext.Provider>
	)
}

export default MonthProvider
