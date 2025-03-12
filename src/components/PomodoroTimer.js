// src/components/PomodoroTimer.js
import React, { useState, useEffect, useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import { TaskContext } from '../context/TaskContext';


const TimerContainer = styled.div`
    position: relative;
    background: ${({ theme }) => theme.cardBackground};
    padding: 20px;
    border-radius: 12px;
    min-width: 700px;
    margin-bottom: 20px;
    margin-right: 200px;
    margin-left: 200px;
  
    text-align: center;
    

    @media (max-width: 1024px) {
        min-width: 500px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        min-width: 100%;
        padding: 15px;
    }

    @media (max-width: 480px) {
        padding: 10px;
    }
   
`;

const SettingsButton = styled.button`
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${({ theme }) => theme.textColor};
`;


const TimerButton = styled.button`
    background: ${({ theme }) => theme.primaryColor};
    border: none;
    color: #fff;
    padding: 12px 24px;
    margin-right: 8px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease-in-out, transform 0.1s ease-in;
    
    &:hover {
        background: ${({ theme }) => theme.buttonHover};
        transform: translateY(-2px);
    }
`;

const ArrowButton = styled.button`
    background: ${({ theme }) => theme.primaryColor};
    border: none;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: background 0.2s ease-in;

    &:hover {
        background:${({ theme }) => theme.buttonHover};
    }
`;


const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DurationForm = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
`;

const DurationInput = styled.input`
    
    padding: 8px;
    width: 80px;
    border: 1px solid ${({ theme }) => theme.primaryColor};
    border-radius: 5px;
    text-align: center;
`;

const SetDurationButton = styled.button`
    background: ${({ theme }) => theme.primaryColor};
    border: none;
    color: #fff;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
`;

const CircularTimerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;


const DurationModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.cardBackground};
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: ${({ show }) => (show ? 'block' : 'none')};
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${({ show }) => (show ? 'block' : 'none')};
    z-index: 999;
`;

const StyledSelect = styled.select`
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.textColor};
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        border-color: ${({ theme }) => theme.buttonHover};
    }
`;

const PomodoroTimer = () => {
    // Timer durations (in seconds)
    const [workDuration, setWorkDuration] = useState(25 * 60);
    const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60);
    const longBreakDuration = 15 * 60; // Fixed long break duration
    const [currentBreakDuration, setCurrentBreakDuration] = useState(shortBreakDuration);

    // Cycle counter: every completed work session increases the count.
    // On the 4th session, a long break is used.
    const [cycleCount, setCycleCount] = useState(0);

    // Timer state
    const [seconds, setSeconds] = useState(workDuration);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Work'); // "Work" or "Rest"

    // Duration input states (in minutes)
    const [workDurationInput, setWorkDurationInput] = useState(25);
    const [shortBreakInput, setShortBreakInput] = useState(5);

    // Toggle to show/hide duration settings
    const [showDurationSettings, setShowDurationSettings] = useState(false);

    // Get tasks from context
    const { tasks } = useContext(TaskContext);
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const selectedTask = tasks.find(task => task.id.toString() === selectedTaskId);

    // Timer countdown effect
    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        } else if (isActive && seconds === 0) {
            // When the timer finishes, switch modes.
            if (mode === 'Work') {
                const newCycleCount = cycleCount + 1;
                if (newCycleCount === 4) {
                    setMode('Rest');
                    setSeconds(longBreakDuration);
                    setCurrentBreakDuration(longBreakDuration);
                    setCycleCount(0);
                } else {
                    setMode('Rest');
                    setSeconds(shortBreakDuration);
                    setCurrentBreakDuration(shortBreakDuration);
                    setCycleCount(newCycleCount);
                }
            } else {
                setMode('Work');
                setSeconds(workDuration);
            }
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, mode, workDuration, shortBreakDuration, longBreakDuration, cycleCount]);

    // Toggle timer: pause/resume without resetting the seconds.
    const toggleTimer = () => {
        setIsActive(prev => !prev);
    };

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'Work') {
            setSeconds(workDuration);
        } else {
            setSeconds(currentBreakDuration);
        }
    };

    const skipToBreak = () => {
        if (mode === 'Work') {
            const newCycleCount = cycleCount + 1;
            if (newCycleCount === 4) {
                setMode('Rest');
                setSeconds(longBreakDuration);
                setCurrentBreakDuration(longBreakDuration);
                setCycleCount(0);
            } else {
                setMode('Rest');
                setSeconds(shortBreakDuration);
                setCurrentBreakDuration(shortBreakDuration);
                setCycleCount(newCycleCount);
            }
            setIsActive(false);
        }
    };

    const skipBreak = () => {
        if (mode === 'Rest') {
            setMode('Work');
            setSeconds(workDuration);
            setIsActive(false);
        }
    };

    // Helper function to format seconds into MM:SS.
    const formatTime = (sec) => {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    const updateDurations = () => {
        const newWorkDuration = workDurationInput * 60;
        const newShortBreakDuration = shortBreakInput * 60;
        setWorkDuration(newWorkDuration);
        setShortBreakDuration(newShortBreakDuration);
        if (mode === 'Rest' && currentBreakDuration !== longBreakDuration) {
            setCurrentBreakDuration(newShortBreakDuration);
            setSeconds(newShortBreakDuration);
        } else if (mode === 'Work') {
            setSeconds(newWorkDuration);
        }
        setShowDurationSettings(false);
    };

    // Determine the total time for the current session.
    const totalTime = mode === 'Work' ? workDuration : currentBreakDuration;




    return (
        <TimerContainer>
            <SettingsButton onClick={() => setShowDurationSettings(!showDurationSettings)}>
                &#x2699;
            </SettingsButton>
            <h3>{mode} Timer</h3>
            <StyledSelect value={selectedTaskId} onChange={(e) => setSelectedTaskId(e.target.value)}>
                <option value="" disabled> Select a Task </option>
                {tasks.map(task => (
                    <option key={task.id} value={task.id}>
                       {task.name} ({task.status}) - {task.completedTomatoes}/{task.tomatoCount} 🍅
                    </option>
                ))}
            </StyledSelect>
            {selectedTask && mode === 'Work' && (
                <p>
                      Working on: <strong>{selectedTask.name}</strong> ({selectedTask.completedTomatoes}/{selectedTask.tomatoCount} 🍅)
                </p>
            )}
            <Overlay show={showDurationSettings} onClick={() => setShowDurationSettings(false)} />
            <DurationModal show={showDurationSettings}>
                <DurationForm>
                    <div>
                        <label>
                            Work Duration (min):
                            <DurationInput
                                type="number"
                                min="1"
                                value={workDurationInput}
                                onChange={(e) => setWorkDurationInput(Number(e.target.value))}
                            />
                        </label>
                        
                        
                    </div>
                    <div>
                        <label>
                            Break Duration (min):
                            <DurationInput
                                type="number"
                                min="1"
                                value={shortBreakInput}
                                onChange={(e) => setShortBreakInput(Number(e.target.value))}
                            />
                        </label>
                    </div>
                    <SetDurationButton onClick={updateDurations}>
                        Set Durations
                    </SetDurationButton>
                </DurationForm>
            </DurationModal>
            <CircularTimerContainer>
                <CircularTimer seconds={seconds} totalTime={totalTime} formatTime={formatTime} />
            </CircularTimerContainer>
            <ButtonContainer>
                <div>
                    <TimerButton onClick={toggleTimer}>
                        {isActive ? 'Pause' : 'Start'}
                    </TimerButton>
                    <TimerButton onClick={resetTimer}>Reset</TimerButton>
                </div>
                <ArrowButton
                    onClick={mode === 'Work' ? skipToBreak : skipBreak}
                    title={mode === 'Work' ? "Skip to Break" : "Skip Break"}
                >
                    &#x27A1;
                </ArrowButton>
            </ButtonContainer>
        </TimerContainer>
    );
    




};



const CircularTimer = ({ seconds, totalTime, formatTime }) => {
    const theme = useTheme();
    const radius = 120;
    const stroke = 10;
    const normalizedRadius = radius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = seconds / totalTime;
    const strokeDashoffset = circumference - (1 - progress) * circumference;

    return (
        <div style={{ marginTop: "20px" }}> 
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#e6e6e6"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={theme.primaryColor}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
                <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                    fill={theme.textColor}
                    fontSize="50px"
                >
                    {formatTime(seconds)}
                </text>
            </svg>
        </div>
    );
};


export default PomodoroTimer;
