import * as React from 'react'

import {useGetIsoCountryQuery} from '../../services/geo';

export interface IsoCountryProps {
  key: number;
  CountryCode: string;
  pollingInterval: number;
}

const IsoCountryDisplay = (props: IsoCountryProps) => {

  const CountryCode = props.CountryCode;

  const { data, error, isLoading } = useGetIsoCountryQuery(CountryCode);

  return (
    <div>
      {error ? (
        <>Oh no, there was an error - </>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.name}</h3>

          <table className="centered-table">
            <tr>
              <td style={{textAlign: "left"}}>Code</td><td>{data.code}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>ISO3</td><td>{data.iso3}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>NUM3</td><td>{data.num3}</td>
            </tr>
          </table>
        </>
      ) : null}
    </div>
  );
}

export default IsoCountryDisplay;
