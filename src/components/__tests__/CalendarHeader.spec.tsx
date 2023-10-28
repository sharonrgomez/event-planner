import {render, screen} from '@testing-library/react'
import {CalendarHeader} from '..'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('february 2024'),
		month: jest.fn().mockReturnValue(1),
		year: jest.fn().mockReturnValue(2024),
	}),
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
})
