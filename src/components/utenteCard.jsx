import React from 'react';
import { View } from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import styles from '../styles/utenteDetailsScreen_styles';

const UtenteCard = ({ title, icon, onAdd, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={title}
        titleStyle={styles.cardTitle}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={icon}
            style={styles.cardAvatar}
            color="#5e3b7f"
          />
        )}
        right={() => (
          <View style={styles.cardActions}>
            <IconButton icon="plus" size={20} onPress={onAdd} />
          </View>
        )}
      />
    </Card>
  );
};

export default UtenteCard;
