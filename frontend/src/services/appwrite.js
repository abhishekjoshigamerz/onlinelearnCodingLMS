// import { Client } from 'appwrite';

// const client = new Client();

// client
//     .setEndpoint('http://139.144.5.252:82/v1')
//     .setProject('64833d5d0f480be72b0a');
import { Client,Account,Databases,Query  } from "appwrite";

const appwrite = new Client();
    
const account = new Account(appwrite);
const databases = new Databases(appwrite);


appwrite
.setEndpoint('http://139.144.5.252:82/v1')
.setProject('64833d5d0f480be72b0a');

export {
appwrite,
account,
databases,
Query 
}        
