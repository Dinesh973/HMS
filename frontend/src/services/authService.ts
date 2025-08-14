export interface LoginPayload {
  email: string;
  password: string;
}

// API Gateway URL points to the admin service
const API_GATEWAY_URL = 'http://localhost:1000/admin';

export const loginService = async (payload: LoginPayload) => {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });

    if (!response.ok) {
      throw new Error('Invalid credentials'); 
    }

    const data = await response.json();

    // Store JWT token if present
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutService = () => {
  localStorage.removeItem('token');
};
