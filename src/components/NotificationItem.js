import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationItem = ({ notification, onPress, onDismiss }) => {
  const getIconName = (type) => {
    switch (type) {
      case 'payment':
        return 'payment';
      case 'credit':
        return 'credit-card';
      case 'security':
        return 'security';
      case 'system':
        return 'system-update';
      case 'alert':
        return 'warning';
      default:
        return 'notifications';
    }
  };

  const getBackgroundColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FFE5E5';
      case 'medium':
        return '#FFF4E5';
      case 'low':
        return '#E5F6FF';
      default:
        return '#F5F5F5';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(notification.priority) },
        !notification.read && styles.unread
      ]}
      onPress={() => onPress(notification)}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={getIconName(notification.type)}
          size={24}
          color="#333"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
      <TouchableOpacity
        style={styles.dismissButton}
        onPress={() => onDismiss(notification.id)}
      >
        <Icon name="close" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  dismissButton: {
    padding: 4,
  },
});

export default NotificationItem;
