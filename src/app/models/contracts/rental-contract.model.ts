import { User } from '../user.model';

export class RentalContract { 

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

    rentalObject: string;
    startRental: Date;
    endRental: Date;
    rentalPrice: number;
}
