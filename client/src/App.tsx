import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';  // Reserved for future use??
import './App.css';
import { socket } from './socket';

import { ThemeProvider } from "styled-components";
import { theme } from "./views/components/theme";
import { MyButton } from './views/components/MyButton';
import { MenuCard } from './views/components/MenuCard';


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
    <div>
      <ThemeProvider theme={theme}>
        <MyButton primary>Test styled theme button Primär</MyButton>
        <MyButton>Default</MyButton>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <MenuCard></MenuCard>
      </ThemeProvider> 
    </div>

  );
}

export default App;
