import { useEffect, useState } from "react";
import ProfileCard from "../components/components1/ProfileCard";

const Profile = ()=> {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("devconnect_profile");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
  }, []);

  if (!profileData) {
    return <p className="text-center text-gray-500 mt-10">No profile found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ProfileCard {...profileData} />
    </div>
  );
}

export default Profile;