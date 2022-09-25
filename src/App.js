import React from 'react';

import Card from './components/card/card.component';
import Footer from './components/footer/footer.component';

import './App.css';


const App = () => {
  return (
    <div className='App'>
      {
        // <h1>Image Uploader</h1>
      }
      <Card />
      <Footer name='Mr. President' />
    </div>
  );
}


export default App;
