import express, {Request, Response} from 'express';
import DevelopersDAO from './services/developers-dao';
import cors from 'cors'; 
import Validator from './services/validator';

const iPort = process.env.PORT || 3000; 
const oServer = express();

oServer.use(cors());
oServer.use(express.json())

oServer.get('/DeveloperSet', async (oRequest: Request, oResponse: Response) => {

    try {
        let sGroupBy = "";

        if (oRequest.query.groupBy){
            sGroupBy = oRequest.query.groupBy as string; 
        }
        const aDevelopers = await new DevelopersDAO().getAllDevelopers(sGroupBy); 

        oResponse.statusCode = 200; 
        oResponse.json(aDevelopers)

    } catch(oError) {

        oResponse.statusCode = 500; 
        oResponse.json({
            'error': 'Something went wrong'
        }); 

        console.log(oError);
    }
}); 

oServer.post('/DeveloperSet', async (oRequest: Request, oResponse: Response) => {
    
    try {  
    
        let oDeveloperUpdate = oRequest.body; 

        new Validator().validateDeveloper(oDeveloperUpdate).then(async (oValidateDeveloper) => {

            if (oValidateDeveloper !== undefined) {
                const bSuccessfull = await new DevelopersDAO().updateDeveloper(oValidateDeveloper); 
                if (bSuccessfull){
                    oResponse.statusCode = 200;
                    oResponse.json('Update successful')
                } else {
                    oResponse.statusCode = 500; 
                    oResponse.json('Something went wrong')
                }
                
            } else {
                oResponse.statusCode = 422; 
                oResponse.json('Validation failed')
            }
        }); 

    } catch(oError) {

        oResponse.statusCode = 500; 
        console.log(oError);
    }
    
}); 

oServer.delete('/DeveloperSet(:userid)', async (oRequest: Request, oResponse: Response) => {
    
    try {
        let sUserParam = oRequest.params['userid']; 

        if (sUserParam.startsWith('(') && sUserParam.endsWith(')')) {
            sUserParam = sUserParam.slice(1, -1);
        }

        const bSuccessfull = await new DevelopersDAO().deleteDeveloper(sUserParam);
        
        if (bSuccessfull){
            oResponse.statusCode = 200;
            oResponse.json('Delete successful')
        } else {
            oResponse.statusCode = 500; 
            oResponse.json('Something went wrong')
        }

    } catch(oError) {
        oResponse.statusCode = 500; 
        console.log(oError);
    } 
}); 

oServer.listen(iPort, () => {
    console.log(`Server running at http://localhost:${iPort}`);
});

