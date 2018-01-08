import { Component, PropTypes } from 'react';
//import  { withRouter } from 'react-router-dom'

import angular from 'angular';

var React = require('react');
//@withRouter
export default class AngularNav extends Component {
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
  
  html = `<app-nav></app-nav>`;

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