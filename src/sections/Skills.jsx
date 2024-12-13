import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';

const SkillCategory = ({ title, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
  >
    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
        >
          {item}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const { t } = useLanguage();
  const categories = t('skills.categories');

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-padding mx-auto">
        <SectionHeading
          title={t('skills.title')}
          subtitle={t('skills.description')}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <SkillCategory
            title={categories.frontend.title}
            items={categories.frontend.items}
          />
          <SkillCategory
            title={categories.backend.title}
            items={categories.backend.items}
          />
          <SkillCategory
            title={categories.tools.title}
            items={categories.tools.items}
          />
          <SkillCategory
            title={categories.additional.title}
            items={categories.additional.items}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
