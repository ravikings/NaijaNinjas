import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/main/Navbar';
import Main from './routes/Main';
import FreelancerProfile from "./views/main/FreelancerProfile";
import Home from './views/main/Home';
import Blog from './views/main/Blog';
import Result from './views/main/Result';
import Admin from "./routes/Admin";
import Message from "./views/dashboard/Message";
import BlogPost from './views/main/BlogPost';
import ManageBidders from './views/dashboard/ManageBidders';
import ManageTask from './views/dashboard/ManageTask';
import PostTask from './views/dashboard/PostTask';
import Setting from './views/dashboard/Setting';
import FindCompany from './views/main/FindCompany';
import CompanyResult from './views/main/CompanyResult';

function App() {
  return (
    <Router>
<Navbar />
    <Switch>
 <Main exact path="/" component={Home} />
 <Main exact path="/findcompany" component={FindCompany} />
 <Main exact path="/companyresult" component={CompanyResult} />
 <Main exact path="/profile" component={FreelancerProfile} />
  <Route exact path='/result' component="Home">
        <Result/>
      </Route> 
  
      <Main exact path="/blog" component={Blog } />
      <Main exact path="/blogpost" component={BlogPost } />
 
{/* dashboard Routes Start */}
 <Admin exact path="/message" component={Message} />
 <Admin exact path="/managebidders" component={ManageBidders} />
 <Admin exact path="/managetask" component={ManageTask} />
 <Admin exact path="/posttask" component={PostTask} />
 <Admin exact path="/setting" component={Setting} />
{/* dashboard Routes end */}
    </Switch>

  </Router>
  );
}

export default App;
