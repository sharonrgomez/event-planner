import React, {createContext, useEffect, useState} from 'react'
import {onAuthStateChanged, getAuth, User} from 'firebase/auth'
import firebase_app from '../firebase/config'

const auth = getAuth(firebase_app)

export const AuthContext = createContext({
	user: null,
	isLoggingIn: false,
	setIsLoggingIn: (b: boolean) => {},
})

const AuthContextProvider = ({children}) => {
	const [user, setUser] = useState<User>(null)
	const [loading, setLoading] = useState(true)
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggingIn,
				setIsLoggingIn,
			}}
		>
			{loading ? <div>Loading...</div> : children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
