import { MongoClient } from "mongodb";
import { config } from "dotenv";

config(); 

export default class DBConnector{
    
    private readonly _sMONGO_URI: string = "mongodb://<username>:<password>@localhost:27017/botfriends"; 
    private _oMongoClient: MongoClient | undefined; 

    constructor(){}

    /**
     * create connection to mongodb
     */
    public connectToDatabase(): Promise<boolean>{

        return new Promise<boolean>((complete) => {
            
            if (process.env.DB_USER && process.env.DB_PW){

                let sUri = this._sMONGO_URI.replace('<username>', process.env.DB_USER).replace('<password>', process.env.DB_PW); 
                this._oMongoClient = new MongoClient(sUri); 
                this._oMongoClient.connect().then(() => {
                    complete(true); 
                }).catch((oError) => {
                    console.log(oError); 
                    complete(false)
                }); 
                
            } else {
                complete(false); 
            }

        }); 
    }

    /**
     * close client
     */
    public async closeClient(): Promise<void> {
        if (this._oMongoClient) await this._oMongoClient.close(); 
    } 

    public async collectEntries(sCollectionName: string, oFindArguments: {}): Promise<any[]> {

        return new Promise(async (resolve, reject) => {
            
            var aResultSet: any[] = []; 

            if (this._oMongoClient){
                const oCursor = this._oMongoClient.db('botfriends').collection(sCollectionName).find(oFindArguments); 
                aResultSet = await oCursor.toArray(); 
    
            } else{  
                reject(new Error('MongoClient is not connected')); 
            }
    
            resolve(aResultSet); 
        }) 
    }

    public async updateEntry(sCollectionName: string, oFindArguments: {}, oDeveloperJson: Object) {
        
        if (this._oMongoClient){
            const oResult = await this._oMongoClient.db('botfriends').collection(sCollectionName).updateOne(oFindArguments, {
                $set: oDeveloperJson
            }); 
            if (oResult.modifiedCount > 0) {
                return true; 
            }else {
                return false; 
            }
        }

        return false; 
    }

    public async deleteEntry(sCollectionName: string, oFindArguments: {}) {
        
        if (this._oMongoClient){
            const oResult = await this._oMongoClient.db('botfriends').collection(sCollectionName).deleteOne(oFindArguments); 
            if (oResult.deletedCount > 0) {
                return true; 
            }else {
                return false; 
            }
        }

        return false;
    }

}