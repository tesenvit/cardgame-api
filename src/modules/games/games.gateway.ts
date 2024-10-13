import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    WsResponse,
} from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class GamesGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        setTimeout(() => {
            this.server.emit('events', 'test')
        }, 2000)

        return data
    }
}
