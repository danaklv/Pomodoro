// src/components/TaskItem.js
// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { TaskContext } from '../context/TaskContext';


// const ItemContainer = styled.div`
//   padding: 15px;
//   margin-bottom: 10px;
//   background: ${({ theme }) => theme.cardBackground};
//   border-radius: 8px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: transform 0.2s ease-in-out;
 
//   &:hover {
//     transform: translateY(-2px);
//   }
// `;



// const TaskActions = styled.div`
//   display: flex;
//   gap: 10px;

//   button {
//     background: ${({ theme }) => theme.primaryColor};
//     color: #fff;
//     border: none;
//     padding: 8px 14px;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background 0.3s ease-in-out;

//     &:hover {
//       background: ${({ theme }) => theme.buttonHover};
//     }
//   }
// `;
// const TaskItem = ({ task }) => {
//     const { deleteTask, toggleTaskStatus } = useContext(TaskContext);

//     return (
//         <ItemContainer>
//             <div>
//                 <h4>{task.name}</h4>
//                 <p>{task.description}</p>
//                 <small>Status: {task.status}</small>
//             </div>
//             <TaskActions>
//                 <button onClick={() => toggleTaskStatus(task.id)}>
//                     {task.status === 'In progress' ? 'Complete' : 'Restart'}
//                 </button>
//                 <button onClick={() => deleteTask(task.id)}>Delete</button>
//             </TaskActions>
//         </ItemContainer>
//     );
// };

// export default TaskItem;


import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/TaskContext';

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

/* Новый стиль для input */
const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Отступ между input */
  margin-bottom: 10px; /* Отступ перед кнопками */

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const TaskItem = ({ task }) => {
    const { deleteTask, toggleTaskStatus, editTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description });

    const handleSave = () => {
        editTask(task.id, editedTask);
        setIsEditing(false);
    };

    return (
        <ItemContainer>
            <div>
                {isEditing ? (
                    <EditContainer>
                        <input
                            type="text"
                            value={editedTask.name}
                            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                            placeholder="Название задачи"
                        />
                        <input
                            type="text"
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            placeholder="Описание задачи"
                        />
                    </EditContainer>
                ) : (
                    <>
                        <h4>{task.name}</h4>
                        <p>{task.description}</p>
                        <small>Status: {task.status}</small>
                    </>
                )}
            </div>
            <TaskActions>
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button onClick={() => toggleTaskStatus(task.id)}>
                    {task.status === 'In progress' ? 'Complete' : 'Restart'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </TaskActions>
        </ItemContainer>
    );
};

export default TaskItem;
