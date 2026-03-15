import { Route, Routes } from 'react-router-dom'
import './App.css'
import { IndexPage } from './pages/indexPage'
import TablePage from './pages/TablePage'
import { InfoPage } from './pages/InfoPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />}>
          <Route index element={<TablePage />} />
          <Route path='/info' element={<InfoPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App
