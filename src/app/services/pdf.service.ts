import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { CatalogOfOperationMode } from '../models/catalog-of-operation-mode.model';


@Injectable({
    providedIn: 'root'
})
export class PDFService {

    saveAsPDFSale(title: string, clientFullName: string, clientAdress: string,
        creatorFullName: string, creatorAdress: string, dateOfCreation: Date,
        otherInfo: string, saleObject: string, salingPrice: any, warrantyPeriod: number) {

        const doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("Arial");
        doc.setFontSize(20);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("CONTRACT OF SALE", 170), 105, 20, 'center');
        doc.setFontStyle("");
        doc.setFontSize(14);
        doc.text(doc.splitTextToSize(dateOfCreation.toString(), 30), pageWidth - 50, 30);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("THE SUBJECT OF THE CONTRACT", 170), 105, 50, 'center');
        doc.setFontStyle("");
        var subText = "The Seller undertakes to transfer to the ownership of the Buyer " + saleObject
            + " and the Buyer undertakes to accept the goods and pay the Seller the sum of money, the procedure and amount established by this contract.";
        doc.text(doc.splitTextToSize(subText, 170), 20, 60);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("CALCULATION PROCEDURE AND AMOUNT OF THE CONTRACT", 170), 105, 90, 'center');
        doc.setFontStyle("");
        var calc = "The amount of the contract is " + salingPrice + "$."
        doc.text(doc.splitTextToSize(calc, 170), 20, 100);
        var calc2 = "All payments under this contract are made in rubles in accordance with the norms of current low."
        doc.text(doc.splitTextToSize(calc2, 170), 20, 110);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("WARRANTY PERIOD", 170), 105, 130, 'center');
        doc.setFontStyle("");
        var warrantytext = "The warranty period for the goods " + warrantyPeriod + " days."
        doc.text(doc.splitTextToSize(warrantytext, 170), 20, 140);
        var details = 155;
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DETAILS OF THE PARTIES", 170), 105, details, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("Buyer details:", 80), 20, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + clientFullName, 80), 20, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + clientAdress, 80), 20, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 20, 200);
        doc.text(doc.splitTextToSize("Seller details:", 80), 110, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + creatorFullName, 80), 110, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + creatorAdress, 80), 110, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 110, 200);
        doc.save(title + ".pdf");
    }


    saveAsPDFWork(title: string, clientFullName: string, clientAdress: string,
        creatorFullName: string, creatorAdress: string, dateOfCreation: Date,
        otherInfo: string, startWork: Date, position: string, placeOfWork: string,
        operationMode: CatalogOfOperationMode, workingHours: number, holiday: number,
        salary: number, term: number) {

        const doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("Arial");
        doc.setFontSize(20);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("WORK CONTRACT", 170), 105, 20, 'center');
        doc.setFontStyle("");
        doc.setFontSize(14);
        doc.text(doc.splitTextToSize(dateOfCreation.toString(), 30), pageWidth - 50, 30);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("THE SUBJECT OF THE CONTRACT", 170), 105, 50, 'center');
        doc.setFontStyle("");
        var subText = "Employee is accepted to perform work in the position " + position;
        doc.text(doc.splitTextToSize(subText, 170), 20, 60);
        var subText2 = "The Employee is obliged to start work from " + startWork;
        doc.text(doc.splitTextToSize(subText2, 170), 20, 70);
        var subText3 = "The place of work is '" + placeOfWork + "'";
        doc.text(doc.splitTextToSize(subText3, 170), 20, 80);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("WORK PAYMENT CONDITIONS", 170), 105, 95, 'center');
        doc.setFontStyle("");
        var workText = "For the performance of job duties, an Employee is determined by the salary of " + salary + "$ per month."
        doc.text(doc.splitTextToSize(workText, 170), 20, 105);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("MODE OF WORKING TIME AND REST TIME", 170), 105, 120, 'center');
        doc.setFontStyle("");
        var modeText = "The Employee is set to the following mode: " + operationMode.operationMode + " (" + workingHours + " hours a week).";
        doc.text(doc.splitTextToSize(modeText, 170), 20, 130);
        var modeText2 = "During the working day, the Employee is given a break for rest and meals for 1 hour, which is not included in the working time."
        doc.text(doc.splitTextToSize(modeText2, 170), 20, 140);
        var modeText3 = "The Employee is granted an annual leave of " + holiday + " calendar days.";
        doc.text(doc.splitTextToSize(modeText3, 170), 20, 155);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("SOCIAL INSURANCE OF EMPLOYEE", 170), 105, 165, 'center');
        doc.setFontStyle("");
        var socText = "The Employee is subject to social insurance in the manner and under the conditions established by applicable law."
        doc.text(doc.splitTextToSize(socText, 170), 20, 175);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DUTIES OF THE PARTIES", 170), 105, 195, 'center');
        doc.setFontStyle("");
        var dutiesText = "In case of non-fulfillment or improper fulfillment of duties by the Employee, he bears disciplinary,"
            + " material and other responsibility in accordance with labor legislation."
        doc.text(doc.splitTextToSize(dutiesText, 170), 20, 205);
        var details = 225;
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DETAILS OF THE PARTIES", 170), 105, details, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("Employee details:", 80), 20, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + clientFullName, 80), 20, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + clientAdress, 80), 20, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 20, 275);
        doc.text(doc.splitTextToSize("Emloyeer details:", 80), 110, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + creatorFullName, 80), 110, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + creatorAdress, 80), 110, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 110, 275);
        doc.save(title + ".pdf");
    }



    saveAsPDFRental(title: string, clientFullName: string, clientAdress: string,
        creatorFullName: string, creatorAdress: string, dateOfCreation: Date,
        otherInfo: string, rentalObject: string, startRental: Date, endRental: Date, rentalPrice: number) {

        const doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("Arial");
        doc.setFontSize(20);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("LEASE CONTRACT", 170), 105, 20, 'center');
        doc.setFontStyle("");
        doc.setFontSize(14);
        doc.text(doc.splitTextToSize(dateOfCreation.toString(), 30), pageWidth - 50, 30);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("THE SUBJECT OF THE CONTRACT", 170), 105, 50, 'center');
        doc.setFontStyle("");
        var subText = "In accordance with the Agreement, the Lessor rents out and the Lessee immediately acquires"
            + " and uses the following property: " + rentalObject;
        var startText = "The lease starts on " + startRental;
        var endText = "The lease expires on " + endRental;
        doc.text(doc.splitTextToSize(subText, 170), 20, 60);
        doc.text(doc.splitTextToSize(startText, 170), 20, 75);
        doc.text(doc.splitTextToSize(endText, 170), 20, 85);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("RENT SIZE AND CALCULATION UNDER CONTRACT", 170), 105, 100, 'center');
        doc.setFontStyle("");
        var rentText = "The Lessee undertakes to pay the Lessor for the use of the property a fee in the amount of " + rentalPrice + "$ a day.";
        doc.text(doc.splitTextToSize(rentText, 170), 20, 110);
        var rentText2 = "The Lessee makes monthly rental payments no later than the 25th day."
        doc.text(doc.splitTextToSize(rentText2, 170), 20, 125);
        var rentText3 = "If the rent is not received within the specified period, the Landlord charges it in the prescribed manner with interest charges for the overdue payment."
        doc.text(doc.splitTextToSize(rentText3, 170), 20, 135);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("RIGHTS AND DUTIES OF THE PARTIES", 170), 105, 155, 'center');
        doc.setFontStyle("");
        var rightsText = "The Lessor must, within 5 days after signing the contract, provide the property to the Lessee."
        doc.text(doc.splitTextToSize(rightsText, 170), 20, 165);
        var rightsText2 = "The Lessee is obliged to use the property only for its intended purpose."
        doc.text(doc.splitTextToSize(rightsText2, 170), 20, 180);
        var rightsText3 = "The Lessee is obliged to return the property in the condition in the condition in which it was received."
        doc.text(doc.splitTextToSize(rightsText3, 170), 20, 190);
        var rightsText4 = "If the law allows the sublease of property, the Lessee has the right to sublet the property only with the written consent of the Lessor."
        doc.text(doc.splitTextToSize(rightsText4, 170), 20, 205);
        var details = 225;
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DETAILS OF THE PARTIES", 170), 105, details, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("Lessee details:", 80), 20, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + clientFullName, 80), 20, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + clientAdress, 80), 20, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 20, 275);
        doc.text(doc.splitTextToSize("Lessor details:", 80), 110, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + creatorFullName, 80), 110, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + creatorAdress, 80), 110, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 110, 275);
        doc.save(title + ".pdf");
    }



    saveAsPDFCredit(title: string, clientFullName: string, clientAdress: string,
        creatorFullName: string, creatorAdress: string, dateOfCreation: Date,
        otherInfo: string, creditAmount: any, annualInterest: any, term: number) {

        const doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("Arial");
        doc.setFontSize(20);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("LOAN CONTRACT", 170), 105, 20, 'center');
        doc.setFontStyle("");
        doc.setFontSize(14);
        doc.text(doc.splitTextToSize(dateOfCreation.toString(), 30), pageWidth - 50, 30);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("THE SUBJECT OF THE CONTRACT", 170), 105, 50, 'center');
        doc.setFontStyle("");
        var subText = "Under this contract, the Lender provides a loan in the amount of " + creditAmount + "$,"
            + " and the Borrower undertakes to return the loan amount to the Lender and pay initial"
            + " interest for using the loan in accordance with the terms and conditions.";
        var subText2 = "The interest rate for this contract is " + annualInterest + "% per annum.";
        var ysubText2 = 55 + 10 * (subText.length / 90);
        doc.text(doc.splitTextToSize(subText, 170), 20, 60);
        doc.text(doc.splitTextToSize(subText2, 170), 20, ysubText2);
        var yCond = ysubText2 + 10 * (subText2.length / 90);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("CONDITIONS OF ISSUANCE AND LOAN PAYMENT ORDER", 170), 105, yCond + 5, 'center');
        doc.setFontStyle("");
        var condText = "The loan is granted by issuing the loan amount at the Lender’s cash desk or by transferring the loan amount to the indicated account of the Borrower."
            + " The Borrower has the right to repay the loan under the loan and (or) interest for its use by depositing cash in the cashier’s cash desk or transferring the amount of the debt to the Lender’s current account in a non-cash form;"
        doc.text(doc.splitTextToSize(condText, 170), 20, yCond + 15);
        var yRights = yCond + 10 + 10 * (condText.length / 90);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("RIGHTS AND DUTIES OF THE PARTIES", 170), 105, yRights, 'center');
        doc.setFontStyle("");
        var rigths1 = "The Lender undertakes to ensure the provision of a loan within 5 business days from the date of signing by the parties of this contract."
        var rigths2 = "The Lender undertakes to provide the Borrower with a loan under the terms of this contract."
        var rigths3 = "The Lender undertakes to advise the Borrower on all matters related to the execution of this contract."
        var rigths4 = "The Borrower undertakes to repay the loan and pay interest for its use within the time period specified in this contract in full."
        doc.text(doc.splitTextToSize(rigths1, 170), 20, yRights + 10);
        doc.text(doc.splitTextToSize(rigths2, 170), 20, yRights + 25);
        doc.text(doc.splitTextToSize(rigths3, 170), 20, yRights + 40);
        doc.text(doc.splitTextToSize(rigths4, 170), 20, yRights + 55);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("TERM OF CONTRACT", 170), 105, yRights + 75, 'center');
        doc.setFontStyle("");
        var termText = "The term of the loan is " + term + " days from the date of the actual issuance by the Lender of the loan amount to the Borrower or the transfer of the loan amount to the specified account of the Borrower."
            + " The Borrower undertakes to make the final payment of the loan amount and initial interest for using the loan to the Lender before the deadline.";
        doc.text(doc.splitTextToSize(termText, 170), 20, yRights + 85);
        var yEarly = yRights + 80 + 10 * (termText.length / 90);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("EARLY EXECUTION OF DUTIES", 170), 105, yEarly, 'center');
        doc.setFontStyle("");
        var erlyText1 = "In case of early repayment of the loan, the Borrower shall notify the Lender of the early repayment no later than 5 business days."
        var erlyText2 = "In case of early repayment of the loan, interest on the use of the loan is paid by the Borrower for the actual period of use of the loan."
        doc.text(doc.splitTextToSize(erlyText1, 170), 20, yEarly + 10);
        doc.text(doc.splitTextToSize(erlyText2, 170), 20, yEarly + 25);
        doc.addPage();
        var details = 20;
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DETAILS OF THE PARTIES", 170), 105, details, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("Borrower details:", 80), 20, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + clientFullName, 80), 20, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + clientAdress, 80), 20, details + 35);
        var sign1 = details + 40 + 9 * (clientAdress.length / 25);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 20, sign1);
        doc.text(doc.splitTextToSize("Lender details:", 80), 110, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + creatorFullName, 80), 110, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + creatorAdress, 80), 110, details + 35);
        var sign2 = details + 40 + 9 * (creatorAdress.length / 25);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 110, sign2);

        doc.save(title + ".pdf");
    }



    saveAsPDFCooperation(kindOfActivity: string, dateOfCreation: Date, clientResponsibility: string,
        creatorResponsibility: string, term: number, terminationConditions: string, title: string,
        clientFullName: string, clientAdress: string, creatorFullName: string, creatorAdress: string,
        otherInfo: string) {

        console.log("save as pdf");
        const doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("Arial");
        doc.setFontSize(20);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("JOINT ACTIVITY CONTRACT", 170), 105, 20, 'center');
        doc.setFontStyle("");
        doc.setFontSize(14);
        doc.text(doc.splitTextToSize(dateOfCreation.toString(), 30), pageWidth - 50, 30);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("THE SUBJECT OF THE CONTRACT", 170), 105, 50, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("The parties undertake, by joining efforts, to act together on a mutually beneficial basis of the following: " + kindOfActivity, 170), 20, 60);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DUTIES OF THE PARTIES", 170), 105, 80, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("Party 1 duties:", 170), 20, 90);
        doc.text(doc.splitTextToSize(clientResponsibility, 160), 30, 100);
        var yParty2 = 105 + 9 * (clientResponsibility.length / 100);
        doc.text(doc.splitTextToSize("Party 2 duties:", 170), 20, yParty2);
        var yParty2Dut = yParty2 + 10;
        doc.text(doc.splitTextToSize(creatorResponsibility, 160), 30, yParty2Dut);
        var yRes = yParty2Dut + 10 + 9 * (creatorResponsibility.length / 100);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("RESPONSIBILITIES OF THE PARTIES", 170), 105, yRes, 'center');
        doc.setFontStyle("");
        var resText = "In the event of non-performance or improper performance of an obligation, the Contracting Party shall indemnify the other party for the losses caused by it."
            + " Under the loss means the costs incurred by the other party in the execution of the agrement, the loss or damage to its property.";
        doc.text(doc.splitTextToSize(resText, 170), 20, yRes + 10);
        var yTime = yRes + 10 + 9 * (resText.length / 90);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("TERM OF CONTRACT", 170), 105, yTime, 'center');
        doc.setFontStyle("");
        var timeText = "This contract is valid for " + term + " days and is valid from the moment of signing."
        " The contract may be extended by the parties, which is an additional contract.";
        doc.text(doc.splitTextToSize(timeText, 170), 20, yTime + 10);
        var yTermination = yTime + 15 + 9 * (timeText.length / 90);
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("TERMINATION OF THE CONTRACT", 170), 105, yTermination, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("This contract will be terminated upon expiration.", 170), 20, yTermination + 10);
        doc.text(doc.splitTextToSize("The contract may be terminated in the following cases:", 170), 20, yTermination + 20);
        doc.text(doc.splitTextToSize(terminationConditions, 160), 30, yTermination + 30);

        doc.addPage();
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DISPUTE RESOLUTION", 170), 105, 20, 'center');
        doc.setFontStyle("");
        var dispResText = "All disputes and controversies that may arise in connection with this contract will, if possible, be resolved through negotiations between the parties."
            + " In case of non-settlement of disputes and disagreements through negotiations, the resolution of disputes is made in court in accordance with the current legislation."
        doc.text(doc.splitTextToSize(dispResText, 170), 20, 30);
        var other = 25 + 10 * (dispResText.length / 90);
        var details = other;
        doc.setFontStyle("bold");
        doc.text(doc.splitTextToSize("DETAILS OF THE PARTIES", 170), 105, details, 'center');
        doc.setFontStyle("");
        doc.text(doc.splitTextToSize("Party 1 details:", 80), 20, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + clientFullName, 80), 20, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + clientAdress, 80), 20, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 20, 110);
        doc.text(doc.splitTextToSize("Party 2 details:", 80), 110, details + 10);
        doc.text(doc.splitTextToSize("Full name: " + creatorFullName, 80), 110, details + 20);
        doc.text(doc.splitTextToSize("Adress: " + creatorAdress, 80), 110, details + 30);
        doc.text(doc.splitTextToSize("Signature ____________________", 80), 110, 110);
        doc.save(title + ".pdf");
    }

    addDay(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }
}