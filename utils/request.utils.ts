import { config } from '../constants';

export interface MakeRequestArgs extends RequestInit {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
}

export async function makeCatApiRequest(
  path: string,
  options?: MakeRequestArgs
): Promise<Response> {
  const finalOptions: MakeRequestArgs = {
    ...(options || {
      method: 'GET'
    }),
    headers: {
      ...(options?.headers ?? {}),
      'Content-Type': 'application/json',
      'x-api-key': config.api.apiKey
    }
  };

  const url = new URL(config.api.baseUrl + path);
  if (options?.params) {
    url.search = new URLSearchParams(options.params).toString();
  }

  return fetch(url.toString(), finalOptions);
}
