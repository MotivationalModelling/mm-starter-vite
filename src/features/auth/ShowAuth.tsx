// import React, {useState} from 'react';
// import {useDispatch} from 'react-redux';

import {useGetAuthQuery} from '../../services/mme';
// import { useDoAuthenticateMutation } from '../services/auth';

const ShowAuth = () => {

  // const dispatch = useDispatch();

  // const [doAuthenticate ] = useDoAuthenticateMutation();
  const {data, error, isLoading} = useGetAuthQuery();

  // dispatch(doAuthenticate());

  return (
    <div style={{padding: '10px'}}>
      <div>
      {error ? (
        <>Oh no, there was an error - </>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>AuthResponse</h3>
            {JSON.stringify(data)}
        </>
      ) : null}
      </div>
    </div>
  );

}

export default ShowAuth;
