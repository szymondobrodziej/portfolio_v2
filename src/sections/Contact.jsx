import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import { socialLinks } from '../constants';
import emailjs from '@emailjs/browser';

const InputField = ({ icon, type, name, value, onChange, placeholder, disabled }) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span className="material-icons-outlined text-gray-500" aria-hidden="true">{icon}</span>
    </div>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
        className="block w-full resize-none rounded-lg bg-gray-800 pl-10 pr-4 py-3 text-gray-300 placeholder-gray-500 ring-1 ring-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 transition-all"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="block w-full rounded-lg bg-gray-800 pl-10 pr-4 py-3 text-gray-300 placeholder-gray-500 ring-1 ring-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 transition-all"
      />
    )}
  </div>
);

const SocialLink = ({ link, index }) => (
  <motion.a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group flex items-center space-x-3 rounded-lg bg-gray-800 p-4 ring-1 ring-gray-700 hover:ring-primary-500 transition-all"
  >
    <span className={`material-icons-outlined ${link.color} group-hover:text-primary-500 transition-colors`} aria-hidden="true">
      {link.icon}
    </span>
    <span className="text-gray-300 group-hover:text-primary-500 transition-colors">{link.name}</span>
  </motion.a>
);

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus({
          type: 'success',
          message: t('contact.form.successMessage')
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        type: 'error',
        message: t('contact.form.errorMessage')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-gray-900">
      <div className="container-padding mx-auto">
        <SectionHeading
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 rounded-xl bg-gray-900 p-6 ring-1 ring-gray-800"
            >
              <div className="flex items-center space-x-2 text-gray-300">
                <span className="material-icons-outlined text-primary-500" aria-hidden="true">mail</span>
                <h3 className="text-xl font-bold">{t('contact.form.title')}</h3>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    {t('contact.form.name')}
                  </label>
                  <InputField
                    icon="person_outline"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    {t('contact.form.email')}
                  </label>
                  <InputField
                    icon="mail_outline"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    {t('contact.form.message')}
                  </label>
                  <InputField
                    icon="chat_bubble_outline"
                    type="textarea"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-primary-500 p-4 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <span className="material-icons-outlined animate-spin" aria-hidden="true">refresh</span>
                        <span>{t('contact.form.sending')}</span>
                      </>
                    ) : (
                      <>
                        <span className="material-icons-outlined" aria-hidden="true">send</span>
                        <span>{t('contact.form.send')}</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-gray-300">
                <span className="material-icons-outlined text-primary-500" aria-hidden="true">share</span>
                <h3 className="text-xl font-bold">{t('contact.social.title')}</h3>
              </div>

              <div className="grid gap-4">
                {socialLinks.map((link, index) => (
                  <SocialLink key={link.name} link={link} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
