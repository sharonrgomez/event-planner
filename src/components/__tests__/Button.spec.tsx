import {render, screen} from '@testing-library/react'
import {Button} from '..'

describe('<Button />', () => {
	const props = {
		onClick: jest.fn(),
		children: 'Test',
		testId: 'button',
	}

	it('should render', () => {
		render(<Button {...props} />)

		expect(screen.getByTestId('button')).toBeTruthy()
		expect(screen.getByTestId('button')).toHaveTextContent('Test')
	})

	it('should call onClick when clicked', () => {
		render(<Button {...props} />)

		screen.getByTestId('button').click()
		expect(props.onClick).toHaveBeenCalledTimes(1)
	})

	it('should have appropriate class based on given variant', () => {
		render(<Button {...props} variant='primary' />)

		expect(screen.getByTestId('button')).toHaveClass('bg-blue-500')
	})

	it('should have appropriate class if compact is true', () => {
		render(<Button {...props} compact />)

		expect(screen.getByTestId('button')).toHaveClass('px-2 py-1')
	})

	it('should have extraClasses if given', () => {
		render(<Button {...props} extraClasses='text-xl' />)

		expect(screen.getByTestId('button')).toHaveClass('text-xl')
	})
})
