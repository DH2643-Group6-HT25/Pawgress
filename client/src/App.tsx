import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'; 
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
      socket.disconnect();
    };
  }, []);

  const sendTest = async () => {
    await fetch('http://localhost:3001/notify-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'info', text: 'Hello from client button!' }),
    });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          {/* From /public, no import needed */}
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <button onClick={sendTest} style={{ marginLeft: 8 }}>
          Send test notification
        </button>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
