import { makeCatApiRequest } from '../../utils';

export async function getAllTags() {
  const req = await makeCatApiRequest('/tags', {
    method: 'GET'
  });
  return (await req.json()) as string[];
}
