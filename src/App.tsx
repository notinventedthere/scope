import React from 'react';
import { Grommet, ThemeType } from 'grommet'
import Stage from './components/Stage';

const theme: ThemeType = {
}

function App() {
  return (
    <Grommet full theme={theme}>
      <Stage />
    </Grommet>
  );
}

export default App;
