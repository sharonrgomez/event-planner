import React, {Dispatch, SetStateAction, createContext, useState} from 'react'

export const SnackbarContext = createContext<{
	error: boolean
	setError: Dispatch<SetStateAction<boolean>>
	message: string
	setMessage: Dispatch<SetStateAction<string>>
}>({
	error: false,
	setError: (b: boolean) => {},
	message: '',
	setMessage: (s: string) => {},
})

const SnackbarProvider = ({children}) => {
	const [error, setError] = useState(false)
	const [message, setMessage] = useState('')

	return (
		<SnackbarContext.Provider
			value={{
				error,
				setError,
				message,
				setMessage,
			}}
		>
			{children}
		</SnackbarContext.Provider>
	)
}

export default SnackbarProvider
