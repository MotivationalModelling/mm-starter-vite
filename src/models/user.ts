
import * as yup from 'yup';

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    role: string;
    notes: string;
    isActive: boolean;
    isAdmin: boolean
    lastLogin: Date | null;
    whenCreated: Date | null;
    whenModified: Date | null;
}

export const blankUser: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    name: '',
    role: 'user',
    notes: '',
    lastLogin: null,
    isActive: false,
    isAdmin: false,
    whenCreated: null,
    whenModified: null
}

export const textFields: (keyof User)[] = [
    'id',
    'username',
    'password',
    'email',
    'name',
    'role',
    'notes'
];

export const boolFields: (keyof User)[] = [
    'isActive',
    'isAdmin'
];

// ---------------------------------------------------------------------------

export const userSchema: yup.ObjectSchema<User> = yup.object().shape({
    id: yup.number().required().label('Id'),
    username: yup.string()
        .required()
        .max(20)
        .matches(
            /^[a-zA-Z0-9_-]+$/,
            'Username may be [a-zA-Z0-9_-]+')
        .label('Username'),
    password: yup.string().required().min(6).label('Password'),
    email: yup.string().email().required().max(64).label('Email'),
    name: yup.string().required().max(64).label('Name'),
    role: yup.string().required().label('Role'),
    notes: yup.string().required().label('Motes'),
    isAdmin: yup.boolean().required().label('Is Admin'),
    isActive: yup.boolean().required().label('Is Active'),
    lastLogin: yup.date().required().label('Last Login'),
    whenCreated: yup.date().required().label('When Created'),
    whenModified: yup.date().required().label('When Modified')
});



// eslint-disable-next-line @typescript-eslint/no-unused-vars
`
  Table "public.application_user"
    Column     |            Type             | Collation | Nullable |                   Default                    
---------------+-----------------------------+-----------+----------+----------------------------------------------
 id            | integer                     |           | not null | nextval('application_user_id_seq'::regclass)
 username      | character varying(64)       |           | not null | 
 password      | character varying(64)       |           | not null | 
 email         | character varying(128)      |           | not null | 
 name          | character varying(64)       |           | not null | 
 last_login    | timestamp without time zone |           | not null | 
 is_active     | boolean                     |           | not null | true
 is_admin      | boolean                     |           | not null | false
 role          | character varying(16)       |           | not null | 'user'::character varying
 notes         | text                        |           | not null | ''::text
 when_created  | timestamp without time zone |           | not null | CURRENT_TIMESTAMP
 when_modified | timestamp without time zone |           | not null | CURRENT_TIMESTAMP

 Indexes:
"application_user_pkey" PRIMARY KEY, btree (user_guid)
"application_user_username_key" UNIQUE CONSTRAINT, btree (username)

Note:  DB is initally implemented in Sqlite3

`;