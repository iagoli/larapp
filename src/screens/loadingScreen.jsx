import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from '../styles/loadingScreen_styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/AnimationLoading.json')}
        loop
        autoPlay
        style={styles.animation}
      />
      <Text style={styles.loadingText}>A carregar</Text>
    </View>
  );
};

export default LoadingScreen;
