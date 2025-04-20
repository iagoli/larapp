import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from '../styles/BottomTabBar.styles';

const tabs = ['Home', 'Alertas', 'Dashboard', 'Perfil'];

const BottomTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={Styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={Styles.tab}
        >
          <Text style={[Styles.tabText, activeTab === tab && Styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabBar;