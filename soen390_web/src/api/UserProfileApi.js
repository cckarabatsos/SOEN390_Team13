import axios from "axios";
import api from "../config.json";

export async function addExperience(
  userID,
  atPresent,
  startDate,
  endDate,
  company,
  position,
  type
) {
  try {
    const response = await axios
      .post(api.BACKEND_API + "/experience/" + userID, {
        atPresent: atPresent,
        startDate: startDate,
        endDate: endDate,
        company: company,
        position: position,
        type: type,
      })
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getExperience(userID, type) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/experience/get/" + userID + "?type=" + type
    );
    if (response.status === 200) {
      const data = await response.data; // wait for the data to resolve
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function findUserById(userID) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/id/" + userID);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}


export async function removeExperience(experienceID) {
  try {
    const response = await axios.post(
      api.BACKEND_API + "/experience/remove/" + experienceID
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getSkills(userID) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/skill/get/" + userID,
      {}
    );
    if (response.status === 200) {
      const data = response.data; // wait for the data to

      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return []; // re-throw any caught errors for the calling function to handle
  }
}

export async function addSkill(userID, skill) {
  try {
    const response = await axios.post(api.BACKEND_API + "/skill/" + userID, {
      name: skill,
    });
    if (response.status === 200) {
      // wait for the data to
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function removeSkill(skillId) {
  try {
    
    const response = await axios.post(
      api.BACKEND_API + "/skill/remove/" + skillId
    );
    if (response.status === 200) {
      // wait for the data to
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false; 
  }
}


export async function updateUserDescription(user,newDescription) {
  try {
    console.log({
      user
    })
    const response = await axios.post(
      api.BACKEND_API + "/user/edit/" + user.email,
      {
        name: user.name,
        password: user.password,
        email: user.email,
        privateKey: user.privateKey,
        publicKey: user.publicKey,
        picture: user.picture,
        resume: user.resume,
        coverLetter: user.coverLetter,
        bio: newDescription,
        currentPosition: user.currentPosition,
        currentCompany: user.concordiaUniversity,
        isCompany: user.isCompany,
      }
    );
    if (response.status === 200) {
      // wait for the data to
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}


export async function updateUserProfilePicture(user,newProfile,newName) {
  try {
    console.log({
      user
    })
    var img;
    if(newProfile||newProfile!=null ){
      img=newProfile

    }
    else{
      console.log("hello")
      
      img=user.picture
    }
    const response = await axios.post(
      api.BACKEND_API + "/user/edit/" + user.email,
      {
        name: newName,
        password: user.password,
        email: user.email,
        privateKey: user.privateKey,
        publicKey: user.publicKey,
        picture: img,
        resume: user.resume,
        coverLetter: user.coverLetter,
        bio: user.bio,
        currentPosition: user.currentPosition,
        currentCompany: user.concordiaUniversity,
        isCompany: user.isCompany,
      }
    );
    if (response.status === 200) {
      // wait for the data to
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function uploadPicture(userID, picture, setIsPictureChanged){
  // upload file
  const formData = new FormData();
  formData.append("file", picture);
  console.log(picture);
  // calling the backend
  try {
    const response = await axios
      .post(
        `${api.BACKEND_API}/user/uploadAccountFile/${userID}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          params: {
            type: "picture",
          },
        }
      )
      .then((res) => {
        return res.data;
      });
    console.log(response);
    if (response === 200) {
      setIsPictureChanged(true);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    
  }
}
