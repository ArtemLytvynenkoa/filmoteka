import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from 'routes';
import './index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(<Routes />);
} else {
  const rootElement = document.createElement('div');
  rootElement.style.height = '100%';

  document.body.appendChild(rootElement);

  const root = createRoot(rootElement);

  root.render(<Routes />);
};

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
