
import {useState} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// ---------------------------------------------------------------------------

const ModalExample = () => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='container' style={{padding: '20px'}}>
                <Button variant='primary' onClick={handleShow}>
                    Launch demo modal
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// ---------------------------------------------------------------------------

export default ModalExample;

