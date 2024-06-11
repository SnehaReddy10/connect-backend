import { WebSocket } from 'ws';
import { MESSAGE_TYPE } from '../../constants/messages';
import { ExtendedWebSocket } from '../../interfaces/ExtendedWebSocket';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';

const rooms = new Map<string, ExtendedWebSocket[]>();
let messages: any = [];

setInterval(async () => {
  await Message.insertMany(messages);
  messages = [];
}, 10000);

export const handleWebsocketConnection = async (
  ws: ExtendedWebSocket,
  request: any
) => {
  const roomId = request.url?.slice(1, 2) ?? '';
  const clientId = uuidv4();
  let clients = rooms.get(roomId);
  ws.clientId = clientId;
  if (clients) {
    rooms.set(roomId, [...clients, ws]);
  } else {
    rooms.set(roomId, [ws]);
  }
  clients = rooms.get(roomId);

  ws.on('error', console.error);

  ws.on('message', (data: string) => {
    const parsedMessage = JSON.parse(data);

    const { roomId, from, message } = parsedMessage;
    const clientsSubscribedToRoom = rooms.get(roomId) ?? [];

    clientsSubscribedToRoom.forEach((client) => {
      if (client.readyState == WebSocket.OPEN && client.clientId !== from) {
        client.send(
          JSON.stringify({
            type: MESSAGE_TYPE.MESSAGE,
            from: clientId,
            message: parsedMessage.message,
          })
        );
        messages.push({ from, message, roomId });
      }
    });
  });

  ws.on('close', () => {
    let remainingClients: any = clients?.filter((x) => x.clientId !== clientId);
    rooms.set(roomId, remainingClients);
    console.log('Client Disconnected');
  });

  const prevMessages = await Message.find({ roomId });
  console.log('Connected', clientId);
  ws.send(
    JSON.stringify({
      type: MESSAGE_TYPE.ID,
      id: clientId,
      messages: prevMessages,
    })
  );
};
