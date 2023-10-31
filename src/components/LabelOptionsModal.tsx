import {CirclePicker, Color, ColorResult} from 'react-color'

type LabelOptionsModalProps = {
	onSelectColor: (color: ColorResult) => void
	selectedColor: Color
}

export const colorPickerOptions = [
	'#f87171',
	'#fb923c',
	'#facc15',
	'#4ade80',
	'#60a5fa',
	'#a78bfa',
	'#989898',
	'#977C6A',
	'#876e5d',
	'#745C4C',
	'#644D3E',
	'#4E4E4E',
]

const LabelOptionsModal = (props: LabelOptionsModalProps) => {
	const {onSelectColor, selectedColor} = props

	return (
		<div
			className='bg-white rounded-lg shadow-md p-3 absolute -top-6 -right-3.5'
			onClick={(e) => {
				e.stopPropagation()
			}}
		>
			<CirclePicker
				colors={colorPickerOptions}
				circleSize={15}
				circleSpacing={10}
				width='150px'
				onChange={onSelectColor}
				color={selectedColor}
			/>
		</div>
	)
}

export default LabelOptionsModal
