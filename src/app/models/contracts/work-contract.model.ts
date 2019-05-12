import { CatalogOfOperationMode } from '../catalog-of-operation-mode.model';
import { User } from '../user.model';

export class WorkContract {


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

    startWork: Date;
    position: string;
    placeOfWork: string;
    operationMode: CatalogOfOperationMode;
    workingHours: number;
    holiday: number;
    salary: number;
    term: number;


   

}
