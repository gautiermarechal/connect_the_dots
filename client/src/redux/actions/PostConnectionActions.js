export const startPostConnection = () => ({
  type: "START_POST_CONNECTION",
});

export const pausePostConnection = () => ({
  type: "PAUSE_POST_CONNECTION",
});

export const receivePostConnection = (data) => ({
  type: "RECEIVE_POST_CONNECTION",
  data: data,
});

export const errorPostConnection = () => ({
  type: "ERROR_POST_CONNECTION",
});

export const addBookPostConnection = (data) => ({
  type: "ADD_BOOK_POST_CONNECTION",
  data: data,
});

export const deleteBookPostConnection = (data) => ({
  type: "DELETE_BOOK_POST_CONNECTION",
  data: data,
});

export const toggleStepPostConnection = (data) => ({
  type: "TOGGLE_STEP_POST_CONNECTION",
  data: data,
});

export const setTypePostConnection = (data) => ({
  type: "SET_TYPE_POST_CONNECTION",
  data: data,
});

export const getContentPostConnection = (data) => ({
  type: "GET_CONTENT_POST_CONNECTION",
  data: data,
});

export const changeAllPostConnection = (data) => ({
  type: "CHANGE_ALL_POST_CONNECTION",
  data: data,
});

export const createPostConnection = (data) => ({
  type: "CREATE_POST_CONNECTION",
  data: data,
});

export const addCategoryPostConnection = (data) => ({
  type: "ADD_CATEGORY_POST_CONNECTION",
  data: data,
});

export const addTitlePostConnection = (data) => ({
  type: "ADD_TITLE_POST_CONNECTION",
  data: data,
});

export const addBannerPostConnection = (data) => ({
  type: "ADD_BANNER_POST_CONNECTION",
  data: data,
});

export const initialiseContentStructurePostConnection = (data) => {
  return { type: "INITIALIZE_CONTENT_STRUCTURE_POST_CONNECTION", data: data };
};

export const asyncInitialiseContentStructurePostConnection = (data) => {
  return (dispatch, getState) => {
    dispatch(initialiseContentStructurePostConnection(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const initialiseContentFreePostConnection = () => {
  return (dispatch, getState) => {
    dispatch(asyncInitialiseContentFreePostConnection());
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const asyncInitialiseContentFreePostConnection = () => ({
  type: "INITIALIZE_CONTENT_FREE_POST_CONNECTION",
});

export const asyncModifyConceptToBook = (data) => {
  return (dispatch, getState) => {
    dispatch(modifyConceptToBook(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const modifyConceptToBook = (data) => ({
  type: "MODIFY_CONCEPT_TO_BOOK",
  data: data,
});

export const asyncAddConceptToBook = (data) => {
  return (dispatch, getState) => {
    dispatch(addConceptToBook(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const addConceptToBook = (data) => ({
  type: "ADD_CONCEPT_TO_BOOK",
  data: data,
});

export const asyncAddLinkToConcept = (data) => {
  return (dispatch, getState) => {
    dispatch(addLinkToConcept(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const addLinkToConcept = (data) => ({
  type: "ADD_LINK_TO_CONCEPT",
  data: data,
});

export const asyncModifyLink = (data) => {
  return (dispatch, getState) => {
    dispatch(modifyLink(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const modifyLink = (data) => ({
  type: "MODIFY_LINK",
  data: data,
});

export const asyncCreateFinalLink = (data) => {
  return (dispatch, getState) => {
    dispatch(createFinalLink(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const createFinalLink = (data) => ({
  type: "CREATE_FINAL_LINK",
  data: data,
});

export const asyncAddFinalLink = (data) => {
  return (dispatch, getState) => {
    dispatch(addFinalLink(data));
    const state = getState();
    localStorage.setItem(
      "post-connection",
      JSON.stringify(state.postConnection)
    );
  };
};

export const addFinalLink = (data) => ({
  type: "ADD_FINAL_LINK",
  data: data,
});
