import * as actionTypes from "../actions/actionTypes";

const initState = {
  posts: [
    {
      id: "1",
      jobRole: "Graduate Software Engineer",
      company: "RoBoCop Inc",
      location: "London",
      notes: "nice",
      status: "Applied",
    },
    {
      id: "2",
      jobRole: "Astronaut",
      company: "NASA",
      location: "Space",
      notes: "just vibes",
      status: "Rejected",
    },
    {
      id: "3",
      jobRole: "Teacher",
      company: "Elthorne",
      location: "Boston Manor",
      notes: "Groovy\nMaths!",
      status: "Interview Process",
    },
  ],
};

const deletePost = (state, action) => {
  const newPosts = state.posts.filter((el) => el.id !== action.payload);
  return newPosts;
};

const editPost = (state, action) => {
  const newPosts = state.posts.map((el) =>
    el.id !== action.payload.id ? el : action.payload
  );
  console.log(newPosts);
  return newPosts;
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ROLE_ADDED:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case actionTypes.ROLE_DELETED:
      return {
        ...state,
        posts: deletePost(state, action),
      };
    case actionTypes.ROLE_EDITED:
      return {
        ...state,
        posts: editPost(state, action),
      };

    default:
      return state;
  }
};

export default rootReducer;
