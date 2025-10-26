const API_URL = 'https://humi-fastapi.onrender.com/chat';

export async function sendMessage(userId: string, message: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Adjust this based on your API's response structure
    // Common patterns: data.response, data.message, data.reply, etc.
    return data.response || data.message || data.reply || JSON.stringify(data);
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}
