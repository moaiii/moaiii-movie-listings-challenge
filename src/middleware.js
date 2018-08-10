import App from './views/App/App.middleware';

const middlewares = {
  ...App,
};

export default (store, next, action) => {

  let middleware = middlewares[action.type];

  if (middleware) {
    middleware(store, next, action);
  }

  next(action);
}