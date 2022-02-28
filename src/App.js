import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import routes from "./routes";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {routes?.map(route => (<Route exact path={route?.url} element={<route.component />} />))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
