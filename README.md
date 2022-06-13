# jufa

## Getting Started

1. Install client and backend dependencies

```
yarn setup
```

2. Start Expo client (will boot an iOS simulator) and Express backend

```
yarn start
```

## Deploy

Run `yarn heroku_deploy` for the backend to push to heroku.

The babel inline env transform doesn't seem to be working. To push to expo, replace `BACKEND_URL` with

```
export const BACKEND_URL = "youngppl-connect.herokuapp.com"
```

then run `NODE_ENV=production BACKEND_URL=youngppl-connect.herokuapp.com expo publish`.