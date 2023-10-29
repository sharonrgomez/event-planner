import {render, screen} from '@testing-library/react'
import {Day} from '..'

jest.mock('dayjs', () => ({
	__esModule: true,
	default: () => ({
		format: jest.fn().mockReturnValue('october 2023'),
		month: jest.fn().mockReturnValue({format: jest.fn()}),
	}),
}))

describe('<Day />', () => {
	const testId = 'day'

	const props = {
		day: {
			month: jest.fn(),
			format: jest.fn().mockReturnValue('10-28-2023'),
			isSame: jest.fn(),
		} as any,
		rowIdx: 1,
	}

	it('should render', () => {
		render(<Day {...props} />)

		expect(screen.getByTestId(testId)).toBeTruthy()
		expect(screen.getByTestId(`${testId}-date`)).toBeTruthy()
	})

	it('should render weekdays on first row', () => {
		render(<Day {...props} rowIdx={0} />)

		expect(screen.getByTestId(`${testId}-weekday`)).toBeTruthy()
	})

	it('should render events', () => {
		render(<Day {...props} />)

		expect(screen.getByTestId(`${testId}-events`)).toBeTruthy()
	})
})
