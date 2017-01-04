import React from 'react';
import renderer from 'react-test-renderer';

import HomePage from '../client/react/homepage';

test('component has props', ()=> {
	const component = renderer.create(HomePage);
	var tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})
