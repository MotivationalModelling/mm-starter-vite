
import {Link, useParams} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import {State, textFields} from '../../models/state';
import {useGetStateQuery} from '../../services/geo';

// ---------------------------------------------------------------------------

interface StateDisplayProps {
    state: State
}

// ---------------------------------------------------------------------------

const StateDisplay = ({state}: StateDisplayProps) => {
    return (
        <Card>
            <Card.Header>
                View state &mdash; {state.id}
            </Card.Header>

            <Card.Body>
                <Container>
                    {textFields.map((key, index) => (
                        <Row id={`${index}`}>
                            <Col md={4} className='text-end' style={{textAlign: 'right'}}>
                                {key}
                            </Col>
                            <Col md={8} className='text-start' style={{textAlign: 'left'}}>
                                {state[key]}
                            </Col>
                        </Row>
                    ))}
                </Container>
            </Card.Body>
        </Card>
    );
};

// ---------------------------------------------------------------------------

interface MatchParams {
    id: string;
}

// ---------------------------------------------------------------------------

export const ViewState = () => {

    const {id} = useParams<{id?: string}>();

    console.log(`>>>>>    id |${id}|`);

    const {data: state, error, isLoading} = useGetStateQuery(id ?? '', {skip: !id});

    console.log('>>>>>    state |' + JSON.stringify(state) + '|');

    const usStateSelector = (
        <Form.Group as={Col} controlId='formState'>
            <Form.Label>State</Form.Label>
            <Form.Control as='select' name='state' defaultValue={'CA'} onChange={() => {console.log('xxx')}}>
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='DC'>District Of Columbia</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
            </Form.Control>
        </Form.Group>
    );

    if (error) {
        return <span className='text-danger'>There was an error</span>
    } else if (isLoading) {
        return <span className='text-muted'>Loading ...</span>
    } else if (state) {
        return (
            <Container>
                <Row className='justify-content-md-center mt-3'>
                <Col md={8}>
                    <StateDisplay state={state} />
                </Col>
                </Row>
                <Row className='justify-content-md-center mt-3 text-end'>
                <Col md={8}>
                    <Link to={'/states'} className='btn btn-warning right'>Cancel/Back</Link>
                </Col>
                </Row>
            </Container>
        );
    }

    return <span>(Don't know how we got here!)</span>
};

// ---------------------------------------------------------------------------

export default ViewState;

