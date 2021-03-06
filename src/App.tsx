import React from 'react';
import logo from './logo.svg';
import './App.scss';
import QuestionsService from './api/curiouscat/v2/QuestionsService';
import {Helmet} from 'react-helmet';
import * as FaIcons from 'react-icons/fa';
import Menu from './resources/components/Menu/Menu';

function App() {
  //QuestionsService.getList({username: 'to_mirio'});
  QuestionsService.profile({});

  return (
      <>
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
      </>
  );
}

export default App;
