import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ShowDetailScreen from './screens/ShowDetailScreen';
import {Routes,Route} from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<HomeScreen />}/>
        <Route path = '/details/:id' element = {<ShowDetailScreen />}/>
      </Routes>
    </div>
  )
}

export default App