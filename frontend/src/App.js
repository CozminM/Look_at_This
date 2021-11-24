import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Routes} from "react-router";
import Form from "./components/Form";
import LocationsList from "./components/LocationsList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {


  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  <Route exact path='/' element={<Form/>}/>
                  <Route exact path='/add-location' element={<Form/>}/>
                  <Route exact path='/location-list' element={<LocationsList/>}/>
              </Routes>
              <Footer/>
          </Router>
      </div>

  );
}

export default App;