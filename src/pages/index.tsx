import Head from 'next/head'
import App from '../App'
import {AuthContextProvider, GlobalProvider} from '../context'
import {useRouter} from 'next/router'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import firebase_app from '../firebase/config'

export const Home = () => {
	// const router = useRouter()
	// const auth = getAuth(firebase_app)

	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
	// 		router.push('/')
	// 	} else {
	// 		router.push('/signup')
	// 	}
	// })

	return (
		<div>
			<Head>
				<title>Event planner</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<AuthContextProvider>
					<GlobalProvider>
						<App />
					</GlobalProvider>
				</AuthContextProvider>
			</main>
		</div>
	)
}

export default Home
