import '../App.css';
import musicnote from "../assets/musicnote.jpg";
import othernote from "../assets/othernote.png";
import logo from '../assets/doof.png';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Error Detectinator</h1>
        <p>
          Choose a category to practice:
        </p>
        <div className="button-container">
          <Link to="/exercises?tags=Pitch" className="category-button">
            <img src={musicnote} alt="Pitch" />
            <span>Pitch</span>
          </Link>
          <Link to="/exercises?tags=Intonation" className="category-button">
            <img src={othernote} alt="Intonation" />
            <span>Intonation</span>
          </Link>
          <Link to="/exercises?types=Rhythm" className="category-button">
            <img src={othernote} alt="Rhythm" />
            <span>Rhythm</span>
          </Link>
        </div>
      </header>
    </div>
  );
}