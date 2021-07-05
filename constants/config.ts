export const config = {
  api: {
    apiKey: '3B6E3963-CA80-42D2-9A45-0605A7BF242D',
    baseUrl: 'http://localhost:5100'
    // baseUrl: 'https://custom-mock-server.herokuapp.com'
  },
  ui: {
    sortOptions: [
      { value: 'price-low-2-high', label: 'Price low to high' },
      { value: 'price-high-2-low', label: 'Price High to low' },
      { value: 'new-2-old', label: 'New to Old' },
      { value: 'old-2-new', label: 'Old to New' }
    ]
  }
};
