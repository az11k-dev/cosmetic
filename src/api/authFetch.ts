// src/api/authFetch.ts (или src/utility/authFetch.ts)
import {store} from "@/store";

interface AuthRequestInit extends RequestInit {
    headers?: HeadersInit;
}

export const authFetch = (url: RequestInfo, options: AuthRequestInit = {}): Promise<Response> => {
    const token = store.getState().registration?.token;
    const newHeaders = new Headers(options.headers);

    if (token) {
        newHeaders.set('Authorization', `Bearer ${token}`);
    }

    // Убедимся, что Content-Type установлен для отправки JSON, если есть тело
    if (!newHeaders.has('Content-Type') && options.body) {
        newHeaders.set('Content-Type', 'application/json');
    }

    return fetch(url, {
        ...options,
        headers: newHeaders,
    });
};