import React from 'react';
import renderer from 'react-test-renderer';

import Page from '../app/private';
// const Page = require('../app/private');

describe('<App />', () => {
  it('has 1 child', () => {
    console.log('Page', Page);
    const tree = renderer.create(<Page />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
