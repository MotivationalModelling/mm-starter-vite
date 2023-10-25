import {useState} from 'react';

import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';

// ---------------------------------------------------------------------------
// A search bar component that can be used to search users/projects/goal models by names.
// ---------------------------------------------------------------------------

const SearchBar = () => {

    // react useState hook to keep track of the search term and the category to search
    const [term, setTerm] = useState('');
    const [activeItem, setActiveItem] = useState('Search Category');

    // used to get directed to a corresponding search result route
    const navigate = useNavigate();

    // form submission handling switching among search category options
    const handleSubmit = (event:any) => {

        //prevent the default behaviour of pressing the 'Enter/return' key
        event.preventDefault();

        // if a keyword is filled in to the search bar
        if (term) {
            switch(activeItem) {
                case 'User': {
                    navigate(`/search-results/user/${term}`);
                    break;
                }
                case 'Project': {
                    navigate(`/search-results/project/${term}`);
                    break;
                }
                case 'Model':{
                    navigate(`/search-results/model/${term}`);
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
            // temporarily do nothing, but it can be extended
        }
    };

    return (
        <Nav className='me-auto justify-content-end' style={{ width: "100%", height: '40px' }}>

            <Nav.Item className='pb-2'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Nav.Item>

            {/* Dropdown options available to search: Project, User, Model*/}
            <Form  className='d-flex pb-2' onSubmit={handleSubmit} >
                <DropdownButton id='dropdown-basic-button' title={activeItem}>
                    <Dropdown.Item
                        active={activeItem==='Project'}
                        onClick={()=>setActiveItem('Project')}>
                            Project
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={activeItem==='User' }
                        onClick={()=>setActiveItem('User')}>
                            User
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={activeItem==='Model'}
                        onClick={()=>setActiveItem('Model')}>
                            Model
                    </Dropdown.Item>
                </DropdownButton>

                <Nav.Item className='pb-2'>
                    &nbsp;&nbsp;
                </Nav.Item>

                {/* Search Form */}
                <FormControl
                    type='text'
                    placeholder='Search'
                    className='mt-sm'
                    value={term}
                    onChange={(e)=>setTerm(e.target.value)}
                    style={{ width: '300px', height: '38px' }}
                />

                <Nav.Item className='pb-2'>
                    &nbsp;&nbsp;
                </Nav.Item>

                {/* Search Icon */}
                <Nav.Item className='pb-2'>
                    <Button onClick={handleSubmit} variant='outline-success'>Search</Button>
                </Nav.Item>

                <Nav.Item className='pb-2'>
                    &nbsp;&nbsp;
                </Nav.Item>

            </Form>
        </Nav>
    );
};

// ---------------------------------------------------------------------------

export default SearchBar;
