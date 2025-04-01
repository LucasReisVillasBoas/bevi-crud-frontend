import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../constants/colors";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  background-color: "#FFFFFF";
  color: ${colors.text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

export const Logo = styled.img`
  height: 50px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  color: ${colors.text};
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.hover};
  }
`;
