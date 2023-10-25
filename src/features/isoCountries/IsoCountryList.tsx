import {useState} from 'react';

import IsoCountryDisplay from './IsoCountryDisplay';

const CountryCodes = ['au', 'us', 'gb', 'nz']

const IsoCountryList = () => {

  const [pollingInterval, setPollingInterval] = useState(0)

  return (
    <div style={{padding: '10px'}}>
      <select
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div>
        {CountryCodes.map((CountryCode, index) => (
          <IsoCountryDisplay key={index} CountryCode={CountryCode} pollingInterval={pollingInterval} />
        ))}
      </div>
    </div>
  );

}

export default IsoCountryList;

