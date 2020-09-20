import React, {useEffect} from 'react';
import Logout from "./Logout";
import store from "../../storage/store";

function HomePage() {
    useEffect(() => {
        // fetch("/auth/check" + "?token=" + store.getState().token)
        //     .then(response => response.text()
        //         .then((text => {
        //                     if (text !== 'true') {
        //                         localStorage.clear()
        //                         store.dispatch({type: "CHANGE_TOKEN", value: null})
        //                         window.location.reload();
        //                     }
        //                 }
        //             )
        //         )
        //     )
    }, [])
    return (
        <div>
            <Logout/>
        </div>
    );
}

export default HomePage;