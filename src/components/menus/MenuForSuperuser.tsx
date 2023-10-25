
import { LinkContainer } from 'react-router-bootstrap'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faUser, faCog, faYinYang} from '@fortawesome/free-solid-svg-icons';

import SearchBar from '../../features/search/SearchBar';

import logo from '../../assets/logo.svg';

import '../TopNavBar.css';

// ---------------------------------------------------------------------------

const MenuForSuperuser = () => {

    return (
        <>
            <Navbar bg='dark' variant='dark' expand='lg' style={{ width: '100%' }}>
                <Navbar.Brand href='/home'>
                    <img alt='' src={logo} style={{ width: 100, marginTop: -7 }} />
                    &#9776; Starter UI
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>

                        <LinkContainer to="/home">
                            <Nav.Link eventKey={1000}>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/demo">
                            <Nav.Link eventKey={4000}>Demo</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title='Help' id='basic-nav-dropdown'>
                            <LinkContainer to='/help'>
                                <NavDropdown.Item eventKey={8010}>Help</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to='/release-notes'>
                                <NavDropdown.Item eventKey={8020}>Release Notes</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to='/about'>
                                <NavDropdown.Item eventKey={8030}>About</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                    </Nav>

                    <SearchBar />

                    <Nav className="me-auto justify-content-end" style={{height: '40px'}}>

                        <NavDropdown title='User' id='basic-nav-dropdown' className='dropdown-menu-right text-end'>
                            <LinkContainer to='/current-user/display'>
                                <NavDropdown.Item className='mb-auto' eventKey={9.3}><FontAwesomeIcon icon={faUser as IconProp} />{' '}Profile</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Divider />

                            <LinkContainer to='/roles/select-current'>
                                <NavDropdown.Item className='mb-auto' eventKey={9.1} ><FontAwesomeIcon icon={faYinYang as IconProp} />{' '}Set Role</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/configuration'>
                                <NavDropdown.Item className='mb-auto' eventKey={9.4}><FontAwesomeIcon icon={faCog as IconProp} />{' '}Configuration</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                        <Nav.Item className='pb-2'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Nav.Item>

                        <Nav.Item className='pb-2'>
                            <a href="/" className="btn btn-danger">Logout</a>
                        </Nav.Item>

                        <Nav.Item className='pb-2'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Nav.Item>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </>
    );

}

// ---------------------------------------------------------------------------

export default MenuForSuperuser;
