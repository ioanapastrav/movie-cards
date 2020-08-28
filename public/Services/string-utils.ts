export class StringUtils {
    splitNames (stringOfNames:string):Array<string>{
        let listOfFullNames:Array<string> = stringOfNames.split(', ');
        
           return listOfFullNames;
    }
}


