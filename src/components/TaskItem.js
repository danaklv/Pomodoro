

import React, { useContext, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { TaskContext } from "../context/TaskContext";
import { FaEllipsisV, FaCheckCircle, FaUndo, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

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


const EditModal = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <h3>Edit task</h3>
        <Input
          type="text"
          value={editedTask.name}
          onChange={(e) =>
            setEditedTask({ ...editedTask, name: e.target.value })
          }
          placeholder="Task Title"
        />
        <Input
          type="text"
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          placeholder="Task Description"
        />
         <Input
          type="number"
          value={editedTask.tomatoCount}
          onChange={(e) =>
            setEditedTask({ ...editedTask, tomatoCount: Number(e.target.value) })
          }
          placeholder="Number of Tomatoes"
          min="1"
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

  
  const { deleteTask, toggleTaskStatus, editTask, updateTomatoCount } = useContext(TaskContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef(null);

  // close when mouse out of window
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
        <p>🍅 Tomatoes: {task.completedTomatoes}/{task.tomatoCount}</p>
        <small>Status: {task.status}</small>
      </div>
      <TaskActions>
      <IconButton onClick={() => updateTomatoCount(task.id, task.completedTomatoes - 1)} disabled={task.completedTomatoes === 0} >
      <FaMinusCircle/>
    </IconButton>
    <IconButton onClick={() => updateTomatoCount(task.id, task.completedTomatoes + 1)}  disabled={task.completedTomatoes >= task.tomatoCount} >
    <FaPlusCircle />
    </IconButton>
        {}
        <IconButton onClick={() => toggleTaskStatus(task.id)}>
          {task.status === "In progress" ? <FaCheckCircle /> : <FaUndo />}
        </IconButton>

        {}
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV />
        </IconButton>

        {}
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

      {}
      {isEditing && (
        <EditModal task={task} onClose={() => setIsEditing(false)} onSave={handleSave} />
      )}
    </ItemContainer>
  );
};

export default TaskItem;
