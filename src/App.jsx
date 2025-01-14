import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Film from './pages/Film';
import DefaultLayout from './pages/DefaultLayout';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Film />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
