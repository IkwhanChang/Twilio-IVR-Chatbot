import { ICustomer, Customer } from './customer';
import { IItem } from './item';
import { IPromotion } from './promotion';
import { IStoreHour } from './storeHour';

interface IMerchant{
    username: string,
    email: string,
    name: string,
    password: string,
    storeName: string,
    menuLink: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipcode: string,
    phoneNumber: string,
    twilioPhoneNumber: string,
    customers: Array<ICustomer>,
    storeHours: Array<IStoreHour>,
    promotions: Array<IPromotion>,
    items: Array<IItem>
}

class Merchant implements IMerchant {
    username: string;
    email: string;
    name: string;
    password: string;
    storeName: string;
    menuLink: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    twilioPhoneNumber: string;
    customers: Array<ICustomer>;
    storeHours: Array<IStoreHour>;
    promotions: Array<IPromotion>;
    items: Array<IItem>;

    constructor({
        username = "",
        email = "",
        name = "",
        password = "",
        storeName = "",
        menuLink = "",
        address1 = "",
        address2 = "",
        city = "",
        state = "",
        zipcode = "",
        phoneNumber = "",
        twilioPhoneNumber = "",
        customers,
        storeHours,
        promotions,
        items
    }: {
        username: string,
        email: string,
        name: string,
        password: string,
        storeName: string,
        menuLink: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        zipcode: string,
        phoneNumber: string,
        twilioPhoneNumber: string,
        customers: Array<ICustomer>,
        storeHours: Array<IStoreHour>,
        promotions: Array<IPromotion>,
        items: Array<IItem>        
    }){
            this.username = username;
            this.email= email; 
            this.name= name; 
            this.password= password; 
            this.storeName= storeName; 
            this.menuLink= menuLink; 
            this.address1= address1; 
            this.address2= address2; 
            this.city= city; 
            this.state= state; 
            this.zipcode= zipcode; 
            this.phoneNumber= phoneNumber; 
            this.twilioPhoneNumber= twilioPhoneNumber; 
            this.customers = new Array<ICustomer>(); 
            
            customers.forEach(customer => {
                this.customers.push(new Customer(customer))
            })
            this.storeHours= storeHours; 
            this.promotions= promotions; 
            this.items= items; 
        }
}

export {IMerchant, Merchant}