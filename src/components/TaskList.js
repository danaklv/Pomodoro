// src/components/TaskList.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';



const ListContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 200px;
  min-width: 700px;
`;


// const ListContainer = styled.div`
//   background: ${({ theme }) => theme.cardBackground};
//   padding: 20px;
//   border-radius: 10px;
// `;

const TaskList = () => {
    const { tasks } = useContext(TaskContext);
    const [filter, setFilter] = useState('All');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    return (
        <ListContainer>
            <h2>Your Tasks</h2>
            <TaskForm />
            <FilterBar filter={filter} setFilter={setFilter} />
            {filteredTasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ListContainer>
    );
};

export default TaskList;
