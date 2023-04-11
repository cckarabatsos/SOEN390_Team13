import React, { useSate, useEffect } from "react";
import NotificationComponentList from "../components/NotificationComponentList";
import JobSuggestions from "../components/JobSuggestions";
import "../styles/components/JobSuggestions.css";

export default function NotificationPage(props) {

    return (
        <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <NotificationComponentList style={{ marginTop: "15%" }} />
            <JobSuggestions style={{ marginTop: "15%" }} />
        </div>
    );
}