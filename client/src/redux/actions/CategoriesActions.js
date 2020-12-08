export const requestCategories = () => ({
  type: "REQUEST_CATEGORIES",
});

export const receiveCategories = (data) => ({
  type: "RECEIVE_CATEGORIES",
  data: data,
});

export const errorCategories = () => ({
  type: "ERROR_CATEGORIES",
});

export const toggleCategoriesBar = (data) => ({
  type: "TOGGLE_CATEGORIES_BAR",
  data: data,
});
