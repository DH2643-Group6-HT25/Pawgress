import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './socket';




function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onNotification = (msg: { type: string; text: string }) => {
      console.log('[notification]', msg.type, msg.text);
    };

    socket.on('notification', onNotification);
    if (!socket.connected) socket.connect();

    return () => {
      socket.off('notification', onNotification);
    };
  }, []);

  
  return < div/ >;
}

export default App;
