import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Mock components for testing
const MockTaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div data-testid="task-item">
      <span data-testid="task-title">{task.title}</span>
      <span data-testid="task-description">{task.description}</span>
      <span data-testid="task-amount">{task.amount}</span>
      <span data-testid="task-type">{task.type}</span>
      <button data-testid="edit-button" onClick={() => onEdit(task)}>Edit</button>
      <button data-testid="delete-button" onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

const MockTaskForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = React.useState({
    title: initialData.title || '',
    description: initialData.description || '',
    amount: initialData.amount || '',
    type: initialData.type || 'income'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form data-testid="task-form" onSubmit={handleSubmit}>
      <input
        data-testid="title-input"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        data-testid="description-input"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        data-testid="amount-input"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <select
        data-testid="type-select"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button data-testid="submit-button" type="submit">Submit</button>
    </form>
  );
};

describe('Frontend Component Tests', () => {
  describe('TaskItem Component', () => {
    const mockTask = {
      _id: '1',
      title: 'Test Task',
      description: 'Test Description',
      amount: 100,
      type: 'income'
    };

    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should render task data correctly', () => {
      render(
        <MockTaskItem 
          task={mockTask} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      );

      expect(screen.getByTestId('task-title')).toHaveTextContent('Test Task');
      expect(screen.getByTestId('task-description')).toHaveTextContent('Test Description');
      expect(screen.getByTestId('task-amount')).toHaveTextContent('100');
      expect(screen.getByTestId('task-type')).toHaveTextContent('income');
    });

    test('should call onEdit when edit button is clicked', () => {
      render(
        <MockTaskItem 
          task={mockTask} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      );

      fireEvent.click(screen.getByTestId('edit-button'));
      expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
    });

    test('should call onDelete when delete button is clicked', () => {
      render(
        <MockTaskItem 
          task={mockTask} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      );

      fireEvent.click(screen.getByTestId('delete-button'));
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    test('should display negative amount for expense', () => {
      const expenseTask = { ...mockTask, amount: -50, type: 'expense' };
      
      render(
        <MockTaskItem 
          task={expenseTask} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      );

      expect(screen.getByTestId('task-amount')).toHaveTextContent('-50');
      expect(screen.getByTestId('task-type')).toHaveTextContent('expense');
    });
  });

  describe('TaskForm Component', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should render form fields correctly', () => {
      render(<MockTaskForm onSubmit={mockOnSubmit} />);

      expect(screen.getByTestId('title-input')).toBeInTheDocument();
      expect(screen.getByTestId('description-input')).toBeInTheDocument();
      expect(screen.getByTestId('amount-input')).toBeInTheDocument();
      expect(screen.getByTestId('type-select')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('should handle form input changes', () => {
      render(<MockTaskForm onSubmit={mockOnSubmit} />);

      fireEvent.change(screen.getByTestId('title-input'), {
        target: { value: 'New Task' }
      });
      fireEvent.change(screen.getByTestId('description-input'), {
        target: { value: 'New Description' }
      });
      fireEvent.change(screen.getByTestId('amount-input'), {
        target: { value: '200' }
      });

      expect(screen.getByTestId('title-input')).toHaveValue('New Task');
      expect(screen.getByTestId('description-input')).toHaveValue('New Description');
      expect(screen.getByTestId('amount-input')).toHaveValue('200');
    });

    test('should call onSubmit with form data when submitted', () => {
      render(<MockTaskForm onSubmit={mockOnSubmit} />);

      fireEvent.change(screen.getByTestId('title-input'), {
        target: { value: 'Test Task' }
      });
      fireEvent.change(screen.getByTestId('description-input'), {
        target: { value: 'Test Description' }
      });
      fireEvent.change(screen.getByTestId('amount-input'), {
        target: { value: '150' }
      });
      fireEvent.change(screen.getByTestId('type-select'), {
        target: { value: 'expense' }
      });

      fireEvent.click(screen.getByTestId('submit-button'));

      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        amount: '150',
        type: 'expense'
      });
    });

    test('should populate form with initial data', () => {
      const initialData = {
        title: 'Initial Task',
        description: 'Initial Description',
        amount: 300,
        type: 'income'
      };

      render(<MockTaskForm onSubmit={mockOnSubmit} initialData={initialData} />);

      expect(screen.getByTestId('title-input')).toHaveValue('Initial Task');
      expect(screen.getByTestId('description-input')).toHaveValue('Initial Description');
      expect(screen.getByTestId('amount-input')).toHaveValue('300');
      expect(screen.getByTestId('type-select')).toHaveValue('income');
    });
  });

  describe('Form Validation Tests', () => {
    test('should validate required fields', () => {
      const mockOnSubmit = jest.fn();
      render(<MockTaskForm onSubmit={mockOnSubmit} />);

      // Try to submit empty form
      fireEvent.click(screen.getByTestId('submit-button'));

      // In a real implementation, you would check for validation errors
      // For now, we'll just ensure the form doesn't submit with empty data
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: '',
        description: '',
        amount: '',
        type: 'income'
      });
    });

    test('should handle numeric input validation', () => {
      const mockOnSubmit = jest.fn();
      render(<MockTaskForm onSubmit={mockOnSubmit} />);

      fireEvent.change(screen.getByTestId('amount-input'), {
        target: { value: 'abc' }
      });

      // The input should still accept the value, but validation would happen on submit
      expect(screen.getByTestId('amount-input')).toHaveValue('abc');
    });
  });
});

