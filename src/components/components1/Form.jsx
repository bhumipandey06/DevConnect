import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProfileById,
  getAllProfiles,
  getProfileById,
  saveProfile,
} from "../../utils/profileStorage";

// Tech stack options
const techOptions = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind Css",
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "Java",
  "C++",
  "Others",
];

const Form = ({
  name,
  setName,
  bio,
  setBio,
  techStack,
  setTechStack,
  github,
  setGithub,
  linkedin,
  setLinkedin,
  portfolio,
  setPortfolio,
  profileImage,
  setProfileImage,
  savedProfiles,
  setSavedProfiles,
  selectedProfileId,
  setSelectedProfileId,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (tech) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  // ✅ Save new profile
  const handleSaveProfile = () => {
    // validation

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (github && !github.startsWith("https://")) {
      setError("GitHub link must start with https://");
      return;
    }
  
    setError("");//clear previous error

    const profileName = prompt("Enter a name for this profile:");
    if (!profileName) return;

    const profileData = {
      name,
      bio,
      github,
      linkedin,
      portfolio,
      techStack,
      profileImage,
    };

    saveProfile(profileName, profileData);
    const updated = getAllProfiles();
  setSavedProfiles(updated); // Refresh list

  alert("✅ Profile Saved Successfully!");
  };

  // ✅ Unified load + select logic
  const handleSelectProfile = (e) => {
    const selectedId = e.target.value;
    setSelectedProfileId(selectedId);

    const selectedProfile = getProfileById(selectedId);
    if (!selectedProfile) return;

    const {
      name: savedName,
      bio: savedBio,
      github: savedGithub,
      linkedin: savedLinkedin,
      portfolio: savedPortfolio,
      techStack: savedTechStack,
      profileImage: savedProfileImage,
    } = selectedProfile.data;

    setName(savedName || "");
    setBio(savedBio || "");
    setGithub(savedGithub || "");
    setLinkedin(savedLinkedin || "");
    setPortfolio(savedPortfolio || "");
    setTechStack(savedTechStack || []);
    setProfileImage(savedProfileImage || null);
  };

  // ✅ Delete selected profile
  const handleDeleteProfile = () => {
    if (!selectedProfileId) return;

    const confirmDelete = confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    deleteProfileById(selectedProfileId);
    const updatedProfiles = getAllProfiles();
    setSavedProfiles(updatedProfiles);
    setSelectedProfileId("");

    // Optional: Clear form
    setName("");
    setBio("");
    setGithub("");
    setLinkedin("");
    setPortfolio("");
    setTechStack([]);
    setProfileImage(null);

    alert("🗑️ Profile deleted successfully!");
  };

  return (
    <form
      className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* 🔹 Profile Selector + Delete */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Saved Profile</label>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <select
            onChange={handleSelectProfile}
            className="w-full sm:w-2/3 px-3 py-2 border rounded bg-white text-black"
            value={selectedProfileId}
          >
            <option value="" disabled>-- Select a Profile --</option>
            {savedProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleDeleteProfile}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
            disabled={!selectedProfileId}
          >
            Delete
          </button>
        </div>
      </div>

      {/* 🔹 Name Input */}
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bhumi Pandey"
          className="w-full px-4 py-2 text-sm border rounded"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* 🔹 Bio Input */}
      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="e.g. Full Stack Developer"
          className="w-full px-4 py-2 text-sm border rounded"
        />
      </div>

      {/* 🔹 Tech Stack */}
      <div>
        <label className="block mb-1 font-medium">Tech Stack</label>
        <div className="flex flex-wrap gap-4">
          {techOptions.map((tech) => (
            <label key={tech} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techStack.includes(tech)}
                onChange={() => handleCheckboxChange(tech)}
              />
              <span>{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 🔹 Links */}
      <div>
        <label className="block mb-1 font-medium">GitHub Link</label>
        <input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">LinkedIn Link</label>
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Portfolio Link</label>
        <input
          type="url"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          placeholder="https://yourportfolio.com"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* 🔹 Upload Profile Picture */}
      <div>
        <label className="block mb-1 font-medium">Upload Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setProfileImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="block w-full"
        />
      </div>

      {/* 🔹 Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          View My Public Profile
        </button>

        <button
          type="button"
          onClick={handleSaveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Save Profile
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("devconnect_profile");
            window.location.reload();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
        >
          Clear Profile
        </button>
      </div>
    </form>
  );
};

export default Form;
