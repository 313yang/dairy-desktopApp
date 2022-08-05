import { createRoot } from 'react-dom/client';
import theme from 'style/theme';
import { ThemeProvider } from 'styled-components';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// // calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
