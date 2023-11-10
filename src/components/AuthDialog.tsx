'use client'
import {useContext, useEffect, useState} from 'react'
import {GlobalContext, SnackbarContext} from '../context'
import {Button} from '.'
import logIn from '../firebase/auth/login'
import signUp from '../firebase/auth/signup'
import {getErrorMessage} from '../utils/helpers'

type AuthDialogProps = {
	isLoggingIn?: boolean
}

const AuthDialog = (props: AuthDialogProps) => {
	const {isLoggingIn} = props

	const {setIsSnackbarOpen, setIsAuthDialogOpen} = useContext(GlobalContext)

	const {setError, setMessage} = useContext(SnackbarContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailRequired, setEmailRequired] = useState(false)
	const [passwordRequired, setPasswordRequired] = useState(false)

	useEffect(() => {
		if (email) {
			setEmailRequired(!email)
		}
		if (password) {
			setPasswordRequired(!password)
		}
	}, [email, password])

	const handleCloseModal = () => {
		setIsAuthDialogOpen(false)
		setIsSnackbarOpen(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email || !password) {
			setEmailRequired(!email)
			setPasswordRequired(!password)
			return
		}

		let result, error

		if (isLoggingIn) {
			;({result, error} = await logIn(email, password))
		} else {
			;({result, error} = await signUp(email, password))
		}

		if (error) {
			setError(true)
			setMessage(getErrorMessage(error.code))
			setIsSnackbarOpen(true)
		} else if (result) {
			setError(false)
			setMessage(`${isLoggingIn ? 'Logged in' : 'Account created'} successfully`)
			setIsSnackbarOpen(true)
			setIsAuthDialogOpen(false)

			setTimeout(() => {
				setIsSnackbarOpen(false)
			}, 3000)
		}

		return
	}

	return (
		<div
			className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'
			data-testid='auth-dialog'
		>
			<div className='bg-white rounded-lg shadow-2xl max-sm:mx-5 max-sm:w-full sm:max-md:w-1/2 sm:max-2xl:w-1/3'>
				<form onSubmit={handleSubmit}>
					<div
						className='flex justify-between items-center border-b border-gray-100 px-5 py-4 text-gray-600 font-medium text-xl'
						data-testid='auth-dialog-title'
					>
						{isLoggingIn ? 'Log in' : 'Sign up'}
					</div>

					<p className='text-sm px-5 py-3 text-gray-600'>
						{isLoggingIn
							? 'Log into an existing account.'
							: 'Create an account to save your events securely and access them from any device.'}
					</p>

					<div className='flex flex-col items-center px-5 pt-2 pb-1 w-full mb-2'>
						<input
							type='email'
							className='w-full p-3 mb-2 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='johndoe@email.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{emailRequired && (
							<p className='text-red-400 text-sm ml-3 w-full'>
								Please enter an email address
							</p>
						)}
						<input
							type='password'
							className='w-full p-3 mb-2 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{passwordRequired && (
							<p className='text-red-400 text-sm ml-3 w-full'>
								Please enter a password
							</p>
						)}
					</div>

					<div className='flex justify-end items-center px-5 py-4'>
						<Button
							extraClasses='mr-2'
							onClick={handleCloseModal}
							testId='auth-dialog-close-button'
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							variant='primary'
							testId='auth-dialog-submit-button'
							submit
						>
							{isLoggingIn ? 'Log in' : 'Sign up'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AuthDialog
