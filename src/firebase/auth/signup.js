import firebase_app from '../config'
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import {collection, setDoc, doc} from 'firebase/firestore'
import {database} from '../config'

const auth = getAuth(firebase_app)

export default async function signUp(email, password) {
	let result = null,
		error = null

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		)

		await setDoc(doc(collection(database, 'users'), userCredential.user.uid), {})

		result = userCredential
	} catch (e) {
		error = e
	}

	return {result, error}
}
