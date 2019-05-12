import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { User } from '../user.model';

export class CooperationContract {

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
    
    clientResponsibility: string;
    creatorResponsibility: string;    
    kindOfActivity: string;   
    term: number;
    terminationConditions: string;
    
 }
