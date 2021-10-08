const initialState = {
    assets: [],
};

export function hostReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_ASSETS':
            return { ...state, assets: action.assets }
        case 'ADD_ASSET':
<<<<<<< HEAD
            console.log('action.saveAsset',action.asset);
            return { ...state, assets: [...state.assets, action.saveAsset] }
=======
            console.log('action.saveAsset', action.asset);
            return { ...state, assets: [...state.assets, action.asset] }
>>>>>>> faa9905b3ae2b992ca29f6899a584f833d920db0
        default: return { ...state }
    }

}