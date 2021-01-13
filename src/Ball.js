import {random} from 'lodash';
import React, {useRef, useEffect} from 'react';
import {Animated, Easing, Dimensions, ImageBackground} from 'react-native';
import styled from 'styled-components/native';

const {width: vpWidth, height: vpHeight} = Dimensions.get('window');

const Ball = ({image}) => {
  useEffect(() => {
    Animated.loop(floatAnim).start();
    Animated.loop(rotateAnim).start();
    bounce();
  });

  const seed = random(5, 200);
  const size = seed;
  const uri = `${image}&w=${size}`;
  // const uri = `assets/images${image}`;
  const duration = 2000000 / size;
  const bounceHeight = size * 0.2;
  let bounceDirection = false;
  const rotation = random(0, 45);
  const offset = size * random(0, 10);
  const top = random(0, vpHeight) - size / 2;
  const backgroundColor = `#${Math.floor(random(0, 16777215)).toString(16)}`;
  const left = useRef(new Animated.Value(0 - size - offset)).current;
  const marginTop = useRef(new Animated.Value(-bounceHeight)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotateAnim = Animated.timing(rotateValue, {
    toValue: 1,
    duration: duration,
    useNativeDriver: false,
    easing: Easing.linear,
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [`-${rotation}deg`, `${rotation}deg`],
  });

  const floatAnim = Animated.timing(left, {
    toValue: vpWidth + size,
    duration: duration,
    useNativeDriver: false,
    easing: Easing.linear,
  });

  const bounce = () => {
    Animated.timing(marginTop, {
      toValue: bounceDirection ? -bounceHeight : bounceHeight,
      duration: duration / 3,
      useNativeDriver: false,
    }).start(reverseBounce);
  };

  const reverseBounce = () => {
    bounceDirection = !bounceDirection;
    bounce();
  };

  const computedStyles = {
    top,
    left,
    marginTop,
    backgroundColor,
    borderColor: backgroundColor,
    transform: [{rotate}],
  };

  return <Styled.Ball size={size} style={computedStyles} source={{uri}} />;
};

const Styled = {
  Ball: styled(Animated.createAnimatedComponent(ImageBackground))`
    position: absolute;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border-radius: ${({size}) => size / 2}px;
    z-index: ${({size}) => size};
    overflow: hidden;
    border-width: ${({size}) => size / 25}px;
  `,
};

export default Ball;
