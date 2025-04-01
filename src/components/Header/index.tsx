import React from "react";
import { HeaderContainer, Logo, Nav, NavItem, Content } from "./styles";
import logo from "../../assets/logo-bevi.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Content>
        <Link to="/">
          <Logo src={logo} alt="Empresa Logo" />
        </Link>
        <Nav>
          <NavItem to="/">Cadastro</NavItem>
          <NavItem to="/produtos">Produtos</NavItem>
        </Nav>
      </Content>
    </HeaderContainer>
  );
};

export default Header;
