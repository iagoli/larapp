import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const pedirPermissao = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('lembretes', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// Lembrete local no aparelho de quem agendou; ignora datas no passado e a versão web
export const agendarLembreteMedicacao = async ({ medicamento, quantidade, dataHora }) => {
  if (Platform.OS === 'web' || dataHora <= new Date()) return null;

  try {
    if (!(await pedirPermissao())) return null;

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora da medicação',
        body: `${medicamento} — quantidade: ${quantidade}`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: dataHora,
        channelId: 'lembretes',
      },
    });
  } catch (error) {
    console.error('Erro ao agendar lembrete:', error);
    return null;
  }
};
