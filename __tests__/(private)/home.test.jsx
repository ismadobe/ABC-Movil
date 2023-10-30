import React from 'react';
import renderer from 'react-test-renderer';

import HomePage from '../../app/(private)/home';
// const Page = require('../app/private');

describe('HomePage', () => {
  it('HomePage renders correctly', () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
