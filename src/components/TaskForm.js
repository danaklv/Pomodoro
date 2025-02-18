// src/components/TaskForm.js
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/TaskContext';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primaryColor};
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s ease-in;

  &:hover {
    background: #388e3c;
  }
`;

const TaskForm = () => {
    const { addTask } = useContext(TaskContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') return; // Ensure a task name is provided

        // Create a new task with a unique id (using Date.now() as a simple method)
        const newTask = {
            id: Date.now(),
            name,
            description,
            status: 'In progress',
        };

        addTask(newTask);
        setName('');
        setDescription('');
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextArea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
            />
            <SubmitButton type="submit">Add Task</SubmitButton>
        </FormContainer>
    );
};

export default TaskForm;
