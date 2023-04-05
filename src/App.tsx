import React from 'react';
import './App.css';
import { Routers } from './routes/routers';
import { useTranslation } from 'react-i18next';

function App() {
  return (
    <div className="App">
      <Routers/>
    </div>
  );
}

export default App;
