import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Form, Button, Col, Row} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import * as yup from 'yup';

import {useForm, SubmitHandler} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';

import {useGetIsoCountryQuery} from '../../services/geo';

import {IsoCountry, newIsoCountry} from '../../models/isoCountry';

// ---------------------------------------------------------------------------

export const isoCountrySchema = yup.object().shape({
    code: yup.string().required().max(8).label('Code'),
    iso3: yup.string().max(8).label('ISO3')
});

// ---------------------------------------------------------------------------

const EditIsoCountry = () => {

    const navigate = useNavigate();

    const [modal, setModal] = useState<JSX.Element | null>(null);
    const [action, setAction] = useState('none');

    const {id} = useParams<{id?: string}>();

    const {data: isoCountry, error, isLoading} = useGetIsoCountryQuery(id ?? '', {skip: !id});

    // -------------------------------------------------------------------------

    const {register, control, handleSubmit, reset, formState: {errors}} = useForm<IsoCountry>({
        defaultValues:  isoCountry !== null ? isoCountry : newIsoCountry,
        resolver: yupResolver(isoCountrySchema)
    });

    // -------------------------------------------------------------------------

    useEffect(() => {
        if (isoCountry) {
        reset(isoCountry);
        }
    }, [reset, isoCountry]);

    // -------------------------------------------------------------------------

    const onSubmit: SubmitHandler<IsoCountry> = async (formData) => {

        console.log('Submitted |' + JSON.stringify(formData) + '|');

        console.log('[onSubmit]');
        console.log('[onSubmit]                                   data |' + JSON.stringify(formData) + '|');

        alert(`EditisoCountry.onSubmit: ${JSON.stringify(formData)}`);

        // if (action === 'update') {
        //     const resp = await updateisoCountry(formData).unwrap();
        //     console.log('[EditisoCountry::onSubmit]              update ->  resp |' + JSON.stringify(resp) + '|');

        // } else if (action === 'delete') {
        
        //     console.log('[EditisoCountry::onSubmit]               Before delete...');

        //     const resp = await deleteisoCountry(formData).unwrap();
        //     console.log('[EditisoCountry::onSubmit]               delete->  resp |' + JSON.stringify(resp) + '|');

        // }

        console.log('[EditIsoCountry::onSubmit]  After updateIsoCountry!() call...');

        navigate('/isocountries');
    };

    // -------------------------------------------------------------------------


    if (isoCountry) {
        return (
            <>
                <Container>
                    <h1>Edit IsoCountry</h1>

                    <hr />

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group as={Row} controlId='code'>
                            <Form.Label className='text-end' column sm={2}>Code</Form.Label>
                            <Col sm={2} className='test-start pb-2'>
                                <Form.Text muted>{isoCountry.code}</Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='iso3'>
                            <Form.Label className='text-end' column sm={2}>ISO3</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('iso3')}
                                    type='text'
                                    placeholder='ISO3'
                                />
                                <ErrorMessage as={<Form.Control.Feedback />} errors={errors} name='iso3' type='invalid'/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='number'>
                            <Form.Label className='text-end' column sm={2}>number</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('num3')}
                                    type='text'
                                    placeholder='666'
                                />
                                <ErrorMessage as={<Form.Control.Feedback />} errors={errors} name='num3' type='invalid'/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='name'>
                            <Form.Label className='text-end' column sm={2}>DirPath</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('name')}
                                    type='text'
                                    placeholder='Name...'
                                />
                            </Col>
                        </Form.Group>

                        <hr />

                        <Row>
                            <Col md={12} className='text-end pb-2'>
                                <Button variant='secondary' type='submit' onClick={() => navigate('/isocountries')}>
                                    Cancel
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant='primary' type='submit' onClick={() => setAction('update')}>
                                    Submit
                                </Button>
                                &nbsp;
                                <Button variant='danger' type='submit' onClick={() => setAction('delete')}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>

                    </Form>

                    {modal}
                </Container>

                <DevTool control={control} placement='bottom-right'/>
            </>
        );
    }

    // -----------------------------------------------------------------------

    return (
        <>Loading...</>
    );


    // -----------------------------------------------------------------------

}

// ---------------------------------------------------------------------------

export default EditIsoCountry;
