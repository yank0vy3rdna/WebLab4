import {createStore} from 'redux';
import initialState from "./initialState";

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_TOKEN":
            localStorage.setItem("token", action.value)
            return {token: action.value};
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);

function checkAuth() {
    console.log(store.getState())
    fetch("/auth/check" + "?token=" + store.getState().token)
        .then(response => response.text()
            .then((text => {
                        if (text !== 'true') {
                            store.dispatch({type: "CHANGE_TOKEN", value: {token: null}})
                            localStorage.clear()
                        }
                    }
                )
            )
        )
}

store.subscribe(checkAuth)

export default store;