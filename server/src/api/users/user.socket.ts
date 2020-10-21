import { Server, Namespace } from 'socket.io';
import { socketCookieParser, socketSetUser } from '../../auth';

let userNamespace: Namespace = undefined;

export function initUserSocket(socketIO: Server) {
  userNamespace = socketIO.of('/users');

  userNamespace.use(socketCookieParser);
  userNamespace.use(socketSetUser);

  userNamespace.on('connection', (socket: any) => {
    const userId: string = socket.user._id.toString();

    socket.join(userId);

    socket.on('disconnect', () => {
      socket.leave(userId);
    });
  });
}

export function sendTbcOneTimePaymentExecuted(userId: any, data: { isSuccess?: any, error?: any }) {
  userNamespace.in(userId.toString()).emit('tbc-one-time-payment-executed', data);
}