import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {GlobalContext} from '../context'

type LabelOptionsModalProps = {
	onSelectColor: (color: string) => void
	selectedColor: string
}

export const colorOptions = [
	// rainbow
	'#f87171',
	'#fb923c',
	'#facc15',
	'#4ade80',
	'#60a5fa',
	'#a78bfa',

	// pastel rainbow
	'#F7A3A3',
	'#FCBF8D',
	'#FFEB9D',
	'#B9E6C9',
	'#B3CFEF',
	'#D2C5FA',

	// neutrals
	'#E0E0E0',
	'#CCC6C5',
	'#B7ACA9',
	'#A2928E',
	'#988580',
	'#8D7772',
]

const LabelOptionsModal = (props: LabelOptionsModalProps) => {
	const {onSelectColor, selectedColor} = props

	const {setIsLabelOptionsModalOpen} = useContext(GlobalContext)

	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [hoveredColor, setHoveredColor] = useState<string | undefined>()

	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsLabelOptionsModalOpen(false)
			}
		},
		[setIsLabelOptionsModalOpen],
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<div
			className='bg-white rounded-lg shadow-md p-2 absolute -top-6 -right-3.5 flex flex-wrap flex-row w-44 justify-center'
			onClick={(e) => {
				e.stopPropagation()
			}}
			ref={ref}
		>
			{colorOptions.map((color, idx) => (
				<svg
					viewBox='0 0 100 100'
					xmlns='http://www.w3.org/2000/svg'
					style={{
						fill: color,
						width: '18px',
						height: '18px',
						transform:
							isHovered && hoveredColor === color ? 'scale(1.2)' : 'scale(1)',
					}}
					key={idx}
					className={`cursor-pointer m-1`}
					onClick={() => {
						onSelectColor(color)
					}}
					onMouseEnter={() => {
						setIsHovered(true)
						setHoveredColor(color)
					}}
					onMouseLeave={() => {
						setIsHovered(false)
					}}
				>
					<>
						<circle cx='50' cy='50' r='50' />
						{selectedColor === color ? (
							<path
								d='M30 50 L45 65 L75 36'
								stroke='white'
								strokeWidth='8'
								fill='none'
							/>
						) : (
							<></>
						)}
					</>
				</svg>
			))}
		</div>
	)
}

export default LabelOptionsModal
