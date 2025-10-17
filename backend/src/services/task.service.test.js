const { createTask } = require('../services/taskService');
const Task = require('../models/taskModel');

// Mock mongoose
jest.mock('../models/taskModel');

describe('Create Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a task with valid input', async () => {
    // Arrange
    const mockTaskData = {
      description: 'Coffee',
      amount: -4.50,
      type: 'expense'
    };

    const mockSavedTask = {
      _id: '507f1f77bcf86cd799439011',
      description: 'Coffee',
      amount: -4.50,
      type: 'expense',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      save: jest.fn().mockResolvedValue()
    };

    // Mock the Task constructor
    Task.mockImplementation(() => mockSavedTask);

    // Act
    const result = await createTask(mockTaskData);

    // Assert
    expect(Task).toHaveBeenCalledWith(mockTaskData);
    expect(mockSavedTask.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockSavedTask);
    expect(result.description).toBe('Coffee');
    expect(result.amount).toBe(-4.50);
    expect(result.type).toBe('expense');
  });

  test('should handle task creation with different types', async () => {
    // Arrange
    const mockTaskData = {
      description: 'Salary',
      amount: 5000.00,
      type: 'income'
    };

    const mockSavedTask = {
      _id: '507f1f77bcf86cd799439012',
      description: 'Salary',
      amount: 5000.00,
      type: 'income',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      save: jest.fn().mockResolvedValue()
    };

    Task.mockImplementation(() => mockSavedTask);

    // Act
    const result = await createTask(mockTaskData);

    // Assert
    expect(Task).toHaveBeenCalledWith(mockTaskData);
    expect(mockSavedTask.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockSavedTask);
    expect(result.type).toBe('income');
    expect(result.amount).toBe(5000.00);
  });

  test('should throw error when save fails', async () => {
    // Arrange
    const mockTaskData = {
      description: 'Coffee',
      amount: -4.50,
      type: 'expense'
    };

    const mockError = new Error('Database connection failed');
    const mockSavedTask = {
      save: jest.fn().mockRejectedValue(mockError)
    };
    
    Task.mockImplementation(() => mockSavedTask);

    // Act & Assert
    await expect(createTask(mockTaskData)).rejects.toThrow('Database connection failed');
    expect(Task).toHaveBeenCalledWith(mockTaskData);
    expect(mockSavedTask.save).toHaveBeenCalledTimes(1);
  });

  test('should create task with minimal required data', async () => {
    // Arrange
    const mockTaskData = {
      title: 'Test Task'
    };

    const mockSavedTask = {
      _id: '507f1f77bcf86cd799439013',
      title: 'Test Task',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      save: jest.fn().mockResolvedValue()
    };

    Task.mockImplementation(() => mockSavedTask);

    // Act
    const result = await createTask(mockTaskData);

    // Assert
    expect(Task).toHaveBeenCalledWith(mockTaskData);
    expect(mockSavedTask.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockSavedTask);
    expect(result.title).toBe('Test Task');
  });
});