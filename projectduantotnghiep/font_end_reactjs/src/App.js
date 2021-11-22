import Auth from './components/Auth.js';
import Home from './components/Home.js';
import NotFound from './components/Notfound.js';
import CreatePost from './components/CreatePost.js'
import HeaderComponent from './commons/global/HeaderComponent'
import Verificationcode from './components/Verificationcode.js';
import Postsbycategory from './components/Postsbycategory.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


function App() {

  return (
    <Router>

      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/verificationcode" component={Verificationcode} />
        <Route
      
          path="/"
          render={() => (
            <>
            <HeaderComponent />
              <Route path={`/`} component={Home} exact />
              <Route path={`/contribute`} component={CreatePost} />
              <Route path={`/postsbycategory/:slug`} component={Postsbycategory} />
            </>
          )}
        />
        


      </Switch>
    </Router>
  );
}

export default App;
