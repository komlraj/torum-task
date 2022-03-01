import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import routes from "./routes";
import APIContextProvider from "./contexts";

function App() {
  return (
    <APIContextProvider>
      <BrowserRouter>
        <div>
          <Routes>
            {routes?.map(route => (<Route key={route?.url} exact path={route?.url} element={<route.component />} />))}
          </Routes>
        </div>
      </BrowserRouter>
    </APIContextProvider>
  );
}

export default App;
