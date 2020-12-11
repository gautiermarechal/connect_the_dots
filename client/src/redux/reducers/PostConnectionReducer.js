import moment from "moment";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  status: "idle",
  step: 0,
  type: "structure",
  post_connection: {
    _id: "",
    created_at: "",
    author: {
      _id: "",
      name: "",
      username: "",
    },
    likes: 0,
    bookmarks: 0,
    bannerSrc: "",
    books: [],
    categories: [],
    content: "",
    media: [],
    comments: [],
    finalLinks: [],
  },
};

const PostConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_POST_CONNECTION":
      return { ...state, status: "started" };
    case "PAUSE_POST_CONNECTION":
      return { ...state, status: "paused" };
    case "RECEIVE_POST_CONNECTION":
      return { ...state, status: "received", post_connection: action.data };
    case "ERROR_POST_CONNECTION":
      return { ...state, status: "error" };
    case "ADD_BOOK_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          books: [...state.post_connection.books, action.data],
        },
      };
    case "TOGGLE_STEP_POST_CONNECTION":
      return { ...state, step: state.step + action.data };
    case "SET_TYPE_POST_CONNECTION":
      return { ...state, type: action.data };
    case "GET_CONTENT_POST_CONNECTION":
      return {
        ...state,
        post_connection: { ...state.post_connection, content: action.data },
      };
    case "CHANGE_ALL_POST_CONNECTION":
      return { ...state, ...action.data };
    case "CREATE_POST_CONNECTION":
      return {
        ...state,
        ...action.data.postConnection,
        post_connection: {
          ...state.post_connection,
          ...action.data.postConnection.post_connection,
          _id: uuidv4(),
          created_at: moment().unix(),
          author: action.data.author,
        },
      };
    case "ADD_CATEGORY_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          categories: [...state.post_connection.categories, action.data],
        },
      };
    case "ADD_TITLE_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          title: action.data,
        },
      };
    case "ADD_BANNER_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          bannerSrc: action.data,
        },
      };
    case "INITIALIZE_CONTENT_STRUCTURE_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          content: action.data.content,
          finalLinks: [],
        },
      };
    case "INITIALIZE_CONTENT_FREE_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          content: "",
        },
      };
    case "MODIFY_CONCEPT_TO_BOOK":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          content: state.post_connection.content.map((obj, i) => {
            return i === action.data.indexBook
              ? {
                  ...obj,
                  concepts: obj.concepts.map((concept, iConcept) =>
                    iConcept === action.data.indexConcept
                      ? {
                          ...concept,
                          [action.data.fieldToChange]: action.data.value,
                        }
                      : concept
                  ),
                }
              : obj;
          }),
        },
      };

    case "ADD_CONCEPT_TO_BOOK":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          content: state.post_connection.content.map((obj, indexBook) =>
            indexBook === action.data.indexBook
              ? {
                  ...obj,
                  concepts: [
                    ...state.post_connection.content[indexBook].concepts,
                    {
                      _id:
                        state.post_connection.content[indexBook].concepts
                          .length,
                      title: "",
                      description: "",
                      links: [],
                    },
                  ],
                }
              : obj
          ),
        },
      };
    case "ADD_LINK_TO_CONCEPT":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          content: state.post_connection.content.map((obj, indexBook) => {
            if (
              state.post_connection.content[action.data.indexBook].concepts[
                action.data.indexConcept
              ].links.some((link) => {
                return link._id === action.data.conceptObj._id;
              })
            ) {
              return obj;
            } else {
              return indexBook === action.data.indexBook
                ? {
                    ...obj,
                    concepts: obj.concepts.map((concept, iConcept) =>
                      iConcept === action.data.indexConcept
                        ? {
                            ...concept,
                            links: [
                              ...state.post_connection.content[indexBook]
                                .concepts[iConcept].links,
                              {
                                ...action.data.conceptObj,
                                _bookId: action.data.book,
                              },
                            ],
                          }
                        : concept
                    ),
                  }
                : obj;
            }
          }),
        },
      };

    case "MODIFY_LINK":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          content: state.post_connection.content.map((obj, indexBook) => {
            return {
              ...obj,
              concepts: obj.concepts.map((concept) => {
                return {
                  ...concept,
                  links: concept.links.map((link) => {
                    if (
                      link._bookId === action.data.bookId &&
                      link._id === action.data.indexLink
                    ) {
                      return {
                        ...link,
                        [action.data.fieldToChange]: action.data.value,
                      };
                    } else {
                      return link;
                    }
                  }),
                };
              }),
            };
          }),
        },
      };
    case "CREATE_FINAL_LINK":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          finalLinks: [
            ...state.post_connection.finalLinks,
            { _id: action.data._id, parentConcept: {}, childrenConcepts: [] },
          ],
        },
      };
    case "ADD_FINAL_LINK":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          finalLinks: state.post_connection.finalLinks.map((finalLink) => {
            if (finalLink._id === action.data._id) {
              return {
                ...finalLink,
                parentConcept: action.data.parentConcept,
                childrenConcepts: action.data.childrenConcepts,
                content: action.data.content,
              };
            } else {
              return { ...finalLink };
            }
          }),
        },
      };
    default:
      return state;
  }
};

export default PostConnectionReducer;
