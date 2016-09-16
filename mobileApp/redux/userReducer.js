//reducer functions to modify state tree

// ------ ACTIONS FOR USER REDUCER --------- //
export function userAuth (userID) {
  return {
    type: 'USER_AUTH',
    isLoggedIn: true,
    userID
  };
}

export function toggleLogIn(bool) {
  return {
    type: 'TOGGLE_LOGIN',
    isLoggedIn: bool,
  };
}

export function userUnauth () {
  return {
    type: 'USER_UNAUTH',
    isLoggedIn: false,
  };
}

export function fetchUserSuccess (user) {
  return {
    type: 'FETCHING_USER_SUCCESS',
    user,
  };
}

export function updateUserLocation (userLocation) {
  return {
    type: 'UPDATE_USER_LOCATION',
    userLocation,
  };
}

export function updateUserFacebook (userInfo) {
  return {
    type: 'UPDATE_USER_FACEBOOK',
    userInfo,
  };
}

export function updateUserBirthday (birthday) {
  return {
    type: 'UPDATE_USER_BIRTHDAY',
    birthday,
  };
}

export function likeMemly(memlyId) {
  return {
    type: 'UPDATE_LIKED_MEMLYS',
    memlyId,
  };
}

export function dislikeMemly(memlyId) {
  return {
    type: 'UPDATE_DISLIKED_MEMLYS',
    memlyId,
  };
}

export function updateMemlyCount(memlyCount) {
  return {
    type: 'UPDATE_MEMLY_COUNT',
    memlyCount,
  };
}

export function increaseMemlyCount() {
  return {
    type: 'INCREASE_MEMLY_COUNT',
  };
}

// ----- SET USER REDUCER INITIAL STATE ------ //
const userInitialState = {
  userID: '',
  user: {},
  userFacebook: {},
  memlyCount: 0,
  isLoggedIn: false,
  error: '',
  likedMemlys: [],
  dislikedMemlys: [],
  userLocation: {
    lat: '',
    lng: '',
  },
  birthday: '',
};

// ------------ USER REDUCER -----------------//
export default function userReducer (state = userInitialState, action) {
  switch (action.type) {
   
  case 'USER_AUTH' :  
    return {
      ...state, 
      isLoggedIn: true,
    };

  case 'USER_UNAUTH' : 
    return {
      ...state,
      isLoggedIn: false,
      user: {},
      userID: '',
    };

  case 'TOGGLE_LOGIN' : 
    return {
      ...state,
      isLoggedIn: action.isLoggedIn,
    };

  case 'FETCHING_USER_INFO' : {
    return {
      ...state,
      isFetching: true,
    };
  }

  case 'FETCHING_USER_INFO_ERROR' : {
    return {
      ...state,
      isFetching: false, 
      error: action.error, 
    };
  }

  case 'FETCHING_USER_SUCCESS' : {
    if (action.user === null) {
      return {
        ...state,
        user: action.user,
        isFetching: false, 
        error: '',
      };
    } else {
      if (action.userID = state.userID) {
        return {
          ...state, 
          isFetching: false, 
          info: action.user,
        };
      }
    }
  }

  case 'UPDATE_USER_LOCATION' : {
    // action should have userLocation property in the form of {lat: '', lng: ''}
    return {
      ...state,
      userLocation: action.UserLocation,
    };
  }

  case 'UPDATE_USER_FACEBOOK' : {
    return {
      ...state,
      userFacebook: action.userFacebook,
    };
  }

  case 'UPDATE_USER_BIRTHDAY' : {
    return {
      ...state,
      birthday: action.birthday,
    };
  }

  case 'UPDATE_LIKED_MEMLYS' : {
    return {
      ...state,
      likedMemlys: [...state.likedMemlys, action.memlyId]
    };
  }

  case 'UPDATE_DISLIKED_MEMLYS' : {
    return {
      ...state,
      dislikedMemlys: [...state.likedMemlys, action.memlyId]
    };
  }

  case 'UPDATE_MEMLY_COUNT' : {
    return {
      ...state,
      memlyCount: action.memlyCount,
    };
  }

  case 'INCREASE_MEMLY_COUNT' : {
    return {
      ...state,
      memlyCount: state.memlyCount ++
    };
  }

  default : 
    return state;

  }
}