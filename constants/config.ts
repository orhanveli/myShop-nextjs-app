export const config = {
  api: {
    apiKey: process.env.apiKey ?? '',
    baseUrl: process.env.baseUrl || 'http://localhost:5100'
  },
  ui: {
    sortOptions: [
      { value: 'price-low-2-high', label: 'Price low to high' },
      { value: 'price-high-2-low', label: 'Price High to low' },
      { value: 'new-2-old', label: 'New to Old' },
      { value: 'old-2-new', label: 'Old to New' }
    ],
    productCountPerPage: 16
  }
};
