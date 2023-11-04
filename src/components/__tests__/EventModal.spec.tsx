/* eslint-disable testing-library/no-node-access */
import {render, screen} from '@testing-library/react'
import {EventModal} from '..'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('2023-10-28'),
		month: jest.fn().mockReturnValue(9),
	}),
}))

var contextMock = {
	setIsEventModalOpen: jest.fn(),
	selectedEvent: {
		id: '1234',
		title: 'Meeting',
		description: 'test',
		date: '12-25-2023',
		time: '09:30',
		labelColor: 'blah',
	},
	setSelectedEvent: jest.fn(),
	selectedDay: {
		format: jest.fn().mockReturnValue('2023-10-28'),
	},
	dispatchSaveEvent: jest.fn(),
	setIsDeleteConfirmationModalOpen: jest.fn(),
	setIsDayEventsModalOpen: jest.fn(),
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

describe('<EventModal />', () => {
	const testId = 'event-modal'

	it('should render', () => {
		render(<EventModal />)

		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-close-button`)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-delete-button`)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-save-button`)).toBeInTheDocument()
	})

	it('should render a form', () => {
		render(<EventModal />)

		expect(screen.getByTestId(testId).querySelector('form')).toBeInTheDocument()
	})

	it('should render inputs', () => {
		render(<EventModal />)

		expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Date')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Time')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
	})
})
