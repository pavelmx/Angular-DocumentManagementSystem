import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class FilterService {


    viewPages(length: number, page: number, pages: Array<number>) {
        if (length > 7) {
          var totalPages = length;
          var pageNumber = page + 1
          console.log(totalPages)
          var head = (pageNumber > 4) ? [1, -1] : [1, 2, 3];
          var tail = (pageNumber < totalPages - 3) ? [-1, totalPages] : [totalPages - 2, totalPages - 1, totalPages];
          var bodyBefore = (pageNumber > 4 && pageNumber < totalPages - 1) ? [pageNumber - 2, pageNumber - 1] : [];
          var bodyAfter = (pageNumber > 2 && pageNumber < totalPages - 3) ? [pageNumber + 1, pageNumber + 2] : [];
    
          var body = head.concat(bodyBefore).concat((pageNumber > 3 && pageNumber < totalPages - 2) ? [pageNumber] : []).concat(bodyAfter).concat(tail);
          return pages = body;
        }
        else {
          var body2: number[] = [1];    
          var i: number ;      
          for (i = 2; i < length+1; i++) {
            body2.push(i)
          }
          return pages = body2;
        }
      }
  }