let isRefreshing = false;
let refreshPromise: Promise<Response> | null = null;

async function refreshToken(){
    if(!isRefreshing){
        isRefreshing = true;

        refreshPromise = fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        }).finally(() => isRefreshing = false);

        return refreshPromise;
    }
}

export default function fetchWithRefresh(){
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input.toString();

        // Эти эндпоинты не трогаем
        if (url.includes('/api/auth/login') || url.includes('/api/auth/register') || url.includes('/api/auth/refresh')) {
            return originalFetch(input, {
                ...init,
                credentials: 'include',
            });
        }

        // Первый запрос
        let response = await originalFetch(input, {
            ...init,
            credentials: 'include',
        });

        // Если 401 — пробуем рефреш
        if (response.status === 401) {
            const refreshResponse = await refreshToken();

            if (refreshResponse && refreshResponse.ok) {
                // Повторяем оригинальный запрос
                response = await originalFetch(input, {
                    ...init,
                    credentials: 'include',
                });
            } else {
                throw new Error('Сессия истекла, пожалуйста войдите в аккаунт');
            }
        }

        return response;
    };

}