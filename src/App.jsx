import Layout from './components/Layout';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Projects from './sections/Projects';
import ScrollProgress from './components/ScrollProgress';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/globals.css';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ThemeProvider>
        <LanguageProvider>
          <Layout>
            <ScrollProgress />
            <main className="pt-16">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
          </Layout>
        </LanguageProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
