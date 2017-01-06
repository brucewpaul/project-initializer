import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

jest.dontMock('../components/homepage');

import allReducers from '../reducers';

const store = createStore(allReducers);

import Foo from '../foo';
import HomePage from '../components/homepage';

describe("A suite", function() {
  it("contains correct props from the Redux State Object", function() {
    var home = <HomePage store={store}/>

    expect(shallow(home).props().store.options).toEqual(store.options);
  });
});
