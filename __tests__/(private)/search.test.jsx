import React from 'react';
import renderer from 'react-test-renderer';

import SearchPage from '../../app/(private)/search';

describe('SearchPage', () => {
  it('SearchPage renders correctly', () => {
    const tree = renderer.create(<SearchPage />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
