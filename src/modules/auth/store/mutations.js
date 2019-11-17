export const SET_USER_AUTH = (state, payload) => {
  state.auth = payload;
};

export const SET_USER_PROFILE = (state, payload) => {
  state.user = payload;
};

export const SET_USER_OAUTH = (state, payload) => {
  // console.log(payload)
  state.oauthclients = payload;
};

export const SET_DEFAULT_COMPANY = (state, payload) => {
  state.user.defaultCompany = payload;
};

export const RESET_OAUTH_ACCESS_TOKEN = (state, payload) => {
  const googleOauth = state.oauthclients.oauth.find(item => item.oauth_provider === 'google');
  googleOauth.access_token = payload;
};

export const CLEAR_ALL_DATA = (state) => {
  state.auth = '';
  state.user = '';
  state.oauthclients = '';
};
export const SET_LOADING = (state, payload) => {
  // console.log('loading status user' + payload)
  state.loadingAuth = payload;
};
