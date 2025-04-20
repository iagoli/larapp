import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BottomTabBar.styles';

const tabs = ['Home', 'Alertas', 'Dashboard', 'Perfil'];

const BottomTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={styles.tab}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabBar;