'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import ExamplePage from './ExamplePage';
// import '../src';

ReactDom.render((<ExamplePage />), document.getElementById('root'))
