import { config } from '../constants';

export interface MakeRequestArgs extends RequestInit {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
}

function queryParams(params: any) {
  return Object.keys(params)
    .map((k) => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map((val) => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join('&');
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join('&');
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
    url.search =
      (url.toString().indexOf('?') === -1 ? '?' : '&') +
      queryParams(options.params);
    // url.search = new URLSearchParams(options.params).toString();
  }

  return fetch(url.toString(), finalOptions);
}
