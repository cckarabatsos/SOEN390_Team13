import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserSearchBar from "../components/UserSearchBar";
import UserSearchComponent from "../components/UserSearchComponent";
import "../styles/pages/SearchPage.css";
import "../styles/components/UserSearch.css";

export default function UserSearch() {
  // define state variables with useState hook
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const [usersDisplay, setUsersDisplay] = useState([]);

  // useEffect to create usersDisplay array whenever users array changes
  useEffect(() => {
    setUsersDisplay(users);
  }, [users]);

  // render JobSearch component
  // map over usersDisplay array and render JobPostingComponent for each job

  return (
    <div>
      <div data-testid="job-posting">
        <div className="userSearchingText">
          <p>{t("FindUsersLabel")}</p>
        </div>
        <div className="desiredUserText">
          <p>{t("DesiredUsers")}</p>
        </div>
        <UserSearchBar setUsers={setUsers} />
        {usersDisplay.length == 0 &&
          <div className="noUsersFound">No users found</div>
        }
        {usersDisplay.map((user) => (
          <UserSearchComponent
            key={user.userID}
            id={user.userID}
            name={user.name}
            email={user.email}
            position={user.currentPosition}
            company={user.currentCompany}
            contact={user.contacts}
            image={user.picture}
          ></UserSearchComponent>
        ))}
      </div>
    </div>
  );
}