import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  } from 'react-router-dom'
  //import ReactDOM from 'react-dom';
import angular from 'angular';
import uirouter from '@uirouter/angularjs'

import { withRouter } from 'react-router'
// const {
//   MemoryRouter: Router,
//   Route,
//   Link
// } = ReactRouterDOM;


angular
  .module('ngApp', ['ui.router', uirouter])
  .component('appNav', {
    template: '<nav class="app-nav"> <a ui-sref="oranges" class="nav-link">Oranges</a><a ui-sref="apples" class="nav-link">Apples</a> <a ui-sref="angular" class="nav-link">Angular</a> </nav>'
    
    
  })
  .controller('ngController', [
  '$scope',
  function($scope) {
    $scope.value = 'World';
  },
])

class AngularComponent extends Component {
  template = '<div ng-controller="ngController">Hello {{ value }}! If you see <code ng-non-bindable>{{ value }}</code> here, try a hard reload.</div>';
  componentDidMount () {
    angular.module('ngApp')
    angular.bootstrap(this.container, ['ngApp']);
  }
  render () {
    return (
      <div
        ref={c => this.container = c}
        dangerouslySetInnerHTML={{ __html: this.template }}
      />
    );
  }
}

@withRouter
class AngularNav extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  componentDidMount () {
    angular.module('ngApp')
      .run(($state) => {
        $state.go = this.handleAngularRoute;
      });
    angular.bootstrap(this.container, ['ngApp']);
  }
  
  html = '<app-nav></app-nav>';

  handleAngularRoute = (state, params, options) => {
    this.props.history.push(state);
  };

  render = () => (
    <div
      ref={c => this.container = c}
      dangerouslySetInnerHTML={{__html: this.html}}
    />
  );
}

// const App = () => (
//   <Router>
//     <div className="container">
//         <AngularNav/>
//         <Route path="/oranges" component={() => <span>Orage</span>} />
//         <Route path="/apples" component={() => <span>Apple</span>} />
//       <Route path="/angular" component={AngularComponent} />
//     </div>
//   </Router>
// );
// export default App;

// ReactDOM.render(<App/>, document.querySelector('#root'));
class App extends Component {
  render() {
    return (
      <div className="App">
       <Router>
       <div className="container">
           <AngularNav/>
           <Route path="/oranges" component={() => <span>Orage</span>} />
           <Route path="/apples" component={() => <span>Apple</span>} />
         <Route path="/angular" component={AngularComponent} />
       </div>
     </Router>
     </div>
    );
  }
}

export default App;
