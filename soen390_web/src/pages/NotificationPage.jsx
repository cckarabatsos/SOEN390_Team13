import React,{useSate, useEffect} from "react";
import NotificationComponentList from "../components/NotificationComponentList";

export default function NotificationPage(props) {

    return(

        <div style={{minHeight:"80vh"}}>
            <NotificationComponentList></NotificationComponentList>
        </div>
    )
}