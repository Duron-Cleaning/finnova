import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATIONS_STORAGE_KEY = '@finnova_notifications';

class NotificationService {
  constructor() {
    this.notifications = [];
    this.loadNotifications();
  }

  async loadNotifications() {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      this.notifications = stored ? JSON.parse(stored) : this.getInitialNotifications();
      await this.saveNotifications();
    } catch (error) {
      console.error('Error loading notifications:', error);
      this.notifications = this.getInitialNotifications();
    }
  }

  getInitialNotifications() {
    return [
      {
        id: '1',
        type: 'payment',
        title: 'Pago Próximo',
        message: 'Tu próximo pago está programado para el 25 de este mes.',
        time: '2024-01-15T10:00:00',
        priority: 'high',
        read: false,
      },
      {
        id: '2',
        type: 'credit',
        title: 'Oferta Especial',
        message: 'Has sido pre-aprobado para un nuevo crédito con tasa preferencial.',
        time: '2024-01-14T15:30:00',
        priority: 'medium',
        read: false,
      },
      {
        id: '3',
        type: 'security',
        title: 'Actualización de Seguridad',
        message: 'Por favor verifica tu información de contacto para mantener tu cuenta segura.',
        time: '2024-01-13T09:15:00',
        priority: 'low',
        read: true,
      },
    ];
  }

  async saveNotifications() {
    try {
      await AsyncStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(this.notifications)
      );
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  async getNotifications() {
    return this.notifications;
  }

  async addNotification(notification) {
    this.notifications.unshift({
      id: Date.now().toString(),
      time: new Date().toISOString(),
      read: false,
      ...notification,
    });
    await this.saveNotifications();
  }

  async markAsRead(notificationId) {
    this.notifications = this.notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    await this.saveNotifications();
  }

  async deleteNotification(notificationId) {
    this.notifications = this.notifications.filter(
      notification => notification.id !== notificationId
    );
    await this.saveNotifications();
  }

  async clearAll() {
    this.notifications = [];
    await this.saveNotifications();
  }

  async getUnreadCount() {
    return this.notifications.filter(notification => !notification.read).length;
  }
}

export default new NotificationService();
