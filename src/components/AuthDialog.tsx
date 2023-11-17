'use client'
import {useContext, useEffect, useRef, useState} from 'react'
import {GlobalContext, SnackbarContext} from '../context'
import {Button} from '.'
import logIn from '../firebase/auth/login'
import signUp from '../firebase/auth/signup'
import {getErrorMessage} from '../utils/helpers'
import useClickOutside from '../hooks/useClickOutside'

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
	const [showPassword, setShowPassword] = useState(false)

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

	const ref = useRef<HTMLDivElement>(null)
	useClickOutside(ref, handleCloseModal)

	return (
		<div
			className='h-screen w-full fixed left-0 top-0 flex justify-center items-center z-20'
			data-testid='auth-dialog'
		>
			<div
				className='bg-white rounded-lg shadow-2xl max-sm:mx-5 max-sm:w-full sm:max-md:w-1/2 sm:max-2xl:w-1/3'
				ref={ref}
			>
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

						<div className='flex flex-row items-center w-full'>
							<input
								type={showPassword ? 'text' : 'password'}
								className='w-full p-3 mb-2 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
								placeholder='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{showPassword ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5 cursor-pointer ml-3 text-gray-400 hover:text-gray-500'
									onClick={() => setShowPassword(false)}
								>
									<path
										fillRule='evenodd'
										d='M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z'
										clipRule='evenodd'
									/>
									<path d='M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z' />
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5 cursor-pointer ml-3 text-gray-400 hover:text-gray-500'
									onClick={() => setShowPassword(true)}
								>
									<path d='M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' />
									<path
										fillRule='evenodd'
										d='M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</div>
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
