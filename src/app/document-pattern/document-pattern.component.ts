import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-document-pattern',
  templateUrl: './document-pattern.component.html',
  styleUrls: ['./document-pattern.component.css']
})
export class DocumentPatternComponent implements OnInit {
  patternItem: string = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.patternItem = this.userService.getKindOfContract();
  }

}
