import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';

const About = () => {
  const { t } = useLanguage();
  const baseUrl = import.meta.env.BASE_URL;

  const stats = [
    { number: '5+', label: t('about.stats.experience') },
    { number: '50+', label: t('about.stats.projects') },
    { number: '30+', label: t('about.stats.clients') },
    { number: '99%', label: t('about.stats.success') },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-padding mx-auto">
        <SectionHeading
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-md"
          >
            <div className="aspect-square overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
              <img
                src={`${baseUrl}Szymon_Dobrodziej.jpg`}
                alt="Szymon"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -z-10 h-full w-full">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900/20" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-secondary-100 dark:bg-secondary-900/20" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-gray-600 dark:text-gray-400"
          >
            {t('about.description').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <ul className="ml-6 list-disc space-y-2">
              {t('about.specializations').map((specialization, index) => (
                <li key={index}>{specialization}</li>
              ))}
            </ul>
            <p>{t('about.closing')}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="gradient-text text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
