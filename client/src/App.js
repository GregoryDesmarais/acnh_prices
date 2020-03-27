import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
