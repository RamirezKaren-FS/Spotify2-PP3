import '../App.css';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { env } from 'process';
require('dotenv').config()

// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
// const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET




function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [accessToken, setAcessToken ] = useState('')
    const [albums, setAlbums] = useState([])
    const [songs, setSongs] = useState([])
    const [artist, setArtist] = useState([])


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
                .then(data => setAcessToken(data.access_token))
                console.log(CLIENT_ID, CLIENT_SECRET);
        },[])
    
        const artistSearch = async () =>{
        console.log("Search for " + searchInput);

        const artistParam ={
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
        }

        const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParam)
        .then(response => response.json())
        .then(data => {return data.artists.items[0].id})
        console.log("Artist ID is " + artistID);

        const foundAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&limit=10', artistParam)
        .then(response => response.json())
        .then(data => { setAlbums(data.items)})

        const foundSongs = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks' + '?market=US', artistParam)
        .then(response => response.json())
        .then(data => {console.log(data); setSongs(data.tracks)})

        const foundArtists = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/related-artists ', artistParam)
        .then(response => response.json())
        .then(data => {console.log(data); setArtist(data.artists)})

    }
    
    

    return (
    <div className="App">
    <header className="App-header">
        <h1 class="title"> Search Page </h1>
        
        <input type='input' onChange={event => setSearchInput(event.target.value)}></input>
        <button onClick={artistSearch}>Submit</button>
        <Link to={'/'}><button type="button">Home</button></Link>


        <h1 class="title">Albums</h1>

        {albums.map((album, i) =>{
            
            return(
                <div class="card">
                <img src={album.images[1].url} alt={album.name} class='cardImg' ></img>
                <div class="container">
                <p>{album.name}</p>
                </div>
                </div>
            )
        })}
        <h1 class="title">Top Songs</h1>
        {songs.map((song, i) =>{
            
            return(
                <div class="card">
                <img src={song.album.images[1].url} alt={song.name} class='cardImg' ></img>
                <div class="container">
                <p>{song.name}</p>
                </div>
                </div>
            )
        })}

<h1 class="title">Related Artists</h1>

        {artist.map((art, i) =>{
            
            return(
                <div class="card">
                <img src={art.images[1].url} alt={art.name} class='cardImg' ></img>
                <div class="container">
                <p>{art.name}</p>
                </div>
                </div>
            )
        })}
        
        </header>
    </div>
);
}



export default Search;