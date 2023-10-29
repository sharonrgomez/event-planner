import {render, screen} from '@testing-library/react'
import {CalendarHeader} from '..'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('february 2024'),
		month: jest.fn().mockReturnValue({format: jest.fn()}),
		year: jest.fn().mockReturnValue(2024),
	}),
}))

var contextMock = {
	month: 1,
	setMonth: jest.fn(),
	setIsEventModalOpen: jest.fn(),
	setSelectedDay: jest.fn(),
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

const testId = 'calendar-header'

describe('<CalendarHeader />', () => {
	it('should render', () => {
		render(<CalendarHeader />)

		expect(screen.getByTestId(testId)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-heading`)).toHaveTextContent(
			'FEBRUARY 2024',
		)
		expect(screen.getByTestId(`${testId}-add-event-button`)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-today-button`)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-prev-button`)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-next-button`)).toBeTruthy()
	})

	it('should fire setMonth when prev button is clicked', () => {
		render(<CalendarHeader />)

		screen.getByTestId(`${testId}-prev-button`).click()
		expect(contextMock.setMonth).toHaveBeenCalledWith(contextMock.month - 1)
	})

	it('should fire setMonth when next button is clicked', () => {
		render(<CalendarHeader />)

		screen.getByTestId(`${testId}-next-button`).click()
		expect(contextMock.setMonth).toHaveBeenCalledWith(contextMock.month + 1)
	})

	it('should fire setMonth when today button is clicked', () => {
		render(<CalendarHeader />)

		screen.getByTestId(`${testId}-prev-button`).click()
		expect(contextMock.setMonth).toHaveBeenCalledTimes(1)
	})

	it('should fire setIsEventModalOpen and setSelectedDay when add event button is clicked', () => {
		render(<CalendarHeader />)

		screen.getByTestId(`${testId}-add-event-button`).click()
		expect(contextMock.setIsEventModalOpen).toHaveBeenCalledTimes(1)
		expect(contextMock.setSelectedDay).toHaveBeenCalledTimes(1)
	})
})
