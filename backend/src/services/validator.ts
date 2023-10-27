import { Developer } from "../models/developer";
import { plainToClassFromExist, plainToInstance } from 'class-transformer';
import { validate } from "class-validator";

export default class Validator {


    public validateDeveloper(oRequestObject: Object): Promise<any> {
        
        return new Promise(async (complete) => {

            try {

                let oDeveloper = new Developer();
                oDeveloper = plainToClassFromExist(oDeveloper, oRequestObject); 

                if (oDeveloper && oDeveloper instanceof Developer){

                    await validate(oDeveloper).then((aErrors) => {
                        if (aErrors.length > 0) {
                            console.log('Validation failed');
                            complete(undefined);
                        }else {
                            complete(oDeveloper);
                        }
                    }); 
                }
                  
            } catch(oError){
                console.log(oError);  
                complete(undefined);         
            }
            complete(undefined); 
        })
        
    }

}