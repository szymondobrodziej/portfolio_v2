import { useEffect } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  useEffect(() => {
    // Intersection Observer for fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.fade-up').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-16">{children}</main>
      <footer className="mt-20 bg-gray-50 py-8 dark:bg-gray-800">
        <div className="container-padding mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} szymon-dobrodziej. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
