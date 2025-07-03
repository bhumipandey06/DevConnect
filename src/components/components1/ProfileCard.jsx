// src/components/ProfileCard.jsx
import { Github, Linkedin, Globe } from "lucide-react";

const ProfileCard = ({ name, bio, techStack, github, linkedin, portfolio}) => {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 shadow-md rounded-lg">
      {name && (
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">
          {name}
        </h2>
      )}
      {bio && <p className="mt-2 text-gray-600 dark:text-gray-300">{bio}</p>}

      {techStack.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-zinc-800 dark:text-white mb-1">
            Tech Stack:
          </h3>
          <ul className="flex flex-wrap gap-2 text-sm text-white">
            {techStack.map((tech) => (
              <li key={tech} className="bg-blue-600 px-3 py-1 rounded-full">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links Section */}
      <div className="flex gap-4 items-center">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <Github className="text-zinc-700 dark:text-white hover:text-blue-600" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Linkedin className="text-zinc-700 dark:text-white hover:text-blue-600" />
          </a>
        )}
        {portfolio && (
          <a href={portfolio} target="_blank" rel="noopener noreferrer" title="Portfolio">
            <Globe className="text-zinc-700 dark:text-white hover:text-blue-600" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
