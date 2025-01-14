import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Film from './pages/Film';
import DefaultLayout from './pages/DefaultLayout';
import Header from './components/HeaderComponent'; 

function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Film query={query} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
