import React, { useContext, useEffect } from 'react';
import FormStateProvider from '../context/FormState';
import Form from './Form';
import { Header } from './Header';
import '../App.css';
import Footer from './Footer';
import FormConfigProvider, { FormConfigContext } from '../context/FormConfig';
import { applyTheme, mapTheme } from '../util/theme';

function App() {
  const { config } = useContext(FormConfigContext);

  useEffect(() => {
    applyTheme(mapTheme(config.theme));
  }, []);

  return (
    <div className='app-container'>
      <FormConfigProvider>
        <FormStateProvider>
          <Header />
          <Form />
          <Footer />
        </FormStateProvider>
      </FormConfigProvider>
    </div>
  );
}

export default App;
