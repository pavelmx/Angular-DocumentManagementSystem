import { PipeTransform, Pipe } from '@angular/core';
import { Document } from '../document/document.model';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform{
    transform(listDocs: Document[], value: boolean){
        if(value)
            return listDocs.filter(doc => !doc.expired)
        else
            return listDocs
    }
}