import API_CONFIG from '../config/api';

async function reflectAllChats(userId) {
  try {
    const response = await fetch(API_CONFIG.endpoints.getAllChat, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chat list: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat list:', error.message);
    throw error;
  }
}

async function createChat(chatValues) {
  try {
    const response = await fetch(API_CONFIG.endpoints.createChat, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatValues),
    });

    if (!response.ok) {
      throw new Error(`Failed to create chat: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating chat:', error.message);
    throw error;
  }
}

export { reflectAllChats, createChat };