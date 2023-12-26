import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Components/MainPage/Main";

import CountryTable from "./Components/Data/CountryTable";
import { Country } from "./Components/Data/Country";

const routes = [
  {
    path: "/",
    element: <Main/>
  },
  {
    path: "/countries/",
    element: <CountryTable/>
  },
  {
    path: "/country",
    element: <Country />,
  },

  


];
function App() {
  
  return (
    <Router>
      {" "}
      {/* Wrap your App component with Router */}
      <div className="App bg-black">

        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
