export const SET_LOADED_ACCOUNT = (state, payload) => {
  state.loadedAccount = payload;
};

export const CREATE_BOUNTY = (state, payload) => {
  state.loadedBounty = payload;
};

export const SET_PROJECT_DETAILS = (state, payload) => {
  state.projectDetails = payload;
};
export const SET_LOADED_PROJECTS = (state, payload) => {
  state.loadedProjects = payload;
};
export const SET_CATEGORY_LIST = (state, payload) => {
  state.loadedCategories = payload;
};
export const SET_LOADED_TEAMMEMBER = (state, payload) => {
  state.loadedTeamMembers = payload;
};
export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

export const SET_LOADING_PROJECTS = (state, payload) => {
  state.loadingProject = payload;
};
export const SET_ERROR = (state, payload) => {
  state.error = payload;
};
