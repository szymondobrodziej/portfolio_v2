import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';

const ProjectCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = project.fallbackImage;
        }}
      />
    </div>
    <div className="p-6">
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {project.title}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {project.description}
      </p>
      <ul className="mb-4 space-y-2">
        {project.details.map((detail, index) => (
          <li
            key={index}
            className="flex items-start text-sm text-gray-600 dark:text-gray-400"
          >
            <span className="mr-2 text-primary-500">•</span>
            {detail}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const { t } = useLanguage();
  const projectsData = t('projects');

  if (!projectsData || !projectsData.items) {
    return null;
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container-padding mx-auto">
        <SectionHeading
          title={projectsData.title}
          subtitle={projectsData.description}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.items.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
