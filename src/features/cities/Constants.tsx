import {Link} from 'react-router-dom';

import {City} from "../../models/city";

// ---------------------------------------------------------------------------

export const cityColumns = [
    {
        name: 'Id',
        selector: (row: City) => row.id,
        sortable: true,
        width: '80px',
        cell: (row: City) => (
            <div>
                <Link to={`/cities/${row.id}`} style={{fontWeight: 'bold'}}>{row.id}</Link>
            </div>
        )
    },
    {
        name: 'Name',
        selector: (row: City) => row.name,
        sortable: true,
        width: '250px',
        cell: (row: City) => (
            <div>
                <Link to={`/cities/${row.id}`} style={{fontWeight: 'bold'}}>{row.name}</Link>
            </div>
        )
    },
    {
        name: 'City Code',
        selector: (row: City) => row.cityCode,
        sortable: true,
        width: '120px',
        cell: (row: City) => (
            <div>
                <Link to={`/cities/${row.id}`} style={{fontWeight: 'bold'}}>{row.cityCode}</Link>
            </div>
        )
    },
    {
        name: 'State Code',
        selector: (row: City) => row.stateCode,
        sortable: true,
        width: '120px'
        // cell: (row: City) => (
        //     <div>
        //         <Link to={`/states/with-code/${row.stateCode}`} style={{fontWeight: 'bold'}}>{row.stateCode}</Link>
        //     </div>
        // )
    },
    {
        selector: (row: City) => row.countryCode,
        sortable: true,
        width: '120px',
        cell: (row: City) => (
            <div>
                <Link to={`/isocountries/${row.countryCode}`} style={{fontWeight: 'bold'}}>{row.countryCode}</Link>
            </div>
        )
    }
];

// ---------------------------------------------------------------------------
