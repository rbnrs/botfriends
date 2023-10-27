import { instanceToPlain, serialize } from "class-transformer";
import { Developer } from "../models/developer";
import DBConnector from "./db-connector";

export default class DevelopersDAO {
    
    public async getAllDevelopers(sGroupByProperty: string): Promise<any>{

        let oDBConnector = new DBConnector();
        
        try {
            let isConnected = await oDBConnector.connectToDatabase(); 

            if (isConnected) {
                let aResultSet = await oDBConnector.collectEntries('developers', {})

                let aDevelopers: Developer[] = []; 

                aResultSet.forEach((oResult) => {
                    let oDeveloper = new Developer({
                        "_id": oResult['_id'],
                        "firstName": oResult['firstName'],
                        "lastName": oResult['lastName'],
                        "jobDescription": oResult['jobDescription'],
                        "imageUrl": oResult['imageUrl'],
                        "createdAt": oResult['createdAt'],
                    });

                    aDevelopers.push(oDeveloper); 
                }); 

                await oDBConnector.closeClient(); 

                if (sGroupByProperty === "") {
                    return aDevelopers; 
                } else {
    
                    let oDevelopers = {} as any; 
                    const aGroupedByProperies = [...new Set(aDevelopers.map(oDeveloper => oDeveloper.getValueByProperty(sGroupByProperty)))];

                    aGroupedByProperies.forEach((sValue) => {
                        let aGroupedDevelopers = aDevelopers.filter((oDeveloper) => oDeveloper.getValueByProperty(sGroupByProperty) === sValue);
                        
                        oDevelopers[sValue] = aGroupedDevelopers; 
                    })

                    return oDevelopers; 
    
                }
            }
        }catch(oError) {
            console.error(oError); 
            return []; 
        }
    
    }

    public async updateDeveloper(oDeveloper: Developer): Promise<boolean>{

        let oDeveloperJson = instanceToPlain(oDeveloper); 
        let sDeveloperId = oDeveloperJson['_id']; 

        delete oDeveloperJson['_id']; 

        let oDBConnector = new DBConnector();
        
        try {
            let isConnected = await oDBConnector.connectToDatabase(); 

            if (isConnected) {

                let bUpdateSuccessful = await oDBConnector.updateEntry('developers', {'_id': sDeveloperId} , oDeveloperJson)
                await oDBConnector.closeClient();

                return bUpdateSuccessful; 
            }

            return false; 

        } catch(oError) {
            
            console.error(oError); 
            return false;
        }
    }

    public async deleteDeveloper(sDeveloperId: string) : Promise<boolean>{

        try {
            let oDBConnector = new DBConnector();
            let isConnected = await oDBConnector.connectToDatabase(); 

            if (isConnected) {

                let bDeleteSuccessful = await oDBConnector.deleteEntry('developers', {'_id': sDeveloperId})
                await oDBConnector.closeClient();

                return bDeleteSuccessful; 
            }

            return false; 

        } catch(oError) {
            
            console.error(oError); 
            return false;
        }
    }


}
