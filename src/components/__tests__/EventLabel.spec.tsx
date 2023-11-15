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
	const testID = 'event-label'

	const props = {
		event: {
			id: '1234',
			title: 'Meeting',
			description: 'test',
			startDate: '2023-12-25',
			endDate: '2023-12-25',
			time: '09:30',
			labelColor: 'blah',
			allDay: false,
		},
		clickEventHandler: jest.fn(),
		isFullWidth: false,
		testID,
	}

	it('should render', () => {
		render(<EventLabel {...props} />)

		expect(screen.getByTestId(testID)).toBeInTheDocument()
		expect(screen.getByTestId(`${testID}-title`)).toHaveTextContent(
			props.event.title,
		)
		expect(screen.getByTestId(`${testID}-time`)).toHaveTextContent(
			props.event.time,
		)
	})

	it('should call clickEventHandler when clicking on event label', () => {
		render(<EventLabel {...props} />)

		screen.getByTestId(testID).click()
		expect(props.clickEventHandler).toHaveBeenCalledWith(props.event)
	})

	it('should have w-full class when isFullWidth is true', () => {
		render(<EventLabel {...props} isFullWidth={true} />)

		expect(screen.getByTestId(testID)).toHaveClass('w-full')
	})

	it('should not have w-full class when isFullWidth is false', () => {
		render(<EventLabel {...props} isFullWidth={false} />)

		expect(screen.getByTestId(testID)).not.toHaveClass('w-full')
	})
})
