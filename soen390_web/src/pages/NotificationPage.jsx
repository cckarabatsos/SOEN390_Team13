import React, { useSate, useEffect } from "react";
import NotificationComponentList from "../components/NotificationComponentList";
import JobSuggestions from "../components/JobSuggestions";
import "../styles/components/JobSuggestions.css";

export default function NotificationPage(props) {

    return (

        <div style={{ minHeight: "80vh" }}>
            <NotificationComponentList></NotificationComponentList>
            <div style={{ float: 'right' }}>
                <JobSuggestions />
            </div>
        </div>
    )
}