import { useEffect, useRef, useState } from 'react';
import { METHOD } from '../types';

interface UseFetchOptions<Body = null, Headers = null> {
    method: METHOD;
    body?: Body;
    headers?: Headers;
}

interface UseFetchResponse<T> {
    fetched: T | null;
    error: string | null;
    loading: boolean;
    clearError: () => void;
}

export default function useFetch<T>(url: string, options?: UseFetchOptions): UseFetchResponse<T> {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ fetched, setFetched ] = useState<T | null>(null);
    const cancelRequest = useRef<boolean>(false);

    const getData = async (): Promise<void> => {
        try {
            setFetched(null);
            setLoading(true);
            const response: Response = await fetch(url, { options } as RequestInit);
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data: T = await response.json();
            setLoading(false);
            setFetched(data);
        } catch (e: any) {
            setLoading(false);
            setError(e.message);
        }
    }

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        cancelRequest.current = false;

        if (!url) {
            return;
        }

        if (!cancelRequest.current) {
             void getData()
        }

        return () => {
            cancelRequest.current = true;
        }
    }, [ url ]);

    return { error, fetched, loading, clearError };
}