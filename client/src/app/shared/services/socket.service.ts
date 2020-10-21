import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
// import { TransactionsService } from './transactions.service';

const API_URL = environment.apiUrl;

@Injectable()
export class SocketService {
  socket: any;

  constructor(
    private authService: AuthService,
    // private transactionsService: TransactionsService,
  ) {}

  init() {
    this.handleDisconnect();
    this.handleConnect();
    this.handleEvents();
  }

  handleDisconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  handleConnect() {
    this.socket = io(API_URL + '/users', {
      forceNew: true,
      query: {
        token: this.authService.getToken()
      }
    });
  }

  handleEvents() {
    // this.socket.on('tbc-one-time-payment-executed', ({ isSuccess, error }) => {
    //   if (isSuccess) {
    //     this.transactionsService.tbcOneTimePaymentExecutionReceived(isSuccess);
    //   } else {
    //     this.transactionsService.tbcOneTimePaymentErrorReceived(error);
    //   }
    // });
  }
}
