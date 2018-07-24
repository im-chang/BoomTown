const RESET_IMAGE = 'RESET_IMAGE';
const UPDATE_NEW_ITEM = 'UPDATE_NEW_ITEM';
const RESET_NEW_ITEM = 'RESET_NEW_ITEM';

export const resetImage = () => ({
    type: RESET_IMAGE
  });

export const updateNewItem = (item) => ({
    type: UPDATE_NEW_ITEM,
    payload: item
  });

export const resetNewItem = () => ({
    type: RESET_NEW_ITEM
  });

const initialState = {
    title: 'New Item',
    description: 'Describe your item',
    tags: [],
    imageUrl: 'https://dummyimage.com/350x250/0825ff/ffffff&text=Select+Your+Image',
    created: new Date(),
    itemowner: {}
};

export default (state = initialState, action) => {
    switch(action.type){
        case RESET_IMAGE: {
            return { ...state, imageUrl: initialState.imageUrl};
        }
        case UPDATE_NEW_ITEM: {
            return { ...state, ...action.payload};
        }
        case RESET_NEW_ITEM: {
            return { ...initialState};
        }
        default: {
            return state;
        }
    }
}

