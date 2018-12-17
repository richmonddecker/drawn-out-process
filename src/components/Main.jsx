import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import RepetitiveIndex from './RepetitiveIndex';
import Repetitive from './Repetitive';

const reload = () => {console.log("HI BOOBS"); window.location.reload();};

const NoMatch = () => (
  <div>404</div>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/repetitive' component={RepetitiveIndex}/>
      <Route path='/repetitive/:name' component={Repetitive}/>
      <Route component={NoMatch} />
      <Route onEnter={reload} />
    </Switch>
  </main>
)

export default Main;
