import "./App.css";
import { Button } from "@/components/ui/button";
import Header from "./components/components1/Header";
import Footer from "./components/components1/Footer";
import Form from "./components/components1/Form";
import ProfileCard from "./components/components1/ProfileCard";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-zinc-800">
      <Header />

      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">
              Your Info
            </h2>
            <Form
              name={name}
              setName={setName}
              bio={bio}
              setBio={setBio}
              techStack={techStack}
              setTechStack={setTechStack}
              github={github}
              setGithub={setGithub}
              linkedin={linkedin}
              setLinkedin={setLinkedin}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">
              Live Preview
            </h2>
            <ProfileCard
              name={name}
              bio={bio}
              techStack={techStack}
              github={github}
              linkedin={linkedin}
              portfolio={portfolio}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
