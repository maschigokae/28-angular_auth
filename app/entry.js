'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const angularTouch = require('angular-touch');
const angularAnimate = require('angular-animate');

const cfgram = angular.module('cfgram', [angularTouch, angularAnimate, uiRouter]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( fileName => {
  cfgram.config(context(fileName));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( fileName => {
  let name = pascalcase(path.basename(fileName, '.js'));
  cfgram.controller(name, context(fileName));
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( fileName => {
  let name = camelcase(path.basename(fileName, '.js'));
  let module = context(fileName);
  cfgram.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( fileName => {
  let name = camelcase(path.basename(fileName, '.js'));
  let module = context(fileName);
  cfgram.component(name, module);
});
