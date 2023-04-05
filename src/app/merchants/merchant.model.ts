import { AddressDetails } from "./address-details.model";
import { ContactDetails } from "./contact-details.model";
import { EmailDetails } from "./email-details.model";

export class Merchant{
    public merchantId: number | null;
    // public merchantType : string;
    public merchantName : string;
    public merchantGST : string;
    public remarks : string;
    public theContacts : ContactDetails[];
    public theEmails : EmailDetails[];
    public theAddress : AddressDetails[];

    constructor(merchantId : number | null, merchantName : string, merchantGST : string, remarks : string, theContacts : ContactDetails[], theEmails : EmailDetails[], theAddress : AddressDetails[]){
        this.merchantId = merchantId;
        // this.merchantType = "";
        this.merchantName = merchantName;
        this.merchantGST = merchantGST;
        this.remarks = remarks;
        this.theContacts = theContacts;
        this.theEmails = theEmails;
        this.theAddress = theAddress;
    }
    
}