import { theme } from './theme';

export interface user {
    username: string;
    email: string;
    interests: theme[];
    knowledges: theme[];
    name: string;
    surname: string;
    imageUrl: string;
    birthDate: Date;
    password: string;
}

