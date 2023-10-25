import {Link} from 'react-router-dom';

import {IsoCountry} from "../../models/isoCountry";

// ---------------------------------------------------------------------------

export const isoCountryColumns = [
  {
      name: 'Code',
      selector: (row: IsoCountry) => row.code,
      sortable: true,
      width: '100px',
      cell: (row: IsoCountry) => (
        <div>
          <Link to={`/isocountries/${row.code}`} style={{fontWeight: 'bold'}}>{row.code}</Link>
        </div>
      )
  },
  {
      name: 'Name',
      selector: (row: IsoCountry) => row.name,
      sortable: true,
      width: '300px',
      cell: (row: IsoCountry) => (
        <div>
          <Link to={`/isocountries/${row.code}`} style={{fontWeight: 'bold'}}>{row.name}</Link>
        </div>
      )
  },
  {
      name: 'NUM3',
      selector: (row: IsoCountry) => row.num3,
      sortable: true,
      width: '200px',
      cell: (row: IsoCountry) => (
        <div>
          <Link to={`/isocountries/${row.code}`} style={{fontWeight: 'bold'}}>{row.num3}</Link>
        </div>
      )
  },
  {
      name: 'ISO3',
      selector: (row: IsoCountry) => row.iso3,
      sortable: true,
      width: '200px',
      cell: (row: IsoCountry) => (
        <div>
          <Link to={`/isocountries/${row.code}`} style={{fontWeight: 'bold'}}>{row.iso3}</Link>
        </div>
      )
  }
];

// ---------------------------------------------------------------------------
