import { User } from './user.model';

export class Document {

     id: number;
     dateOfCreation: Date;
     title: string;
     user: User;
     documentDescription: string;
     customer: string;
     filename: string;
     contractTerm: number;
     expired: boolean;  
          
  
     constructor(id: number, dateOfCreation: Date, title: string, user: User, documentDescription: string,
      customer: string, filename: string, contractTerm: number, expired: boolean) {
         this.id = id;
         this.dateOfCreation = dateOfCreation;
         this.title = title;
         this.user = user;
         this.documentDescription = documentDescription;
         this.customer = customer;
         this.filename = filename;
         this.contractTerm = contractTerm;
         this.expired = expired;
  }
  
}