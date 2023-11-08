import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Game from './app/game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
