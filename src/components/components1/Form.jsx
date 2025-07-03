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

const Form = ({ name, setName, bio, setBio, techStack, setTechStack, github, setGithub, linkedin, setLinkedin, portfolio, setPortfolio }) => {
  const handleCheckboxChange = (tech) => {
    if (techStack.includes(tech)) {
      // remove it
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      // Add it
      setTechStack([...techStack, tech]);
    }
  };

  return (
    <form className="space-y-6">
      {/* Name Input */}
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bhumi Pandey"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* Bio Input */}
      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="e.g. Full Stack Developer"
          className="w-full px-4 py-2 border rounded"
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
    </form>
  );
};

export default Form;
