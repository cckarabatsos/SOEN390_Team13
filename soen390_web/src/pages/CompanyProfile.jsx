import React from "react";
import "../styles/components/FileItem.css";
import CompanyHeader from "../components/CompanyHeader";
import CompanyDescription from "../components/CompanyDescription";
import CompanyApplicationList from "../components/CompanyApplicationList";
import CompanyJobPostings from "../components/CompanyJobPostings";


export default function CompanyProfilePage(props){

    return(
        <div style={{minHeight:"90vh"}}>
             <CompanyHeader></CompanyHeader>
        <CompanyDescription></CompanyDescription>
        <CompanyJobPostings></CompanyJobPostings>
        <CompanyApplicationList></CompanyApplicationList>
        </div>
       
    )
}