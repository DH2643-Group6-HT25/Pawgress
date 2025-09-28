import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';  // Reserved for future use??
import './App.css';
import { socket } from './socket';
import { BrowserRouter as Router } from "react-router-dom";
import ReactRoot from "./ReactRoot";

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

  return (
    <Router>
      <ReactRoot />
    </Router>
  );
}

export default App;
