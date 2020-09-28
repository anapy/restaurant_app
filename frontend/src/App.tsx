import '../src/stylesheets/App.scss';
import Main from './components/Main';
import Landing from './components/Landing';
import { Route, Switch} from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const App = () => {
  const[userId, setUserId] = useState('');

  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
