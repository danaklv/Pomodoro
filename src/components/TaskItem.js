

// import React, { useContext, useState } from 'react';
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

// /* Новый стиль для input */
// const EditContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px; /* Отступ между input */
//   margin-bottom: 10px; /* Отступ перед кнопками */

//   input {
//     width: 100%;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//   }
// `;

// const TaskItem = ({ task }) => {
//     const { deleteTask, toggleTaskStatus, editTask } = useContext(TaskContext);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description });

//     const handleSave = () => {
//         editTask(task.id, editedTask);
//         setIsEditing(false);
//     };

//     return (
//         <ItemContainer>
//             <div>
//                 {isEditing ? (
//                     <EditContainer>
//                         <input
//                             type="text"
//                             value={editedTask.name}
//                             onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
//                             placeholder="Название задачи"
//                         />
//                         <input
//                             type="text"
//                             value={editedTask.description}
//                             onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
//                             placeholder="Описание задачи"
//                         />
//                     </EditContainer>
//                 ) : (
//                     <>
//                         <h4>{task.name}</h4>
//                         <p>{task.description}</p>
//                         <small>Status: {task.status}</small>
//                     </>
//                 )}
//             </div>
//             <TaskActions>
//                 {isEditing ? (
//                     <button onClick={handleSave}>Save</button>
//                 ) : (
//                     <button onClick={() => setIsEditing(true)}>Edit</button>
//                 )}
//                 <button onClick={() => toggleTaskStatus(task.id)}>
//                     {task.status === 'In progress' ? 'Complete' : 'Restart'}
//                 </button>
//                 <button onClick={() => deleteTask(task.id)}>Delete</button>
//             </TaskActions>
//         </ItemContainer>
//     );
// };

// export default TaskItem;



// import React, { useContext, useState } from "react";
// import styled from "styled-components";
// import { TaskContext } from "../context/TaskContext";
// import { FiMoreVertical, FiEdit, FiTrash2, FiCheckCircle, FiRefreshCcw } from "react-icons/fi";
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

// const EditContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-bottom: 10px;

//   input {
//     width: 100%;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//   }
// `;

// const TaskActions = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
// `;

// /* Кнопка меню */
// const MenuButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   transition: background 0.2s ease-in-out;

//   &:hover {
//     background: rgba(0, 0, 0, 0.1);
//   }
// `;

// /* Выпадающее меню */
// const DropdownMenu = styled.div`
//   position: absolute;
//   top: 30px;
//   right: 0;
//   background: ${({ theme }) => theme.cardBackground};
//   border-radius: 8px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   z-index: 100;
//   display: flex;
//   flex-direction: column;
//   min-width: 150px;
// `;

// /* Элементы меню */
// const MenuItem = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   background: none;
//   border: none;
//   padding: 10px 15px;
//   cursor: pointer;
//   width: 100%;
//   text-align: left;
//   color: ${({ theme }) => theme.textColor};
//   transition: background 0.2s ease-in-out;

//   &:hover {
//     background: ${({ theme }) => theme.buttonHover};
//     color: white;
//   }

//   svg {
//     width: 16px;
//     height: 16px;
//   }
// `;



// const TaskItem = ({ task }) => {
//     const { deleteTask, toggleTaskStatus, editTask } = useContext(TaskContext);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description });
//     const [menuOpen, setMenuOpen] = useState(false);

//     const handleSave = () => {
//         editTask(task.id, editedTask);
//         setIsEditing(false);
//     };

//     return (
//         <ItemContainer>
//             <div>
//                 {isEditing ? (
//                     <EditContainer>
//                         <input
//                             type="text"
//                             value={editedTask.name}
//                             onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
//                             placeholder="Название задачи"
//                         />
//                         <input
//                             type="text"
//                             value={editedTask.description}
//                             onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
//                             placeholder="Описание задачи"
//                         />
//                     </EditContainer>
//                 ) : (
//                     <>
//                         <h4>{task.name}</h4>
//                         <p>{task.description}</p>
//                         <small>Status: {task.status}</small>
//                     </>
//                 )}
//             </div>

//             {/* Кнопка меню */}
//             <TaskActions>
//                 <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
//                     <FiMoreVertical size={20} />
//                 </MenuButton>

//                 {menuOpen && (
//                     <DropdownMenu>
//                         {isEditing ? (
//                             <MenuItem onClick={handleSave}>
//                                 <FiCheckCircle /> Save
//                             </MenuItem>
//                         ) : (
//                             <MenuItem onClick={() => setIsEditing(true)}>
//                                 <FiEdit /> Edit
//                             </MenuItem>
//                         )}
//                         <MenuItem onClick={() => toggleTaskStatus(task.id)}>
//                             {task.status === "In progress" ? <FiCheckCircle /> : <FiRefreshCcw />}
//                             {task.status === "In progress" ? "Complete" : "Restart"}
//                         </MenuItem>
//                         <MenuItem onClick={() => deleteTask(task.id)}>
//                             <FiTrash2 /> Delete
//                         </MenuItem>
//                     </DropdownMenu>
//                 )}
//             </TaskActions>
//         </ItemContainer>
//     );
// };

// export default TaskItem;

import React, { useContext, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { TaskContext } from "../context/TaskContext";
import { FaEllipsisV, FaCheckCircle, FaUndo } from "react-icons/fa";

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
  position: relative;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TaskActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.primaryColor};

  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const Menu = styled.div`
  position: absolute;
  right: 10px;
  top: 40px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    color: white;
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 5px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background: ${({ theme, primary }) =>
    primary ? theme.primaryColor : theme.buttonHover};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

/* === Модальное окно === */
const EditModal = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <h3>Редактировать задачу</h3>
        <Input
          type="text"
          value={editedTask.name}
          onChange={(e) =>
            setEditedTask({ ...editedTask, name: e.target.value })
          }
          placeholder="Название задачи"
        />
        <Input
          type="text"
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          placeholder="Описание задачи"
        />
        <ButtonGroup>
          <Button onClick={onClose}>Close</Button>
          <Button primary onClick={() => onSave(editedTask)}>
            Save
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

const TaskItem = ({ task }) => {
  const { deleteTask, toggleTaskStatus, editTask } = useContext(TaskContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef(null);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = (editedTask) => {
    editTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <ItemContainer>
      <div>
        <h4>{task.name}</h4>
        <p>{task.description}</p>
        <small>Status: {task.status}</small>
      </div>
      <TaskActions>
        {/* Кнопка Complete / Restart */}
        <IconButton onClick={() => toggleTaskStatus(task.id)}>
          {task.status === "In progress" ? <FaCheckCircle /> : <FaUndo />}
        </IconButton>

        {/* Кнопка троеточия */}
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV />
        </IconButton>

        {/* Меню с Edit и Delete */}
        <Menu ref={menuRef} isOpen={menuOpen}>
          <MenuItem
            onClick={() => {
              setIsEditing(true);
              setMenuOpen(false);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={() => deleteTask(task.id)}>Delete</MenuItem>
        </Menu>
      </TaskActions>

      {/* Модальное окно редактирования */}
      {isEditing && (
        <EditModal task={task} onClose={() => setIsEditing(false)} onSave={handleSave} />
      )}
    </ItemContainer>
  );
};

export default TaskItem;
