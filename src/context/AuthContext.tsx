import React, {useEffect} from 'react'
import {onAuthStateChanged, getAuth} from 'firebase/auth'
import firebase_app from '../firebase/config'

const auth = getAuth(firebase_app)

export const AuthContext = React.createContext({})

const AuthContextProvider = ({children}) => {
	const [user, setUser] = React.useState(null)
	const [loading, setLoading] = React.useState(true)

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
		<AuthContext.Provider value={{user}}>
			{loading ? <div>Loading...</div> : children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
