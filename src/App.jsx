import { Route, Routes } from "react-router-dom";
import "./App.css";
import TablePage from "./pages/TablePage";
import { InfoPage } from "./pages/InfoPage";
import { IndexPage } from "./pages/IndexPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<IndexPage />}>
          <Route index element={<TablePage />} />
          <Route path="/info/:id" element={<InfoPage />} />
        </Route>
      </Routes>
  );
}

export default App;
