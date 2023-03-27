import React, { useEffect, useState } from 'react';
import "../styles/components/JobSuggestions.css";
import { getJobSuggestions } from '../api/JobSuggestionsApi';

const JobSuggestions = (userID) => {
    const [showMore, setShowMore] = useState(false);
    const [jobSuggestions, setJobSuggestions] = useState([]);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        const fetchJobSuggestions = async () => {
            let suggestions = await getJobSuggestions(userID);
            setJobSuggestions(suggestions);
        };
        fetchJobSuggestions();
    }, [userID]);


    /*
        useEffect(() => {
            const data = JSON.parse(localStorage.getItem("isAuth"));
            if (data != null) {
                setUseData(JSON.parse(localStorage.getItem("isAuth")));
            } else {
                setUseData(false);
            }
    
            if (userData) {
                fetchJobSuggestions(userData.userID);
            }
        }, []);
    */
    /*
        const softwareDevJobs = [
            { title: 'Front-end Developer', company: 'ABC Inc.' },
            { title: 'Back-end Developer', company: 'XYZ Ltd.' },
            { title: 'Full-stack Developer', company: 'PQR Solutions' },
            { title: 'Mobile App Developer', company: 'MNO Corp.' },
        ];
    
        const handleShowMore = () => {
            setShowMore(!showMore);
        };
    */
    return (
        <div className="job-suggestions-container">
            <h2>Job suggestions for you</h2>
            {getJobSuggestions
                .slice(0, showMore ? getJobSuggestions.length : 2)
                .map((job, index) => (
                    <div key={index} className="job">
                        <p>{job.title}</p>
                        <p>{job.company}</p>
                    </div>
                ))}
            <button onClick={handleShowMore}>
                {showMore ? 'Show less' : 'Show more'}
            </button>
        </div>
    );
};

export default JobSuggestions;