import Auth from './components/Auth.js';
import Home from './components/Home.js';
import Verificationcode from './components/Verificationcode.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path= "/" component={Home}/>
        <Route path= "/auth" component={Auth}/>
        <Route path= "/verificationcode" component={Verificationcode}/>
      </Switch>

    </Router>



  );
}

export default App;
