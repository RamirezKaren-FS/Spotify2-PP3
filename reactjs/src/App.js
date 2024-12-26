import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import { useEffect } from 'react';
// require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET


function App() {



    useEffect(() => {
    var authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };
      fetch('https://accounts.spotify.com/api/token',authOptions)
          .then(results => results.json())
          .then(data => console.log(data))
          console.log(CLIENT_ID, CLIENT_SECRET);
    },[])


  return (
    <div className="App">
      <header className="App-header">
        <Routes>
      <Route path="/" exact element={<Home />} Home/>
      <Route path="/search" exact element={<Search/>} Search/>
      </Routes>
      </header>
    </div>
  );
}

export default App;
