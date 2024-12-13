import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import { experiences } from '../constants';

const ProjectCard = ({ project, index }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 450,
        }}
        className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex space-x-4">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-primary-500 hover:text-white"
              >
                {t('experience.liveDemo')}
              </a>
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-primary-500 hover:text-white"
              >
                {t('experience.sourceCode')}
              </a>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600 dark:bg-gray-700 dark:text-primary-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const timelineItems = t('experience.items');

  return (
    <section id="experience" className="section-padding">
      <div className="container-padding mx-auto">
        <SectionHeading
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {t('experience.timelineTitle')}
          </h3>
          <div className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />

            {/* Timeline items */}
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'left-timeline' : 'right-timeline'
                }`}
              >
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="h-4 w-4 rounded-full bg-primary-500" />
                  </div>

                  {/* Content */}
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'
                    }`}
                  >
                    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                      <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600 dark:bg-gray-700 dark:text-primary-400">
                        {item.year}
                      </span>
                      <h4 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                        {item.role}
                      </h4>
                      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.company}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
