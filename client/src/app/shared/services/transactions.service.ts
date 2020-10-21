import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TransactionsService {
  tbcOneTimePayments: Subject<any> = new Subject();
  tbcOneTimePaymentErrors: Subject<any> = new Subject();

  constructor() {}

  tbcOneTimePaymentExecutionReceived(isSuccess: any) {
    this.tbcOneTimePayments.next(isSuccess);
  }

  tbcOneTimePaymentErrorReceived(error: any) {
    this.tbcOneTimePaymentErrors.next(error);
  }

  getTbcOneTimePayments() {
    return this.tbcOneTimePayments;
  }

  getTbcOneTimePaymentErrors() {
    return this.tbcOneTimePaymentErrors;
  }

}
