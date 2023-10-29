import {render, screen} from '@testing-library/react'
import {DeleteConfirmationModal} from '..'

var contextMock = {
	setIsDeleteConfirmationModalOpen: jest.fn(),
	selectedEvent: {
		id: '1234',
		title: 'Meeting',
		description: 'test',
		date: '12-25-2023',
		time: '09:30',
		label: {
			color: 'bg-red-400',
			hoverColor: 'bg-red-500',
		},
	},
	setSelectedEvent: jest.fn(),
	isEventModalOpen: false,
	setIsEventModalOpen: jest.fn(),
	dispatchSaveEvent: jest.fn(),
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

describe('<DeleteConfirmationModal />', () => {
	const testId = 'delete-confirmation-modal'

	it('should render', () => {
		render(<DeleteConfirmationModal />)

		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-title`)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-cancel-button`)).toBeInTheDocument()
		expect(screen.getByTestId(`${testId}-delete-button`)).toBeInTheDocument()
	})

	it('should call setIsDeleteConfirmationModalOpen and setIsEventModalOpen when clicking cancel button', () => {
		render(<DeleteConfirmationModal />)

		screen.getByTestId(`${testId}-cancel-button`).click()
		expect(contextMock.setIsDeleteConfirmationModalOpen).toHaveBeenCalledWith(
			false,
		)
		expect(contextMock.setIsEventModalOpen).toHaveBeenCalledWith(true)
	})

	it('should call dispatchSaveEvent, setIsDeleteConfirmationModalOpen, and setSelectedEvent when clicking delete button', () => {
		render(<DeleteConfirmationModal />)

		screen.getByTestId(`${testId}-delete-button`).click()
		expect(contextMock.setIsDeleteConfirmationModalOpen).toHaveBeenCalledWith(
			false,
		)
		expect(contextMock.setSelectedEvent).toHaveBeenCalledWith(null)
		expect(contextMock.dispatchSaveEvent).toHaveBeenCalledWith({
			type: 'delete',
			payload: contextMock.selectedEvent,
		})
	})
})
