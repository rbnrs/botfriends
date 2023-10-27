import { IsNumber, IsString, IsUrl, Length } from "class-validator"

export interface DeveloperInterface {
    _id: string,
    firstName: string,
    lastName: string,
    jobDescription: string,
    imageUrl: string,
    createdAt: number
}

export class Developer{

    @Length(0, 45)
    _id: string;

    @Length(0, 25)
    @IsString()
    firstName: string;

    @Length(0, 25)
    @IsString()
    lastName: string;

    @Length(0, 100)
    @IsString()
    jobDescription: string;

    @IsString()
    @Length(0, 1000)
    imageUrl: string;

    @IsNumber()
    createdAt: number;


    constructor();
    constructor(oDeveloper: DeveloperInterface); 
    constructor(oDeveloper?: DeveloperInterface) {
        this._id = oDeveloper?._id ?? "";
        this.firstName = oDeveloper?.firstName ?? "";
        this.lastName = oDeveloper?.lastName ?? "";
        this.jobDescription = oDeveloper?.jobDescription ?? "";
        this.imageUrl = oDeveloper?.imageUrl ?? "";
        this.createdAt = oDeveloper?.createdAt ?? 0;             
    }

    public getValueByProperty(sProperty: string): any {
        
        let oObject = Object.assign({}, this) as any; 

        return oObject[sProperty];
    }


}