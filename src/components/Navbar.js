import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: ${({ theme }) => theme.navBackground};
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryText};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primaryText};
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.primaryColor};
      color: #fff;
    }

    &.active {
      background: ${({ theme }) => theme.primaryColor};
      color: #fff;
    }
  }
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <Logo>Task Manager</Logo>
      <NavLinks>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Main</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
  
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
