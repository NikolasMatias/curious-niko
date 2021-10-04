import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import QuestionsService from './services/api/curiouscat/v2/QuestionsService';
import {Helmet} from 'react-helmet';
import * as FaIcons from 'react-icons/fa';
import Menu from './components/Menu/Menu';
import {defaultTheme} from "./themes/DefaultTheme";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./themes/GlobalStyles";

function App() {
    const [theme] = useState(defaultTheme);

  //QuestionsService.getList({username: 'to_mirio'});
  QuestionsService.profile({});

  return (
      <>
          <ThemeProvider theme={theme}>
              <GlobalStyles />
              <Helmet>
                  <meta charSet="utf-8" />
                  <title>Curious Niko - Home</title>
                  <link rel="curious-niko" href="http://curious-niko.com/" />
              </Helmet>
              <Menu />
              <div className="App">
                  <header className="App-header">
                      <FaIcons.FaBinoculars className="App-logo App-link"/>
                      <p>
                          Bem vindo ao Curious Niko
                      </p>
                  </header>
              </div>
          </ThemeProvider>
      </>
  );
}

export default App;
