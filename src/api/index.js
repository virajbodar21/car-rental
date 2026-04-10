const API_URL = 'http://localhost:5005/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Generic fetch function
const apiFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Error');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  register: async (name, email, password, phone) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone }),
    });
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  },

  login: async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  },

  getCurrentUser: async () => {
    return apiFetch('/auth/me');
  },

  updateProfile: async (name, phone) => {
    return apiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, phone }),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },
};

// ============ CARS ENDPOINTS ============

export const carsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/cars${query}`);
  },

  getById: async (id) => {
    return apiFetch(`/cars/${id}`);
  },

  create: async (carData) => {
    return apiFetch('/cars', {
      method: 'POST',
      body: JSON.stringify(carData),
    });
  },

  update: async (id, carData) => {
    return apiFetch(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/cars/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============ BOOKINGS ENDPOINTS ============

export const bookingsAPI = {
  create: async (bookingData) => {
    return apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getMyBookings: async () => {
    return apiFetch('/bookings/my-bookings');
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/bookings${query}`);
  },

  getById: async (id) => {
    return apiFetch(`/bookings/${id}`);
  },

  updateStatus: async (id, status) => {
    return apiFetch(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  cancel: async (id) => {
    return apiFetch(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  },
};

// ============ USERS ENDPOINTS ============

export const usersAPI = {
  getAll: async () => {
    return apiFetch('/users');
  },

  getStats: async () => {
    return apiFetch('/users/stats/dashboard');
  },

  getById: async (id) => {
    return apiFetch(`/users/${id}`);
  },

  updateRole: async (id, role) => {
    return apiFetch(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  delete: async (id) => {
    return apiFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============ HEALTH CHECK ============

export const healthCheck = async () => {
  try {
    return await apiFetch('/health');
  } catch (error) {
    console.error('Backend is not available');
    return null;
  }
};
