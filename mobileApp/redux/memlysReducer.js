// ------ ACTIONS FOR MEMLYS REDUCER --------- //

export function updateMemlys(memlys) {
  return {
    type: 'UPDATE_MEMLYS',
    memlys,
  };
}

export function addMemly(memly) {
  return {
    type: 'ADD_MEMLY',
    memly,
  };
}

export function addToMemlyIdStorage(memlyId) {
  return {
    type: 'ADD_TO_MEMLY_ID_STORAGE',
    memlyId,
  };
}


// ---- INITIAL STATE FOR MEMLYS REDUCER ----- //

const memlysInitialState = {
  memlys: [
    {
      location: {
        latitude: 37.7836966,
        longitude: -122.4089664
      },
      user: {
        name: 'Mike Wong',
        avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
      },
      place: 'Hack Reactor',
      comment: 'Hey guys!',
      key: 'Hack Reactor',
      defaultAnimation: 2,
      showInfo: false,
      media: {
        url: '../../images/test-assets/hackreactor.jpg',
        timestamp: new Date()
      }
    },
    {
      location: {
        latitude: 51.507351,
        longitude: -0.155758
      },
      user: {
        name: 'Mike Wong',
        avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
      },
      place: 'Hack Reactor',
      comment: 'Hey guys!',
      // username: 'Michael Wong',
      // userAvatar: '../../images/test-assets/userAvatar.jpg',
      key: 'timestamp1',
      defaultAnimation: 2,
      showInfo: false,
      media: {
        url: '../../images/test-assets/shutterstock_276995975.jpg',
        timestamp: new Date()
      }
    },
    {
      location: {
        latitude: 53.507351,
        longitude: -0.125758
      },
      user: {
        name: 'Mike Wong',
        avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
      },
      place: 'Hack Reactor',
      comment: 'Hey guys!',
      // username: 'Michael Wong',
      // userAvatar: '../../images/test-assets/userAvatar.jpg',
      key: 'timestamp1',
      defaultAnimation: 2,
      showInfo: false,
      media: {
        url: '../../images/test-assets/shutterstock_276995975.jpg',
        timestamp: new Date()
      }
    },
    {
      location: {
        latitude: 51.507351,
        longitude: -0.12958
      },
      user: {
        name: 'Mike Wong',
        avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
      },
      place: 'Hack Reactor',
      comment: 'Hey guys!',
      key: 'timestamp2',
      defaultAnimation: 2,
      showInfo: false,
      media: {
        url: '../../images/test-assets/M9071-PARENT-2.jpg',
        timestamp: new Date()
      }
    },
    {
      location: {
        latitude: 51.509351,
        longitude: -0.15958
      },
      user: {
        name: 'Mike Wong',
        avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
      },
      place: 'Hack Reactor',
      comment: 'Hey guys!',
      key: 'timestamp3',
      defaultAnimation: 2,
      showInfo: false,
      media: {
        url: '../../images/test-assets/15759420184_f34af1b4a8.jpg',
        timestamp: new Date()
      }
    },
    {
      location: {
        latitude: 51.506351,
        longitude: -0.12958
      },
      user: {
        name: 'Mike Wong',
        avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
      },
      place: 'Hack Reactor',
      comment: 'Hey guys!',
      key: 'timestamp4',
      defaultAnimation: 2,
      showInfo: false,
      media: {
        url: '../../images/test-assets/londonstreet.jpeg',
        timestamp: new Date()
      }
    }
  ],
  memlyIdStorage: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  }
};


//ideal memlys structure...

// { memlyID: {memly info},
//   memly2ID: {memly info} }... and so on
// this way we could use Object.assign({}, oldLocationMemlys, newLocationMemlys)
// to overwrite duplicates. we could use this to keep storage in check as well

// ------------------ MEMLY REDUCER ----------------------- //



export default function memlysReducer(state = memlysInitialState, action) {
  switch (action.type) {

    case 'ADD_MEMLY':
      {
        return {
          ...state,
          memlyIdStorage: {
            ...state.memlyIdStorage,
            [action.memly['_id']]: true, // DO SOMETHING WITH THISSSS
          },
          memlys: [action.memly, ...state.memlys, ]
        }
      }
      // case 'ADD_MEMLY' : {
      //   return {
      //     ...state,
      //     memlys: [action.memly, ...state.memlys],
      //   }
      // }


  default : return state;

  }
}
