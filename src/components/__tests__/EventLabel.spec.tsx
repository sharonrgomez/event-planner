import {render, screen} from '@testing-library/react'
import {EventLabel} from '..'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('09:30'),
		month: jest.fn().mockReturnValue({format: jest.fn()}),
	}),
}))

describe('<EventLabel />', () => {
	const testId = 'event-label'

	const props = {
		event: {
			id: '1234',
			title: 'Meeting',
			description: 'test',
			date: '12-25-2023',
			time: '09:30',
			labelColor: 'blah',
		},
		clickEventHandler: jest.fn(),
		isFullWidth: false,
		testId,
	}

	it('should render', () => {
		render(<EventLabel {...props} />)

		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-title`)).toHaveTextContent(
			props.event.title,
		)
		expect(screen.getByTestId(`${testId}-time`)).toHaveTextContent(
			props.event.time,
		)
	})

	it('should call clickEventHandler when clicking on event label', () => {
		render(<EventLabel {...props} />)

		screen.getByTestId(testId).click()
		expect(props.clickEventHandler).toHaveBeenCalledWith(props.event)
	})

	it('should have w-full class when isFullWidth is true', () => {
		render(<EventLabel {...props} isFullWidth={true} />)

		expect(screen.getByTestId(testId)).toHaveClass('w-full')
	})

	it('should not have w-full class when isFullWidth is false', () => {
		render(<EventLabel {...props} isFullWidth={false} />)

		expect(screen.getByTestId(testId)).not.toHaveClass('w-full')
	})
})
