import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';

interface Genre {
  id: number | null;
  name: string;
}

const App:React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genre, setGenre] = useState<Genre>({ id: null, name: '' });

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  }

  const handleGenre = (genre: Genre | null) => {
    if (genre) {
      setGenre(genre);
    } else {
      setGenre({ id: null, name: '' });
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header onSearchQuery={handleSearchQuery} onGenre={handleGenre} />
        <Routes>
          <Route path="/" element={<Home query={searchQuery} genre={genre}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
