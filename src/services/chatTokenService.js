import { apiPost } from './api';

export const fetchChatToken = async () => {
  const { token } = await apiPost('/token');
  return token;
};
