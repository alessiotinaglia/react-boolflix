import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import Card from './pages/Card';

function App() {
  return (    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Card />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
