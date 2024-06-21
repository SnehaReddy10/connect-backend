import { WebSocket } from 'ws';
import { MESSAGE_TYPE } from '../../constants/messages';
import { ExtendedWebSocket } from '../../interfaces/ExtendedWebSocket';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';

const rooms = new Map<string, ExtendedWebSocket[]>();
let messages: any = [];

export const handleWebsocketConnection = async (
  ws: ExtendedWebSocket,
  request: any
) => {
  const roomId = request.url?.slice(1, request.url.length) ?? '';
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

  console.log(messages.length);

  if (messages.length > 20) {
    await Message.insertMany(messages);
    messages = [];
  }

  ws.on('message', async (data: string) => {
    const parsedMessage = JSON.parse(data);

    const { roomId, from, message, userId } = parsedMessage;
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
      }
    });
    messages.push({ from, message, roomId, userId });
  });

  ws.on('close', async () => {
    let remainingClients: any = clients?.filter((x) => x.clientId !== clientId);
    rooms.set(roomId, remainingClients);
    await Message.insertMany(messages);
    messages = [];
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
