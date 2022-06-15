import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

declare var $: any;

@Injectable()
export class UtilityService {
  constructor() {} // private toastr: ToastrService

  showSuccess(message: any, title: any) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
    });
  }

  showError(message: any, title: any) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      showConfirmButton: false,
    });
  }

  showLoading(): void {
    $('#loading-overlay').show();
  }

  hideLoading(): void {
    // $('#loading-overlay').fadeOut(500);
    $('#loading-overlay').hide();
  }
}
