import {render, screen} from '@testing-library/react'
import {DayEventsModal} from '..'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('9:30am'),
	}),
}))

var contextMock = {
	selectedDay: {
		format: jest.fn().mockReturnValue('test'),
	},
	setIsDayEventsModalOpen: jest.fn(),
	setSelectedEvent: jest.fn(),
	setIsEventModalOpen: jest.fn(),
}

jest.mock('../../context', () => ({
	__esModule: true,
	GlobalContext: {
		Consumer: ({children}) => children(contextMock),
	},
}))

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useContext: () => contextMock,
}))

describe('<DayEventsModal />', () => {
	const testId = 'day-events-modal'

	it('should render', () => {
		render(<DayEventsModal events={[]} />)

		expect(screen.getByTestId(testId)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-title`)).toHaveTextContent('TEST test')
		expect(screen.getByTestId(`${testId}-close-button`)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-events`)).toBeTruthy()
		expect(screen.queryByTestId(`${testId}-event-label`)).not.toBeTruthy()
	})

	it('should render event labels', () => {
		const mockEvents = [
			{
				id: '1234',
				title: 'Meeting',
				description: 'test',
				date: '12-25-2023',
				time: '09:30',
				label: {
					color: 'test',
					hoverColor: 'test',
				},
			},
		]

		render(<DayEventsModal events={mockEvents} />)

		expect(screen.getByTestId(`${testId}-event-label`)).toBeTruthy()
	})

	it('should fire setIsDayEventsModalOpen when close button is clicked', () => {
		render(<DayEventsModal events={[]} />)

		screen.getByTestId(`${testId}-close-button`).click()
		expect(contextMock.setIsDayEventsModalOpen).toHaveBeenCalledWith(false)
	})

	it('should fire setSelectedEvent and setIsEventModalOpen when event label is clicked', () => {
		const mockEvents = [
			{
				id: '1234',
				title: 'Meeting',
				description: 'test',
				date: '12-25-2023',
				time: '09:30',
				label: {
					color: 'test',
					hoverColor: 'test',
				},
			},
		]

		render(<DayEventsModal events={mockEvents} />)

		screen.getByTestId(`${testId}-event-label`).click()
		expect(contextMock.setSelectedEvent).toHaveBeenCalledTimes(1)
		expect(contextMock.setIsEventModalOpen).toHaveBeenCalledWith(true)
	})
})
