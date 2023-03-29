import React, { useEffect, useState } from 'react';
import "../styles/components/JobSuggestions.css";
import { getJobSuggestions } from '../api/JobSuggestionsApi';
import { useTranslation } from "react-i18next";

const JobSuggestions = (userID, props) => {
    const [showMore, setShowMore] = useState(false);
    const [jobSuggestions, setJobSuggestions] = useState([]);
    const { t } = useTranslation();

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        const fetchJobSuggestions = async () => {
            const data = JSON.parse(localStorage.getItem("isAuth"));
            if (data != null) {
                const suggestions = await getJobSuggestions(data.userID);
                setJobSuggestions(suggestions);

            }
        };
        fetchJobSuggestions();
    }, []);




    return (
        <div className="job-suggestions-container">
            <h2>{t("JobSuggestions")}</h2>
            {jobSuggestions.length === 0 ? (
                <p>{t("AddSkills")}</p>
            ) : (
                <>
                    {jobSuggestions
                        .map((job, index) => (
                            <div key={index} className="job">
                                <div className="logoContainer">
                                    <img src={job.logo} alt="logo" className="logoCompany"></img>
                                </div>
                                <div className="job-details">
                                    <p>{job.position}</p>
                                    <p>{job.company}</p>
                                    <p className="location">{job.location}</p>
                                </div>
                            </div>
                        ))}
                    {/* <button onClick={handleShowMore} className="show-more-button">
                        {showMore ? 'Show less' : 'Show more'}
                    </button> */}
                </>
            )}
        </div>
    );
};

export default JobSuggestions;