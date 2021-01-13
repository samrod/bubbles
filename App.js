/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { random, times } from 'lodash';
import Ball from './src/Ball';
import { remoteImages as images } from './src/data';

const App: () => React$Node = () => {
  const ball = (image, index) => <Ball key={index} image={image} />;

  return (
      images.map(ball)
  );
};

export default App;
