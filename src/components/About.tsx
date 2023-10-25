
import {LoremIpsum} from 'react-lorem-ipsum';

// ---------------------------------------------------------------------------

const About = () => {
  return (
    <div className='container text-start ' style={{width: '80%'}}>
        <h1 className='text-info p-2'>Help for MME Admin</h1>
        <div className='text-wrapper'>
            <LoremIpsum p={5} />
        </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

export default About;

