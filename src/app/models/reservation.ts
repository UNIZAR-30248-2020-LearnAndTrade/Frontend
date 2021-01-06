import { theme } from './theme';

export interface reservation {
    id: string;
    startTime: number;
    finishTime: number;
    date: Date;
    theme: theme;
    teacherUsername: string;
    teacherFinished: boolean;
    studentUsername: string;
    studentFinished: boolean;
    rating: number;
}
