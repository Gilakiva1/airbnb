const initialState = {
    assets: [],
};

export function hostReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_ASSETS':
            return { ...state, assets: action.assets }

        default: return { ...state }
    }

}