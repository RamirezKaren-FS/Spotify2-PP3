import { Link } from "react-router-dom";
import '../App.css';


function Home() {

    return (
        <div className="App">
        <header className="App-header">
            <section>
                <h1 class="title">Spotify Search Engine </h1>
                <Link to={'/search'}><button type="button">Find Your Jam</button></Link>
            </section>
        </header>
        </div>
    );
}

export default Home;