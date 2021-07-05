# myShop

This is an example web app powered by NextJS.

- powered by [Next.js](https://nextjs.org/)
- bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- Type safety has been ansured with TypeScript
- State management has been handled by [redux-toolkit](https://redux-toolkit.js.org/usage/usage-with-typescript#createslice)
- UI framework is [ChackraUI](https://chakra-ui.com/)

## Custom json-server setup

Project consumes a custom built [json-server](https://github.com/typicode/json-server/) which is deplyoed to this specified address:

https://custom-mock-server.herokuapp.com

API requires a `x-api-key` header prop that provided on every request.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
