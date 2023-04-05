import React from 'react';
import './App.css';
import { Routers } from './routes/routers';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <div>{t('BAREV')}</div>
      <Routers/>
    </div>
  );
}

export default App;
