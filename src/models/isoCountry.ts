
// ---------------------------------------------------------------------------

export interface IsoCountry {
    code: string;
    iso3: string;
    num3: number;
    name: string;
}

// ---------------------------------------------------------------------------

export type IsoCountries = IsoCountry[];

// ---------------------------------------------------------------------------

export const textFields: (keyof IsoCountry)[]  = [
    'code',
    'iso3',
    'num3',
    'name'
];

// ---------------------------------------------------------------------------

export const newIsoCountry: IsoCountry = {
    code: '',
    iso3: '',
    num3: 0,
    name: ''
}

// ---------------------------------------------------------------------------
