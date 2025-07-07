// src/utils/profileStorage.js

const STORAGE_KEY = "devconnect_profiles";

// 🔹 Get all profiles
export function getAllProfiles() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// 🔹 Save new profile
export function saveProfile(name, data) {
  const profiles = getAllProfiles();
  const newProfile = {
    id: Date.now().toString(), // Unique ID using timestamp
    name,
    data,
  };
  profiles.push(newProfile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  return newProfile;
}

// 🔹 Get profile by ID
export function getProfileById(id) {
  const profiles = getAllProfiles();
  return profiles.find((p) => p.id === id);
}
