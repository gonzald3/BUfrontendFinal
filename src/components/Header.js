import {React, useContext }from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Context from '../context';

const Header = () => {


    const { user, setUser } = useContext(Context);
    const history = useNavigate();

    const logout = async () => {
        const isLogout = window.confirm('Do you want to log out ?');
        if (isLogout) {
          localStorage.removeItem('auth');
          setUser(null);
          history('/login');
        }
      };





    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header