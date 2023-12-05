import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const logouthandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        fixed="top"
        className="bg-body-primary"
        data-bs-theme="dark"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>My Movies List</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    {userInfo ? (
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>My Profile</NavDropdown.Item>
                      </LinkContainer>
                    ) : null}
                    <NavDropdown.Divider />
                    <LinkContainer to="/profileSettings">
                      <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logouthandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Find Movie"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <LinkContainer to={`/findMovie/${search}`}>
              <Button variant="outline-success">Search</Button>
            </LinkContainer>
          </Form>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
