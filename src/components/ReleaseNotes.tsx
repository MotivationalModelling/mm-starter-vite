
// ---------------------------------------------------------------------------

const ReleaseNotes = () => {

    const h3 = 'text-info';
    const h4 = 'text-success';

    return (
        <div className='container text-start p-2' style={{width: '80%', textAlign: 'left'}}>

            <h3 className={h3}>2023-10-01</h3>

            <h4 className={h4}>Version 1.0.0</h4>
            <ul>
                <li>Typescript re-implementation of React Bootstrap Starter.</li>
            </ul>

        </div>
    );

}

// ---------------------------------------------------------------------------

export default ReleaseNotes;
