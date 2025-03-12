
import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks(prev => [...prev, task]);
    };

    const editTask = (id, updatedTask) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updatedTask } : task));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const toggleTaskStatus = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, status: task.status === 'In progress' ? 'Completed' : 'In progress' }
                    : task
            )
        );
    };

    const updateTomatoCount = (taskId, newCount) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { 
                  ...task, 
                  completedTomatoes: newCount,
                  status: newCount >= task.tomatoCount ? "Completed" : "In progress" 
                }
              : task
          )
        );
      };
      
 
    

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTaskStatus,updateTomatoCount }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
