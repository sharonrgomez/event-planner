type ButtonProps = {
	onClick: () => void
	children: React.ReactNode
	variant?: 'primary' | 'standard' | 'danger'
	compact?: boolean
	extraClasses?: string
}

const Button = (props: ButtonProps) => {
	const {children, compact, extraClasses, onClick, variant = 'standard'} = props

	const getVariantClasses = (variant: string) => {
		switch (variant) {
			case 'primary':
				return 'bg-blue-500 hover:bg-blue-600'
			case 'standard':
				return 'bg-gray-400 hover:bg-gray-500'
			case 'danger':
				return 'bg-red-400 hover:bg-red-500'
			default:
				return ''
		}
	}

	return (
		<button
			className={`${getVariantClasses(variant)} ${
				compact ? 'px-2 py-1' : 'px-4 py-2'
			} ${extraClasses} rounded text-white`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
