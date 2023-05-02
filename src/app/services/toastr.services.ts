import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrServices {
  constructor(private toastr: ToastrService) {}
  options = {
    progressBar: true,
    closeButton: true,
  };
  success(msg): void {
    this.toastr.success(msg, '', this.options);
  }

  error(msg): void {
    this.toastr.error(msg, '', this.options);
  }

  info(msg): void {
    this.toastr.info(msg, '', this.options);
  }

  warning(msg): void {
    this.toastr.warning(msg, '', this.options);
  }
}
