import {LabelColorOptionsModal} from '.'
import {GlobalContext} from '../context'
import {useContext} from 'react'

const LabelColorSelect = ({onClick}) => {
	const {isLabelOptionsModalOpen} = useContext(GlobalContext)

	return (
		<>
			<div
				className='flex flex-row cursor-pointer items-center hover:bg-gray-50 rounded p-2'
				onClick={onClick}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					className='w-5 h-5 fill-red-400'
				>
					<path d='M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75 4.365-9.75 9.75-9.75zm0 0' />
				</svg>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
					className='w-5 h-5 fill-gray-500'
				>
					<path
						fillRule='evenodd'
						d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
						clip-Rule='evenodd'
					/>
				</svg>
			</div>

			{isLabelOptionsModalOpen && <LabelColorOptionsModal />}
		</>
	)
}

export default LabelColorSelect
