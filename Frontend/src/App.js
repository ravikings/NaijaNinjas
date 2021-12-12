import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/main/Navbar';
import Main from './routes/Main';
import FreelancerProfile from "./views/main/FreelancerProfile";
import Home from './views/main/Home';
import Result from './views/main/Result';
import Admin from "./routes/Admin";
import Message from "./views/dashboard/Message";

function App() {
  return (
    <Router>
<Navbar />
    <Switch>
 <Admin exact path="/message" component={Message} />
 <Main exact path="/" component={Home} />
 <Main exact path="/profile" component={FreelancerProfile} />
  <Route exact path='/result' component="Home">
        <Result/>
      </Route> 
  

 

    </Switch>

  </Router>
  );
}

export default App;
