import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SubFooter from "../components/SubFooter";
import JobPostingComponent from "../components/JobPostingComponent";
import SearchBar from "../components/SearchBar";


export default function JobSearch(){

    return(
<>
<NavBar />
<div>
<h2>Start your job searching journey here. Browse available jobs down below.</h2>
<SearchBar/>
<h1>Please search for your desired job.</h1>
</div>

<SubFooter/>
<Footer/>

          </>
    );

}