
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Timer from './Timer';
import TaskList from './TaskList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
`;

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Content>
        <Timer />
        <TaskList />
      </Content>
    </Container>
  );
};

export default Layout;