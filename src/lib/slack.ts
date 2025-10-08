import axios from 'axios';

export const sendMessage = (webhookUrl: string, message: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    url: webhookUrl,
    method: 'POST',
    data: {
      text: message,
    },
  };
  axios.request(config);
};
