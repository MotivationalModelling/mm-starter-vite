
// import * as yup from 'yup';

// ---------------------------------------------------------------------------

export type Role = 'superuser' | 'maintainer' | 'user' | 'undefined'

export interface CurrentUser {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    role: string;
    notes: string;
    isAdmin: boolean;
    isActive: boolean;
    lastLogin: Date | null;
    whenCreated: Date | null;
    whenModified: Date | null;
}

// ---------------------------------------------------------------------------

export const textFields: (keyof CurrentUser)[] = [
    'id',
    'username',
    'password',
    'email',
    'name',
    'role',
    'notes'
];

export const boolFields: (keyof CurrentUser)[] = [
    'isAdmin',
    'isActive'
];

// ---------------------------------------------------------------------------
