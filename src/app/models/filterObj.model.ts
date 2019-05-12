export class FilterObject {
    ///general
    title: string;
    clientFullname: string;
    clientAdress: string;    
    lastChange: string;
    isActive: string;
    sortField: string;
    sortOrder: string;
    fromDate: string;
    toDate: string;
    ///user
    username: string;
    name: string;
    email: string;
    activationCode: string;
    ///work
    fromSalary: number;
    toSalary: number;
    position: string;
    placeOfWork: string;
    //rental
    fromRental: string;
    toRental: string;
    fromRentalPrice: number;
    toRentalPrice: number;
    rentalObject: string;
    ///credit
    toCreditAmount: any;
    toAnnualInterest: any;
    toTerm: number;
    fromCreditAmount: any;
    fromAnnualInterest: any;
    fromTerm: number;
    ///sale
    saleObject: string;
    fromSalingPrice: any;
    fromWarrantyPeriod: number;
    toSalingPrice: any;
    toWarrantyPeriod: number;
    //cooperation
    kindOfActivity: string;   
    toCooperationTerm: number;
    fromCooperationTerm: number;
}