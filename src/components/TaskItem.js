// src/components/TaskItem.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/TaskContext';

// const ItemContainer = styled.div`
//   padding: 10px;
//   border-bottom: 1px solid #ccc;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const TaskActions = styled.div`
//   & > button {
//     margin-left: 10px;
//     background: ${({ theme }) => theme.primaryColor};
//     color: #fff;
//     border: none;
//     padding: 5px 10px;
//     border-radius: 3px;
//     cursor: pointer;
//   }
// `;

const ItemContainer = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
 
  &:hover {
    transform: translateY(-2px);
  }
`;



const TaskActions = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: ${({ theme }) => theme.primaryColor};
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.buttonHover};
    }
  }
`;
const TaskItem = ({ task }) => {
    const { deleteTask, toggleTaskStatus } = useContext(TaskContext);

    return (
        <ItemContainer>
            <div>
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                <small>Status: {task.status}</small>
            </div>
            <TaskActions>
                <button onClick={() => toggleTaskStatus(task.id)}>
                    {task.status === 'In progress' ? 'Complete' : 'Restart'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </TaskActions>
        </ItemContainer>
    );
};

export default TaskItem;
