import { makeCatApiRequest } from '../../utils';
import { ShopManufacturer } from './manufacturer.models';

export async function getAllManifacturers(limit = 20) {
  const req = await makeCatApiRequest('/manufacturers', {
    method: 'GET',
    params: {
      _limit: String(limit)
    }
  });
  return (await req.json()) as ShopManufacturer[];
}
