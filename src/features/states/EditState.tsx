import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Form, Button, Col, Row} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import * as yup from 'yup';

import {useForm, SubmitHandler} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';

import {useGetStateQuery} from '../../services/geo';

import {State, newState} from '../../models/state';

// ---------------------------------------------------------------------------

export const StateSchema = yup.object().shape({
    code: yup.string().required().max(8).label('Code'),
    iso3: yup.string().max(8).label('ISO3')
});

// ---------------------------------------------------------------------------

const EditState = () => {

    const navigate = useNavigate();

    const [modal, setModal] = useState<JSX.Element | null>(null);
    const [action, setAction] = useState('none');

    const {id} = useParams<{id?: string}>();

    const {data: State, error, isLoading} = useGetStateQuery(id ?? '', {skip: !id});

    // -----------------------------------------------------------------------

    const {register, control, handleSubmit, reset, formState: {errors}} = useForm<State>({
        defaultValues:  State !== null ? State : newState,
        resolver: yupResolver(StateSchema)
    });

    // -----------------------------------------------------------------------

    useEffect(() => {
        if (State) {
        reset(State);
        }
    }, [reset, State]);

    // -----------------------------------------------------------------------

    const onSubmit: SubmitHandler<State> = async (formData) => {

        console.log('Submitted |' + JSON.stringify(formData) + '|');

        console.log('[onSubmit]');
        console.log('[onSubmit]                                   data |' + JSON.stringify(formData) + '|');

        alert(`EditState.onSubmit: ${JSON.stringify(formData)}`);

        // if (action === 'update') {
        //     const resp = await updateState(formData).unwrap();
        //     console.log('[EditState::onSubmit]              update ->  resp |' + JSON.stringify(resp) + '|');

        // } else if (action === 'delete') {
        
        //     console.log('[EditState::onSubmit]               Before delete...');

        //     const resp = await deleteState(formData).unwrap();
        //     console.log('[EditState::onSubmit]               delete->  resp |' + JSON.stringify(resp) + '|');

        // }

        console.log('[EditState::onSubmit]  After updateState!() call...');

        navigate('/states');
    };

    // -----------------------------------------------------------------------


    if (State) {
        return (
            <>
                <Container>
                    <h1>Edit State</h1>

                    <hr />

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group as={Row} controlId='code'>
                            <Form.Label className='text-end' column sm={2}>Id</Form.Label>
                            <Col sm={2} className='text-start pb-2'>
                                <Form.Text muted>{State.id}</Form.Text>
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

                        <Form.Group as={Row} controlId='state-code'>
                            <Form.Label className='text-end' column sm={2}>State Code</Form.Label>
                            <Col sm={10} className='pb-2'>
                                <Form.Control {...register('stateCode')}
                                    type='text'
                                    placeholder='666'
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
                                <Button variant='secondary' type='submit' onClick={() => navigate('/states')}>
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

export default EditState;
