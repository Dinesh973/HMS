// src/services/authService.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export const loginService = async (payload: LoginPayload, role: string) => {
  const response = await fetch(`http://localhost:5000/${role}/login`, {
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
  return data;
};

export const logoutService = () => {
  // Example: Clear any stored session data (you can enhance this)
  localStorage.removeItem('token');
};