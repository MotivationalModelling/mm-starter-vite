import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Form from 'react-bootstrap/Form';

import {selectCurrentUser} from '../currentUser/currentUserSlice';
import { CurrentUser, textFields } from '../../models/currentUser';

// ---------------------------------------------------------------------------

interface UserDisplayProps {
    currentUser: CurrentUser
}

// ---------------------------------------------------------------------------

const CurrentUserDisplay = ({currentUser}: UserDisplayProps) => {

    const navigate = useNavigate();

    return (
        <Container>
            <Card>
                <Card.Header>
                    Display Current User &mdash; {currentUser.username}
                </Card.Header>

                <Card.Body>
                    <Container>
                        {textFields.map((key, _) => (
                            <Row>
                                <Col md={4} className='text-end'>
                                    {key}
                                </Col>
                                <Col md={8} className='text-start'>
                                    {currentUser[key]?.toString()}
                                </Col>
                            </Row>
                        ))}

                    </Container>
                </Card.Body>
            </Card>
            <Row>
                <Col md={12} className='justify-content-md-center mt-3 text-end'>
                    <Button variant='secondary' type='submit' onClick={() => navigate('/users')}>
                        Cancel/Back
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

// ---------------------------------------------------------------------------

export const DisplayCurrentUser = () => {

    const {currentUser} = useSelector(selectCurrentUser);

    console.log('>>>>>    user |' + JSON.stringify(currentUser) + '|');

    if (currentUser) {
        return (
            <Container>
                <Row className='justify-content-md-center mt-3'>
                    <Col>
                        <CurrentUserDisplay currentUser={currentUser}/>
                    </Col>
                </Row>
            </Container>
        );
    }
    return <span>(Don't know how we got here!)</span>
};

// ---------------------------------------------------------------------------

export default DisplayCurrentUser;

// ---------------------------------------------------------------------------
