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
    kind: string;
    user: User;
    filename: string;

    startWork: Date;
    position: string;
    operationMode: CatalogOfOperationMode;
    workingHours: number;
    holiday: number;
    salary: number;
    term: number;


    /*constructor(id: number, active: boolean, clientAdress: string, clientFullName: string, dateOfCreation: Date,
        lastChange: string, title: string, otherInfo: string, kind: string, startWork: Date, position: string,
        operationMode: CatalogOfOperationMode, workingHours: number, holiday: number, salary: number) {
            this.id =id;
            this.startWork = startWork;
            this.position = position;
            this.operationMode = operationMode;
            this.workingHours = workingHours;
            this.holiday = holiday;
            this.salary = salary;
            this.dateOfCreation = dateOfCreation;
            this.title = title;
            this.kind = kind;
            this.clientFullName = clientFullName;
            this.clientAdress = clientAdress;
            this.otherInfo = otherInfo;
            this.active = active;
            this.lastChange = lastChange;
        }*/

}
