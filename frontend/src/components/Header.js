import { Badge, Nav, Navbar, Container, NavLink } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from'react-router-bootstrap';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import logo from '../assets/logo.png';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='ProShop'/>
                        ProShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to="/cart">
                        <NavLink>
                            <FaShoppingCart/>
                            { cartItems.length > 0 && (
                                <Badge pill bg='success' style={{ marginLeft: '5px'}}>
                                    {cartItems.reduce((a,c) => a + c.qty, 0)}
                                </Badge>)
                            }
                            Cart
                        </NavLink>
                        </LinkContainer>
                        <LinkContainer to="/login">
                        <NavLink><FaUser/>Sign In</NavLink>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header