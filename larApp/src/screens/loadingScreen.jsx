import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
    letterSpacing: 1.5,
  }
});
