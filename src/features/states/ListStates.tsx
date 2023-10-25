// import React, {useState} from 'react';
import DataTable from 'react-data-table-component';

import {useGetStatesQuery} from '../../services/geo';
// import {State} from '../../services/geoTypes';

// import {customStyles} from '../../components/Constants';
import {stateColumns} from './Constants';

// ---------------------------------------------------------------------------

const ListStates = () => {

  const { data: states, error, isLoading } = useGetStatesQuery();

  return (
    <div style={{padding: '10px'}}>
      <div>
      {error ? (
        <>Oh no, there was an error - </>
      ) : isLoading ? (
        <>Loading...</>
      ) : states ? (
        <>
          <div className='ui container text-start p-2'>
            <DataTable title='States'
              columns={stateColumns}
              data={states}
              striped={true}
              pagination={true} />
          </div>
        </>
      ) : null}
      </div>
    </div>
  );

}

// ---------------------------------------------------------------------------

export default ListStates;
