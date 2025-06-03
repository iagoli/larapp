export const fetchChatToken = async (userId) => {
    try {
      const response = await fetch('http://localhost:3000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar token do chat');
      }
  
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw error;
    }
  };
  