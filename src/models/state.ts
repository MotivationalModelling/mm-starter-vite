
// ---------------------------------------------------------------------------

export interface State {
  id: number;
  name: string;
  stateCode: string;
  countryCode: string;
}


// ---------------------------------------------------------------------------

export const newState: State  = {
    id: 0,
    name: 'new',
    stateCode: 'STA',
    countryCode: 'AU'
};

// ---------------------------------------------------------------------------

export const textFields: (keyof State)[]  = [
    'id',
    'name',
    'stateCode',
    'countryCode'
  ];

  