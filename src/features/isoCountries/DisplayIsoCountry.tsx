
import {Link, useParams} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {IsoCountry, textFields} from '../../models/isoCountry';
import {useGetIsoCountryQuery} from '../../services/geo';

// ---------------------------------------------------------------------------

interface IsoCountryDisplayProps {
    isoCountry: IsoCountry
}

// ---------------------------------------------------------------------------

const IsoCountryDisplay = ({isoCountry}: IsoCountryDisplayProps) => {

    return (
        <Card>
            <Card.Header>
                View isoCountry &mdash; {isoCountry.code}
            </Card.Header>

            <Card.Body>
                <Container>
                    {textFields.map((key, index) => (
                        <Row>
                            <Col md={4} className='text-end' style={{textAlign: 'right'}}>
                                {key}
                            </Col>
                            <Col md={8} className='text-start' style={{textAlign: 'left'}}>
                                {isoCountry[key]}
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
  code: string;
}

// ---------------------------------------------------------------------------

export const DisplayIsoCountry = () => {

    const {code} = useParams<{code?: string}>();

    console.log(`>>>>>    code |${code}|`);

    const {data: isoCountry, error, isLoading} = useGetIsoCountryQuery(code ?? 'AU', {skip: !code});

    console.log(`>>>>>    isoCountry |${JSON.stringify(isoCountry)}|`);

    if (error) {
        return <span className='text-danger'>There was an error</span>
    } else if (isLoading) {
        return <span className='text-muted'>Loading ...</span>
    } else if (isoCountry) {
        return (
        <Container>
            <Row className='justify-content-md-center mt-3'>
            <Col md={8}>
                <IsoCountryDisplay isoCountry={isoCountry}/>
            </Col>
            </Row>
            <Row className="justify-content-md-center mt-3 text-end">
            <Col md={8}>
                <Link to={'/isoCountries'} className='btn btn-warning right'>Cancel/Back</Link>
            </Col>
            </Row>
        </Container>
        );
    }
    
    return <span>(Don't know how we got here!)</span>
};

// ---------------------------------------------------------------------------

export default DisplayIsoCountry;
