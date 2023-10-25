import {Link} from 'react-router-dom';

import {State} from "../../models/state";

// ---------------------------------------------------------------------------

export const stateColumns = [
    {
        name: 'Id',
        selector: (row: State) => row.id,
        sortable: true,
        width: '80px',
        cell: (row: State) => (
            <div>
                <Link to={`/states/${row.id}`} style={{fontWeight: 'bold'}}>{row.id}</Link>
            </div>
        )
    },
    {
        name: 'Name',
        selector: (row: State) => row.name,
        sortable: true,
        width: '300px',
        cell: (row: State) => (
            <div>
                <Link to={`/states/${row.id}`} style={{fontWeight: 'bold'}}>{row.name}</Link>
            </div>
        )
    },
    {
        name: 'State Code',
        selector: (row: State) => row.stateCode,
        sortable: true,
        width: '200px',
        cell: (row: State) => (
            <div>
                <Link to={`/states/${row.id}`} style={{fontWeight: 'bold'}}>{row.stateCode}</Link>
            </div>
        )
    },
    {
        name: 'Country Code',
        selector: (row: State) => row.countryCode,
        sortable: true,
        width: '200px'
    }
];