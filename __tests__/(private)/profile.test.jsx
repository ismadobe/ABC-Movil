import React from 'react';
import renderer from 'react-test-renderer';

import ProfilePage from '../../app/(private)/profile';

describe('ProfilePage', () => {
  it('ProfilePage renders correctly', () => {
    const tree = renderer.create(<ProfilePage />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
