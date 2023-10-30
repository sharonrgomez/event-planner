import {CirclePicker} from 'react-color'

const LabelColorOptionsModal = () => {
	const colorPickerOptions = [
		'#D9E3F0',
		'#F47373',
		'#697689',
		'#37D67A',
		'#2CCCE4',
		'#555555',
		'#dce775',
		'#ff8a65',
		'#ba68c8',
	]

	return (
		<CirclePicker
			colors={colorPickerOptions}
			circleSize={15}
			circleSpacing={10}
			width='100px'
		/>
	)
}

export default LabelColorOptionsModal
