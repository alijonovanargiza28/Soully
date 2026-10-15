# Soully Flower

Flower shop frontend built with React, TypeScript, Redux Toolkit and Material UI.

## Local development

1. Run `yarn install --frozen-lockfile`.
2. Copy `.env.example` to `.env`. `REACT_APP_API_URL` points to the Soully API (default: `http://localhost:3003`).
3. Start the API and run `yarn start`.

Run `yarn lint`, `yarn format:check`, `yarn check`, `CI=true yarn test --watchAll=false --runInBand`, and `yarn build` for validation. Deploy `build` to a static host configured to serve `index.html` for client routes such as `/products`.

The backend database supplies products, occasions and uploaded media. Keep backend uploads with the matching database. Local videos are used by the product collections and About page.

Do not submit `.env`, `node_modules`, logs or generated `build` output as source code. Checkout status changes are a demonstration flow; no payment provider is connected.

The development frontend opens on port 3000; the API defaults to port 3003. Keep the API URL and the backend `CORS_ORIGIN` consistent. Restart the development server after editing environment values. Authentication is restored from the API cookie after a refresh.

Products default to All. Category, search, sort and page are stored in the URL. API errors have a retry action and are separate from an empty catalog. The matching API version must return both `result` and `pagination`.

The contact form opens an email draft; it does not send email automatically. Checkout has no payment-provider integration. See the delivery audit report for test coverage and remaining production work.
