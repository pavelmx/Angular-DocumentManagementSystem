import { PipeTransform, Pipe } from '@angular/core';
import { Document } from '../models/document.model';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform{
    transform(listDocs: Document[], value: string, option: string){
        /*return listDocs.filter(doc => 
            doc[option].toLowerCase().includes(value.toLowerCase()));*/
    }
}