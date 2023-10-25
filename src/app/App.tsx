
// import { useState } from 'react'

// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'

import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

// import {useSelector} from 'react-redux';

import TopNavBar                    from '../components/TopNavBar';
import {HeaderFooterLayout}         from '../components/HeaderFooterLayout';
import NotImplementedYet            from '../components/NotImplementedYet';

import LoginForm                    from '../components/LoginForm';

import Home                         from '../components/Home';
import Demo                         from '../components/Demo';
import ReleaseNotes                 from '../components/ReleaseNotes';
import About                        from '../components/About';
import Help                         from '../components/Help';

import {baseUrl}                    from '../localizations';

import {version}                    from  '../version';


// ---------------------------------------------------------------------------

interface AppProps {
    appVersion: string;
    dbVersion: string;
}

// ---------------------------------------------------------------------------

const AppUi = (props: AppProps) => (
    <div className='app'>
        {/*<ToastDisplay/>*/}
        <Router>
            <HeaderFooterLayout>
                <HeaderFooterLayout.Header>
                    <TopNavBar />
                </HeaderFooterLayout.Header>

                <HeaderFooterLayout.Body>
                    <div className='mb-3'>
                        <Routes>
                            <Route path='/'                             element={<Home />} />
                            <Route path='/home'                         element={<Home />} />
                            <Route path='/demo'                         element={<Demo />} />

                            <Route path='/login'                        element={<LoginForm />} />
                            <Route path='/logout'                       element={<NotImplementedYet />} />

                            <Route path='/about'                        element={<About />} />
                            <Route path='/release-notes'                element={<ReleaseNotes />} />
                            <Route path='/help'                         element={<Help />} />

                        </Routes>
                    </div>
                </HeaderFooterLayout.Body >

                <HeaderFooterLayout.Footer>
                    <Container className='green p-3'>
                        <small className='text-info'>
                            <p>Copyright © 2018-2023 PerformIQ Pty Ltd - ABN 26 003 835 658<br/>
                            <em>All rights reserved</em><br/>
                            </p>
                        </small>
                        <small className='text-info'>
                            DB Version {props.dbVersion} - App Version {props.appVersion}
                        </small>
                    </Container>
                </HeaderFooterLayout.Footer>

            </HeaderFooterLayout>
        </Router>
    </div>
)

// ---------------------------------------------------------------------------

const App = () => {

    console.log(`${baseUrl}`);

    // const auth = useSelector(selectAuth);
    // const auth = {tok: 'xxxxx'};

    // console.log('>>>>> App - auth |' + JSON.stringify(auth) + '|');

    // if (auth.tok) {
    //     // const {tok} = auth;
    //     // console.log('>>>>> App -  tok |' + tok + '|');
    //     return <AppUi appVersion={version} dbVersion='1.2' />;
    // } else {
    //     return <LoginForm />;
    // }

    return (
        <Container fluid className='text-center p-0' style={{width: "100%"}}>
            <AppUi appVersion={version} dbVersion='1.2' />
        </Container>
    )

}

// ---------------------------------------------------------------------------
// Note:  No AUTH yet...
// ---------------------------------------------------------------------------

export default App
