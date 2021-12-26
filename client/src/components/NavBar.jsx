import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>News App</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/news">
            <Nav.Link>Only Active News</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/archived">
            <Nav.Link>Archived News</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
