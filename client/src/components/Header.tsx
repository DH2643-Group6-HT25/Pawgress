import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


interface HeaderProps {
  primary?: boolean;
  onLogout?: () => void;
}

const HeaderWrapper = styled.header`
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  position: relative;
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

`;

const Logout = styled.div`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
`;

const Header: React.FC<HeaderProps> = ({ primary, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (primary) {
      navigate('/dashboard'); 
    } else {
      navigate('/'); 
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Logo onClick={handleLogoClick}>PAWGRESS</Logo>
      {primary && <Logout onClick={handleLogout}>Log out</Logout>}
    </HeaderWrapper>
  );
};
export default Header;



