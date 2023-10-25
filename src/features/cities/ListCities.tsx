
import {useState} from 'react';
import DataTable from 'react-data-table-component';

import {City} from "../../models/city";

import {
  useGetCitiesQuery,
  useCreateCityMutation,
  useDeleteCityMutation} from '../../services/geo';

import {cityColumns} from './Constants';

// ---------------------------------------------------------------------------

const ListCities = () => {

  const {data: cities, error, isLoading} = useGetCitiesQuery();

  const [createCity] = useCreateCityMutation(); // createCityResult
  const [deleteCity] = useDeleteCityMutation(); // deleteCityResult
  
  const [cityId, setCityId] = useState(0);
  const [cityName, setCityName] = useState('');


  return (
    <div style={{padding: '10px'}}>
      <div>
      {error ? (
        <>Oh no, there was an error - </>
      ) : isLoading ? (
        <>Loading...</>
      ) : cities ? (
        <>
          <div className='ui container text-start p-2'>
            <DataTable title='Cities'
              columns={cityColumns}
              data={cities}
              striped={true}
              pagination={true} />
          </div>
        </>
      ) : null}
      </div>

      <div>
        <span>
        <button onClick={() => {
                console.log('Add city!');
                const cityCode = cityName.substring(0,3).toUpperCase();
                createCity({
                  name: cityName,
                  cityCode: cityCode,
                  stateCode: 'VIC',
                  countryCode: 'AU'
                });
              }
            }>
              Create City
            </button>
            &nbsp;
        </span>
        &nbsp;
        <input type='text' onChange={(change) => setCityName(change.target.value)} width="2"/>
        &nbsp;
        {cityName}
      </div>

      <div>
        <span>
            <button onClick={() => {
                console.log(`Delete city! - ${cityId}`);
                deleteCity(`${cityId}`);
              }
            }>
              Delete City
            </button>
        </span>
        &nbsp;
        <input type='text' onChange={(change) => setCityId(Number(change.target.value))} width="2"/>
        &nbsp;
        {cityId}
      </div>

    </div>
  );

}

// ---------------------------------------------------------------------------

export default ListCities;
