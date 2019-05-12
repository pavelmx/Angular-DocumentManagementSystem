import { User } from '../user.model';

export class CreditContract {

    id: number;
    active: boolean;
    clientAdress: string;
    clientFullName: string;
    dateOfCreation: Date;
    lastChange: string;
    title: string;
    otherInfo: string;
    
    user: User;
    filename: string;

    creditAmount: any;
    annualInterest: any;
    term: number;
 }
