import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {Form, Button, Col, Row} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import * as yup from 'yup';

import {useForm, SubmitHandler} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';

import {useGetCityQuery, useUpdateCityMutation} from '../../services/geo';
import {City, newCity} from '../../models/city';
import {addToast, newToastError, newToastSuccess} from "../toasts/toastsSlice";

// ---------------------------------------------------------------------------

export const CitySchema = yup.object().shape({
    code: yup.string().required().max(8).label('Code'),
    iso3: yup.string().max(8).label('ISO3')
});

// ---------------------------------------------------------------------------

const EditCity = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateCity] = useUpdateCityMutation();

    const [modal, setModal] = useState<JSX.Element | null>(null);
    const [action, setAction] = useState('none');

    const {id} = useParams<{id?: string}>();

    const {data: City, error, isLoading} = useGetCityQuery(id ?? '', {skip: !id});

    // -----------------------------------------------------------------------

    const {register, control, handleSubmit, reset, formState: {errors}} = useForm<City>({
        defaultValues:  City !== null ? City : newCity,
        resolver: yupResolver(CitySchema)
    });

    // -----------------------------------------------------------------------

    useEffect(() => {
        if (City) {
        reset(City);
        }
    }, [reset, City]);

    // -----------------------------------------------------------------------

    const onSubmit: SubmitHandler<City> = async (formData) => {

        console.log('Submitted |' + JSON.stringify(formData) + '|');

        console.log('[onSubmit]');
        console.log('[onSubmit]                                   data |' + JSON.stringify(formData) + '|');

        alert(`EditCity.onSubmit: ${JSON.stringify(formData)}`);

        const resp = await updateCity(formData)
                                .unwrap()
                                .then(() => {
                                    dispatch(addToast(newToastSuccess({
                                        heading: "City updated",
                                        body: `City “${formData.id}” updated successfully`
                                    })));
                                    navigate('/goalmodels');
                                })
                                .catch((error) => {
                                    dispatch(addToast(newToastError({
                                        heading: "City update failed",
                                        body: `City “${formData.id}” update failed: ${error.data.message}`
                                    })));
                                });

        // if (action === 'update') {
        //     const resp = await updateCity(formData).unwrap();
        //     console.log('[EditCity::onSubmit]              update ->  resp |' + JSON.stringify(resp) + '|');

        // } else if (action === 'delete') {
        
        //     console.log('[EditCity::onSubmit]               Before delete...');

        //     const resp = await deleteCity(formData).unwrap();
        //     console.log('[EditCity::onSubmit]               delete->  resp |' + JSON.stringify(resp) + '|');

        // }

        console.log('[EditCity::onSubmit]  After updateCity!() call...');

        navigate('/cities');
    };

    // -----------------------------------------------------------------------


    if (City) {
        return (
            <>
                <Container>
                    <h1>Edit City</h1>

                    <hr />

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group as={Row} controlId='code'>
                            <Form.Label className='text-end' column sm={2}>Id</Form.Label>
                            <Col sm={2} className='pb-2'>
                                <Form.Text muted>{City.id}</Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='name'>
                            <Form.Label className='text-end' column sm={2}>name</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('name')}
                                    type='text'
                                    placeholder='name'
                                />
                                <ErrorMessage as={<Form.Control.Feedback />} errors={errors} name='name' type='invalid'/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='city-code'>
                            <Form.Label className='text-end' column sm={2}>City Code</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('cityCode')}
                                    type='text'
                                    placeholder='666'
                                />
                                <ErrorMessage as={<Form.Control.Feedback />} errors={errors} name='cityCode' type='invalid'/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='state-code'>
                            <Form.Label className='text-end' column sm={2}>State Code</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('stateCode')}
                                    type='text'
                                    placeholder='VIC'
                                />
                                <ErrorMessage as={<Form.Control.Feedback />} errors={errors} name='stateCode' type='invalid'/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} controlId='country-code'>
                            <Form.Label className='text-end' column sm={2}>countryCode</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('countryCode')}
                                    type='text'
                                    placeholder='AU'
                                />
                            </Col>
                        </Form.Group>

                        <hr />

                        <Row>
                            <Col md={12} className='text-end pb-2'>
                                <Button variant='secondary' type='submit' onClick={() => navigate('/cities')}>
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

export default EditCity;
