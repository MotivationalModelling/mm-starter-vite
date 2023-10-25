
// ---------------------------------------------------------------------------

export interface City {
  id: number;
  name: string;
  cityCode: string;
  stateCode: string;
  countryCode: string;
}

// ---------------------------------------------------------------------------

export const textFields: (keyof City)[]  = [
  'id',
  'name',
  'cityCode',
  'stateCode',
  'countryCode'
];

// ---------------------------------------------------------------------------

export const newCity: City  = {
    id: 0,
    name: 'new',
    cityCode: 'NEW',
    stateCode: 'STA',
    countryCode: 'AU'
};

// ---------------------------------------------------------------------------
