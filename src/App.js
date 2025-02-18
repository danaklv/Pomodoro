


// // src/App.js
// import React, { useState } from 'react';
// import { ThemeProvider } from 'styled-components';
// import { GlobalStyles } from './styles/GlobalStyles';
// import { lightTheme, darkTheme } from './styles/theme';
// import TaskProvider from './context/TaskContext';
// import TaskList from './components/TaskList';
// import PomodoroTimer from './components/PomodoroTimer';
// import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import About from './pages/About';
// import styled from 'styled-components';

// const AppContainer = styled.div`
//     max-width: 1200px;
   
//     margin-top: 100px;
//     margin-left: 200px;

//     padding: 25px;
//     border-radius: 12px;
//     background: ${({ theme }) => theme.cardBackground};
//     box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
//     border: 1px solid ${({ theme }) => theme.borderColor};
// `;

// const ThemeSwitcher = styled.button`
//     background: ${({ theme }) => theme.secondaryColor};
//     color: #fff;
//     border: none;
//     padding: 10px 20px;
//     border-radius: 25px;
//     cursor: pointer;
//     transition: background 0.3s ease-in-out;
//     margin-bottom: 15px;

//     &:hover {
//         background: ${({ theme }) => theme.primaryColor};
//     }
// `;

// const ContentWrapper = styled.div`
//     display: flex;
//     align-items: flex-start;
//     gap: 20px;
//     flex-wrap: wrap;
// `;

// function App() {
//     const [theme, setTheme] = useState('light');

//     const toggleTheme = () => {
//         setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
//     };

//     return (
//         <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
//             <GlobalStyles />
//             <TaskProvider>
//                 <Router>
//                     <Navbar />
//                     <AppContainer>
//                         <ThemeSwitcher onClick={toggleTheme}>
//                             Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
//                         </ThemeSwitcher>
                      
//                         <Routes>
//                             <Route
//                                 path="/"
//                                 element={
//                                     <ContentWrapper>
//                                         <PomodoroTimer />
//                                         <TaskList />
//                                     </ContentWrapper>
//                                 }
//                             />
//                             <Route path="/about" element={<About />} />
//                             <Route path="/login" element={<Login />} />
//                             <Route path="/register" element={<Register />} />
//                         </Routes>
//                     </AppContainer>
//                 </Router>
//             </TaskProvider>
//         </ThemeProvider>
//     );
// }

// export default App;


import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme, yellowTheme } from './styles/theme'; // Импортируем новую тему
import TaskProvider from './context/TaskContext';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import styled from 'styled-components';

const AppContainer = styled.div`
    max-width: 1200px;
    margin-top: 100px;
    margin-left: 200px;
    padding: 25px;
    border-radius: 12px;
    background: ${({ theme }) => theme.cardBackground};
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.borderColor};
`;

const ThemeSwitcher = styled.button`
    background: ${({ theme }) => theme.secondaryColor};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    margin-bottom: 15px;

    &:hover {
        background: ${({ theme }) => theme.primaryColor};
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
`;

const themes = {
    light: lightTheme,
    dark: darkTheme,
    yellow: yellowTheme
};

const themeOrder = ['light', 'dark', 'yellow']; // Порядок переключения

function App() {
    const [themeName, setThemeName] = useState('light');

    const toggleTheme = () => {
        const nextTheme = themeOrder[(themeOrder.indexOf(themeName) + 1) % themeOrder.length];
        setThemeName(nextTheme);
    };

    return (
        <ThemeProvider theme={themes[themeName]}>
            <GlobalStyles />
            <TaskProvider>
                <Router>
                    <Navbar />
                    <AppContainer>
                        <ThemeSwitcher onClick={toggleTheme}>
                            Switch to {themeOrder[(themeOrder.indexOf(themeName) + 1) % themeOrder.length]} Mode
                        </ThemeSwitcher>

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ContentWrapper>
                                        <PomodoroTimer />
                                        <TaskList />
                                    </ContentWrapper>
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </AppContainer>
                </Router>
            </TaskProvider>
        </ThemeProvider>
    );
}

export default App;
