import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProfiles, getProfileById, saveProfile } from "../../utils/profileStorage";

// src/components/Form.jsx
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
  setProfileImage,
  savedProfiles,
  setSavedProfiles,
}) => {
  const handleCheckboxChange = (tech) => {
    if (techStack.includes(tech)) {
      // remove it
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      // Add it
      setTechStack([...techStack, tech]);
    }
  };

  const [error, setError] = useState("");
  const handleSave = () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (github && !github.startsWith("https://")) {
      setError("GitHub link must start with https://");
      return;
    }

    setError(""); // Clear error
    alert("Profile saved successfully!"); // Replace with actual save logic
  };

  const navigate = useNavigate();

  const handleSaveProfile = () => {
    const profileName = prompt("Enter a name for this profile:");
    if (!profileName) return;
  
    const profileData = {
      name,
      bio,
      github,
      linkedin,
      portfolio,
    };
  
    saveProfile(profileName, profileData);
    alert("✅ Profile Saved Successfully!");
  };
  
  const handleSelectProfile = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
  
    const selectedProfile = getProfileById(selectedId);
    if (!selectedProfile) return;
  
    const {
      name: savedName,
      bio: savedBio,
      github: savedGithub,
      linkedin: savedLinkedin,
      portfolio: savedPortfolio,
    } = selectedProfile.data;
  
    // Set the form states
    setName(savedName || "");
    setBio(savedBio || "");
    setGithub(savedGithub || "");
    setLinkedin(savedLinkedin || "");
    setPortfolio(savedPortfolio || "");
  };
  
  

  return (
    
    <form
      className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent actual refresh
        handleSave();
      }}
    >
      <div className="mb-4">
  <label className="block font-medium mb-1">Load Saved Profile</label>
  <select
    onChange={handleSelectProfile}
    className="w-full px-3 py-2 border rounded bg-white text-black"
    defaultValue=""
  >
    <option value="" disabled>-- Select a Profile --</option>
    {savedProfiles.map((profile) => (
      <option key={profile.id} value={profile.id}>
        {profile.name}
      </option>
    ))}
  </select>
</div>


      {/* Name Input */}
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bhumi Pandey"
          className="w-full px-4 py-2 text-sm sm:text-base border rounded"
        />
      </div>

      {/* Bio Input */}
      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="e.g. Full Stack Developer"
          className="w-full px-4 py-2 text-sm sm:text-base border rounded"
        />
      </div>

      {/* Tech Stack Selection */}
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

      {/* Developer Links Section */}
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        disabled={!name.trim()}
      >
        Save
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </button>

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
                setProfileImage(reader.result); // set base64 URL
              };
              reader.readAsDataURL(file);
            }
          }}
          className="block w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-all"
        >
          View My Public Profile
        </button>

        <button
          type="button"
          onClick={handleSaveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-all"
        >
          Save Profile
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("devconnect_profile");
            window.location.reload();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-all"
        >
          Clear Profile
        </button>
      </div>
    </form>
  );
};

export default Form;
