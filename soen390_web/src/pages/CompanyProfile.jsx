import React,{useEffect,useState} from "react";
import "../styles/components/FileItem.css";
import CompanyHeader from "../components/CompanyHeader";
import CompanyDescription from "../components/CompanyDescription";
import CompanyApplicationList from "../components/CompanyApplicationList";
import CompanyJobPostings from "../components/CompanyJobPostings";
import "../styles/pages/CompanyProfilePage.css";
import { useLocation } from "react-router-dom";
import { findUserById } from "../api/UserProfileApi";

export default function CompanyProfilePage(props) {
  const { state } = useLocation();

  // might have to passs the whole user object as state easier!!
  const { picture, name, description, isFollowing, companyId } = state; // Read values passed on state
  const [ userData, setUserData] = useState({})

  const [companyData, setCompanyData]=useState({})

  const [isFollowingState, setIsFollowingState]=useState(isFollowing)

  const getCompanyProfile= async (companyId,userId)=>{
    let company = await findUserById(companyId)
    if(company.data){

      setCompanyData(company.data)
      if(userData && company.data.followers.includes(userId)){
        setIsFollowingState(true)
      }
      else{
        setIsFollowingState(false)
      }

    }
  }

  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUserData(JSON.parse(localStorage.getItem("isAuth")));
      getCompanyProfile(companyId,data.userID)

     
    } else {
      setUserData(false);
    }

  }, [isFollowingState]);


  return (
    <div className="CompanyProfileContainer">
      <CompanyHeader name={companyData.name?companyData.name:name} picture={companyData.picture?companyData.picture:picture} userId={userData.userID} companyId={companyId} isFollowing={isFollowingState} setIsFollowing={setIsFollowingState} userData={userData}></CompanyHeader>

      <CompanyDescription description={description}></CompanyDescription>

      <CompanyJobPostings></CompanyJobPostings>
      
      <CompanyApplicationList></CompanyApplicationList>
    </div>
  );
}
