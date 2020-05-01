import React, { useEffect } from 'react';
import './App.css';
import MovieTable from './components/MovieTable';
import LoadingBar from 'react-redux-loading-bar';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <>
      {/* This needs inline styling to work */}
      <LoadingBar showFastActions style={{ backgroundColor: 'red', height: '5px', zIndex: 1000, top: 0, position: 'fixed' }} />
      <NotificationContainer />

      <MovieTable />
      
    </>
  );
}

export default App;
