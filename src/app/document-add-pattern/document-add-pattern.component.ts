import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-add-pattern',
  templateUrl: './document-add-pattern.component.html',
  styleUrls: ['./document-add-pattern.component.css']
})
export class DocumentAddPatternComponent implements OnInit {

  patternItem: string = '1';

  constructor() { }

  ngOnInit() {
  }

}
