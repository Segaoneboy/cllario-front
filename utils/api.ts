// Базовый URL относительный благодаря Next.js rewrites
const BASE_URL = '/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Убираем возможный дублирующийся слеш, если эндпоинт начинается с него
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;
  
  const defaultOptions: RequestInit = {
    ...options,
    credentials: 'include', // Критично для httpOnly кук, даже внутри прокси
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Ошибка запроса: ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}