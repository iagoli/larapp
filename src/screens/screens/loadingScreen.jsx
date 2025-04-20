import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react';
import styles from '../styles/loadingScreen_styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        animationData={require('../../assets/AnimationLoading.json')}
        loop
        autoplay
        style={styles.animation}
      />
      <Text style={styles.loadingText}>LOADING</Text>
    </View>
  );
};

export default LoadingScreen;
