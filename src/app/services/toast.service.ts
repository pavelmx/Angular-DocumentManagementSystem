import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(head :string, body:string) {
    this.toastrService.success(body, head);
  }

  showError(head :string, body:string) {
    this.toastrService.error(body, head);
  }

  showInfo(head :string, body:string) {
    this.toastrService.info(body, head);
  }

  showWarning(head :string, body:string) {
    this.toastrService.warning(body, head);
  }
}

