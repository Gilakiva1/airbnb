const initialState = {
    assets: [],
};

export function hostReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_ASSETS':
            return { ...state, assets: action.assets }
        case 'ADD_ASSET':
            console.log('action.saveAsset', action.asset);
            return { ...state, assets: [action.asset, ...state.asset] }
        default: return { ...state }
    }

}