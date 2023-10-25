import DataTable from 'react-data-table-component';

import {useGetIsoCountriesQuery} from '../../services/geo';

import {isoCountryColumns} from './Constants';

const ListIsoCountries = () => {

    const { data: isoCountries, error, isLoading } = useGetIsoCountriesQuery();

    return (
        <div style={{padding: '10px'}}>
        <div>
        {error ? (
            <>Oh no, there was an error - </>
        ) : isLoading ? (
            <>Loading...</>
        ) : isoCountries ? (
            <>
            <div className='ui container text-start p-2'>
                <DataTable title='ISO Countries'
                columns={isoCountryColumns}
                data={isoCountries}
                striped={true}
                pagination={true} />
            </div>
            </>
        ) : null}
        </div>
        </div>
    );

}

export default ListIsoCountries;

