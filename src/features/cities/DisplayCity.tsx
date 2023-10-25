
import {useParams, Link} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {City, textFields} from '../../models/city';
import {useGetCityQuery} from '../../services/geo';

// ---------------------------------------------------------------------------

interface CityDisplayProps {
    city: City
}

// ---------------------------------------------------------------------------

const CityDisplay = ({city}: CityDisplayProps) => {

    return (
        <Card>
            <Card.Header>
                View city &mdash; {city.id}
            </Card.Header>

            <Card.Body>
                <Container>
                    {textFields.map((key, index) => (
                        <Row>
                            <Col md={4} className='text-end' style={{textAlign: 'right'}}>
                                {key}
                            </Col>
                            <Col md={8} className='text-start' style={{textAlign: 'left'}}>
                                {city[key]}
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

export const DisplayCity = () => {

    const {id} = useParams<{id?: string}>();

    const {data: city, error, isLoading} = useGetCityQuery(id ?? '', {skip: !id});

    if (error) {
        return <span className='text-danger'>There was an error</span>
    } else if (isLoading) {
        return <span className='text-muted'>Loading ...</span>
    } else if (city) {
        return (
            <Container>
                <Row className='justify-content-md-center mt-3'>
                <Col md={8}>
                    <CityDisplay city={city}/>
                </Col>
                </Row>
                <Row className="justify-content-md-center mt-3 text-end">
                <Col md={8}>
                    <Link to={'/cities'} className='btn btn-warning right'>Cancel/Back</Link>
                </Col>
                </Row>
            </Container>
        );
    }

    return <span>(Don't know how we got here!)</span>
};

// ---------------------------------------------------------------------------

export default DisplayCity;

