const API_URL = 'http://localhost:5000/api';

export interface LoginResponse {
  token: string;
}

export interface ProgressData {
  moduleProgress: { [key: string]: number };
  completedSections: string[];
}

export const api = {
  // Auth endpoints
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  },

  async register(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  },

  // Progress endpoints
  async getProgress(token: string): Promise<ProgressData> {
    const response = await fetch(`${API_URL}/progress`, {
      headers: {
        'x-auth-token': token,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }
    return response.json();
  },

  async saveProgress(
    token: string,
    moduleId: string,
    progress: number,
    completedSections: string[]
  ): Promise<ProgressData> {
    const response = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({
        moduleId,
        progress,
        completedSections,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to save progress');
    }
    return response.json();
  },
}; 