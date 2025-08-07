interface DecodedToken {
  id: number;
  email: string;
  role: string;
  name?: string;
  exp: number;
  iat: number;
}

export const getUserFromToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
      exp: decoded.exp,
      iat: decoded.iat,
    };
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
};