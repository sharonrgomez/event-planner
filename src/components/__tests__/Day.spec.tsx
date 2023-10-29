import {render, screen} from '@testing-library/react'
import {Day} from '..'
import {Dayjs} from 'dayjs'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('wed'),
		month: jest.fn().mockReturnValue({format: jest.fn()}),
	}),
}))

var contextMock = {
	month: 9,
	setIsEventModalOpen: jest.fn(),
	setSelectedEvent: jest.fn(),
	setSelectedDay: jest.fn(),
	setIsDayEventsModalOpen: jest.fn(),
	savedEvents: [],
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

describe('<Day />', () => {
	const testId = 'day'

	const props = {
		day: {
			month: jest.fn().mockReturnValue({format: jest.fn()}),
			format: jest.fn().mockReturnValue('28'),
			isSame: jest.fn().mockReturnValue(true),
		} as unknown as Dayjs,
		rowIdx: 1,
	}

	it('should render', () => {
		render(<Day {...props} />)

		expect(screen.getByTestId(testId)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-date`)).toBeTruthy()
		expect(screen.queryByTestId(`${testId}-more-events-button`)).not.toBeTruthy()
		expect(screen.queryByTestId(`${testId}-event-label`)).not.toBeTruthy()
	})

	it('should render weekdays on first row', () => {
		render(<Day {...props} rowIdx={0} />)

		expect(screen.getByTestId(`${testId}-weekday`)).toBeTruthy()
	})

	it('should render events', () => {
		contextMock.savedEvents = [
			{
				title: 'Meeting',
				description: 'Very important meeting - bring pen & paper',
				date: '2023-10-28',
				time: '14:45',
				label: {
					color: 'bg-indigo-400',
					hoverColor: 'hover:bg-indigo-500',
				},
				id: '0fafd3f4-b511-40f9-9ac8-4170f7c48850',
			},
			{
				title: 'Appointment',
				description: 'Dr. Doe - Main Street 1',
				date: '2023-10-28',
				time: '10:30',
				label: {
					color: 'bg-yellow-300',
					hoverColor: 'hover:bg-yellow-500',
				},
				id: '64fa1c5d-6910-452a-b7e5-d05d399ddadd',
			},
		]

		render(<Day {...props} />)

		expect(screen.getByTestId(`${testId}-events`)).toBeTruthy()
		expect(screen.getAllByTestId(`${testId}-event-label`)).toBeTruthy()
	})

	it('should render more button if more than 2 events', () => {
		contextMock.savedEvents = [
			...contextMock.savedEvents,
			{
				title: 'Appointment',
				description: 'Dr. Doe - Main Street 1',
				date: '2023-10-28',
				time: '10:30',
				label: {
					color: 'bg-yellow-300',
					hoverColor: 'hover:bg-yellow-500',
				},
				id: '64fa1c5d-6910-452a-b7e5-d05d399ddadd',
			},
		]

		render(<Day {...props} />)

		expect(screen.getByTestId(`${testId}-more-events-button`)).toBeTruthy()
	})
})
