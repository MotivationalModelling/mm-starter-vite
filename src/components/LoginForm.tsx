
import {useForm, SubmitHandler} from 'react-hook-form';

// import {DevTool} from '@hookform/devtools';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup'

import * as yup from 'yup';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {sha256} from 'js-sha256';

// import {useLoginMutation} from '../services/mme';

import Header from './Header';

// ---------------------------------------------------------------------------

interface Credentials {
  username: string;
  password: string;
}

// ---------------------------------------------------------------------------

export const userLoginSchema = yup.object().shape({
  username: yup.string()
      .required()
      .max(20)
      .matches(
          /^[A-Za-z0-9_-]+$/,
          'Username may be [A-Za-z0-9_-]+')
      .label('Username'),
  password: yup.string().required().min(6).label('Password'),
});

// ---------------------------------------------------------------------------

let renderCount = 0;

// ---------------------------------------------------------------------------

const LoginForm = () => {

    renderCount++;

    // const [login] = useLoginMutation();

    const initialValues: Credentials = {
        username: '',
        password: ''
    };

    // -----------------------------------------------------------------------

    const {register, handleSubmit, getValues, formState: {errors}} = useForm<Credentials>({
      defaultValues: initialValues,
      resolver: yupResolver(userLoginSchema)
    });

    // -----------------------------------------------------------------------

    const onSubmit: SubmitHandler<Credentials> = async (data) => {

          // alert('You are submitting!  |' + JSON.stringify(data) + '|');

        console.log('Submitted |' + JSON.stringify(data) + '|');

        const {username, password} = data;

        console.log('[onSubmit]');
        console.log(`[onSubmit]                    data |${JSON.stringify(data)}|`);
        console.log(`[onSubmit]                username |${username}|`);
        console.log(`[onSubmit]                password |${password}|`);

        const hashedPassword = sha256(password);

        console.log(`[onSubmit]          hashedPassword |${hashedPassword}|`);

        const authPayload = {
            username: username,
            password: hashedPassword
        }

        console.log(`${JSON.stringify(authPayload)}`)
        // const resp = await login(authPayload).unwrap();

        // console.log(JSON.stringify(resp));

        // console.log('[onSubmit]               after setCurrentUser!');
        // console.log(`[LoginForm::onSubmit]                      userId |${resp.user.id}|`);

    };

    // -----------------------------------------------------------------------

    console.log('[LoginForm]  - Three');

    return (
        <>
            <Container>

                <Header renderCount={renderCount}
                        description='Application implemented using Typescript and react-hook-form for performant, flexible and extensible forms with easy-to-use validation'/>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title style={{color: 'blue'}}>Sign In</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group as={Row} md={12} controlId='username' className="p-2">
                                <Form.Label column md={2}>
                                    Username
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control {...register('username')}
                                                placeholder='Username'
                                                isInvalid={!!errors.username}/>
                                    <ErrorMessage as={<Form.Control.Feedback />} errors={errors} name='username' type='invalid'/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} md={12} controlId='password' className="p-2">
                            <Form.Label column md={2}>
                                Password
                            </Form.Label>
                            <Col md={10}>
                                <Form.Control {...register('password')}
                                            placeholder='Password'
                                            type='password'
                                            isInvalid={!!errors.password}/>
                                <ErrorMessage as={<Form.Control.Feedback />} errors={errors}
                                            name='password' type='invalid'/>
                            </Col>
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <hr />
                            <Button variant='primary' type='submit' className="p-2">
                                Submit
                            </Button>

                        </Modal.Footer>
                    </Modal.Dialog>
                </Form>
            </Container>

            <Card className='mx-3 mt-3 p-3'>
                <Card.Title>Credentials</Card.Title>
                <Card.Body>
                    <span className='text-muted'><small>Password: {getValues('password')} - Hashed: {sha256(getValues('password'))}</small></span>
                </Card.Body>
            </Card>
        </>
    );
};

// ---------------------------------------------------------------------------

export default LoginForm;

// ---------------------------------------------------------------------------
