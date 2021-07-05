import { makeCatApiRequest } from '../../utils';
import { ShopManufacturer } from './manufacturer.models';

export async function getAllManifacturers() {
  const req = await makeCatApiRequest('/manufacturers', {
    method: 'GET'
  });
  return (await req.json()) as ShopManufacturer[];
}
