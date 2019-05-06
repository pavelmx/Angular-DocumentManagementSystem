import { Timestamp } from 'rxjs/internal/types';
import { User } from '../user.model';


export class ContractOfSale {

    id: number;
    active: boolean;
    clientAdress: string;
    clientFullName: string;
    dateOfCreation: Date;
    lastChange: string;
    title: string;
    otherInfo: string;
    kind: string;
    user: User;
    filename: string;

    saleObject: string;
    salingPrice: any;
    warrantyPeriod: number;
}
