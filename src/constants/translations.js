const BASE_URL = import.meta.env.BASE_URL;

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      skills: 'Skills'
    },
    hero: {
      greeting: 'Hi there!',
      greetings: 'Hi, I am',
      name: 'Szymon Dobrodziej',
      role: 'Supply Chain Professional',
      title: 'Supply Chain Professional',
      description: 'Experienced in implementing DDMRP methodology and developing analytical solutions.',
      contact: "Let's Talk",
      projects: 'View Projects',
      scroll: 'Scroll down'
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know me better',
      description: [
        'I am a specialist in data analytics, business process optimization, and system automation, passionate about solving complex problems and turning them into simple, effective solutions.',
        'I combine technological expertise with a creative approach, delivering results that truly work.'
      ],
      specializations: [
        'DDMRP Implementation',
        'I create advanced reports and dashboards in Power BI to empower better business decisions.',
        'I implement API integrations to connect e-commerce, ERP, and CRM systems, eliminating manual processes.',
        'I optimize operational processes, saving companies time and resources.'
      ],
      stats: {
        experience: 'Years of experience',
        projects: 'Projects completed',
        clients: 'Satisfied clients',
        success: 'Success rate'
      },
      closing: "When I’m not creating analyses or optimizing processes, I’m exploring new technologies, diving into AI and automation solutions, or sharing my knowledge about technology with others."
    },
    skills: {
      title: 'Skills & Expertise',
      description: 'Technologies and methodologies I work with',
      categories: {
        frontend: {
          title: 'Frontend Development',
          items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
        },
        backend: {
          title: 'Backend & Analytics',
          items: ['Python', 'SQL', 'Power BI', 'DAX', 'Excel VBA']
        },
        tools: {
          title: 'Tools & Methodologies',
          items: ['DDMRP', 'Git', 'VS Code', 'Jira', 'Agile']
        },
        additional: {
          title: 'Additional Skills',
          items: ['Supply Chain Management', 'Process Optimization', 'Data Analysis', 'Project Management']
        }
      }
    },
    projects: {
      title: 'Projects',
      description: 'Check out my latest work',
      items: [
        {
          title: 'DDMRP Dashboard',
          description: 'Interactive Power BI dashboard for DDMRP implementation monitoring',
          details: [
            'Real-time inventory monitoring',
            'Buffer status visualization',
            'Automated alerts system'
          ],
          technologies: ['Power BI', 'DAX', 'SQL'],
          image: `${BASE_URL}ddmrp3.jpg`,
          fallbackImage: `${BASE_URL}box.jpg`
        },
        {
          title: 'Supply Chain Analytics Platform',
          description: 'End-to-end analytics solution for supply chain optimization',
          details: [
            'Demand forecasting',
            'Inventory optimization',
            'Performance metrics tracking'
          ],
          technologies: ['Python', 'SQL', 'Tableau'],
          image: `${BASE_URL}graphs.jpg`,
          fallbackImage: `${BASE_URL}box.jpg`
        },
        {
          title: 'Inventory Management System',
          description: 'Custom inventory management solution with DDMRP principles',
          details: [
            'Buffer level management',
            'Order generation',
            'Supplier integration'
          ],
          technologies: ['Excel VBA', 'Power Query', 'SQL'],
          image: `${BASE_URL}calculator-papers.jpg`,
          fallbackImage: `${BASE_URL}box.jpg`
        }
      ]
    },
    animation: {
      title: 'API Flow Animation',
      subtitle: 'Interactive API Request Flow',
      description: 'Visualizing the journey of an API request through the system',
      client: 'Client',
      server: 'Server',
      success: 'Success',
      pause: 'Pause',
      request: 'Request',
      response: 'Response',
      processing: 'Processing',
      currentRequest: 'Current Request',
      commonChallenges: 'Common Challenges',
      challenges: {
        soft_delete: 'Soft Delete Implementation',
        cascade_deletion: 'Cascade Deletion Process',
        data_validation: 'Data Validation',
        error_handling: 'Error Handling',
        version_control: 'Version Control',
        authorization: 'Authorization',
        rate_limiting: 'Rate Limiting',
        file_upload: 'File Upload',
        data_integrity: 'Data Integrity',
        recovery: 'Recovery',
        concurrency: 'Concurrency',
        caching: 'Caching',
        security_checks: 'Security Checks',
        partial_updates: 'Partial Updates',
        authentication: 'Authentication'
      },
      error: {
        title: 'Error Occurred',
        description: 'Something went wrong during the request',
        status: 'Error Status',
        details: 'Error Details',
        forceError: 'Force Error'
      },
      steps: {
        request: {
          title: 'Request',
          description: 'Client sends request to server'
        },
        validation: {
          title: 'Validation',
          description: 'Server validates the data'
        },
        processing: {
          title: 'Processing',
          description: 'Server processes validated request'
        },
        response: {
          title: 'Response',
          description: 'Server sends response'
        }
      }
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's work together",
      form: {
        title: 'Send a Message',
        name: 'Your Name',
        namePlaceholder: 'Enter your name',
        email: 'Email Address',
        emailPlaceholder: 'Enter your email',
        message: 'Message',
        messagePlaceholder: 'Write your message here...',
        send: 'Send Message',
        sending: 'Sending...',
        successMessage: 'Thank you! Your message has been sent successfully.',
        errorMessage: 'Sorry, there was an error sending your message. Please try again.'
      },
      social: {
        title: 'Connect With Me',
        description: 'Feel free to reach out through any of these platforms'
      },
      connect: {
        title: 'Connect With Me',
        description: 'Feel free to reach out through any of these platforms'
      },
      availability: {
        status: 'Available for new opportunities',
        response: 'Usually responds within 24 hours'
      }
    },
    etl: {
      title: 'ETL Pipeline',
      subtitle: 'Data Processing Workflow',
      description: 'Interactive visualization of Extract, Transform, Load process',
      extract: {
        title: 'Extract',
        description: 'Data extraction from multiple sources including databases, files, and APIs'
      },
      transform: {
        title: 'Transform',
        description: 'Data cleaning, validation, and transformation into desired format'
      },
      load: {
        title: 'Load',
        description: 'Loading processed data into target systems'
      }
    }
  },
  pl: {
    nav: {
      home: 'Start',
      about: 'O mnie',
      projects: 'Projekty',
      contact: 'Kontakt',
      skills: 'Umiejętności'
    },
    hero: {
      greeting: 'Cześć!',
      greetings: 'Cześć, jestem',
      name: 'Szymon Dobrodziej',
      role: 'Specjalista ds. IT',
      title: 'Specjalista ds. IT',
      description: 'Projektuję rozwiązania dostosowane do potrzeb firm, optymalizuję procesy, integruję systemy i wykorzystuję dane do podejmowania lepszych decyzji.',
      contact: 'Porozmawiajmy',
      projects: 'Zobacz Projekty',
      scroll: 'Przewiń w dół'
    },
    about: {
      title: 'O mnie',
      subtitle: 'Poznaj mnie lepiej',
      description: [
        'Jestem specjalistą ds. analityki danych, procesów biznesowych i automatyzacji systemów, z pasją do rozwiązywania skomplikowanych problemów i przekształcania ich w proste, skuteczne rozwiązania.',
        'Łączę technologiczną wiedzę z kreatywnym podejściem, co pozwala mi dostarczać rozwiązania, które naprawdę działają.'
      ],
      specializations: [
        'Wdrażanie DDMRP',
        'Integracje API, które łączą systemy e-commerce, ERP i CRM, eliminując ręczne procesy.',
        'Analityka Łańcucha Dostaw',
        'Tworzenie aplikacji webowych'
      ],
      stats: {
        experience: 'Lat doświadczenia',
        projects: 'Ukończonych projektów',
        clients: 'Zadowolonych klientów',
        success: 'Wskaźnik sukcesu'
      },
      closing: 'Kiedy nie tworzę analiz ani nie optymalizuję procesów, rozwijam się w nowych technologiach, eksploruję rozwiązania w AI i automatyzacji lub dzielę się swoją wiedzą na temat technologii z innymi.'
    },
    skills: {
      title: 'Umiejętności',
      description: 'Technologie i metodologie, z którymi pracuję',
      categories: {
        frontend: {
          title: 'Frontend Development',
          items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
        },
        backend: {
          title: 'Backend i Analityka',
          items: ['Python', 'SQL', 'Power BI', 'DAX', 'Excel VBA']
        },
        tools: {
          title: 'Narzędzia i Metodologie',
          items: ['DDMRP', 'Git', 'VS Code', 'Jira', 'Agile']
        },
        additional: {
          title: 'Dodatkowe Umiejętności',
          items: ['Zarządzanie Łańcuchem Dostaw', 'Optymalizacja Procesów', 'Analiza Danych', 'Zarządzanie Projektami']
        }
      }
    },
    projects: {
      title: 'Projekty',
      description: 'Zobacz moje ostatnie prace',
      items: [
        {
          title: 'Opracowanie DDMRP',
          description: 'Interaktywny dashboard Power BI do monitorowania zapasów w czasie rzeczywistym w procesie DDMRP',
          details: [
            'Monitoring zapasów w czasie rzeczywistym',
            'Wizualizacja statusu buforów',
            'Zautomatyzowany system alertów'
          ],
          technologies: ['Power BI', 'DAX', 'SQL'],
          image: `${BASE_URL}ddmrp3.jpg`,
          fallbackImage: `${BASE_URL}box.jpg`
        },
        {
          title: 'Aplikacja do kompletacji produktów z paczek e-commerce',
          description: 'Kompleksowe rozwiązanie maksymalizujące efektywności procesów sprzedażowych i optymalizujące zapasy',
          details: [
            'Optymalizacja wykorzystania komponentów',
            'Zwiększenie efektywności procesów sprzedażowych',
            'Uwolnienie zasobów'
          ],
          technologies: ['Python', 'SQL', 'Django', 'Next.js'],
          image: `${BASE_URL}graphs.jpg`,
          fallbackImage: `${BASE_URL}box.jpg`
        },
        {
          title: 'Analiza roczna',
          description: 'Kompleksowy system do analizy rocznej sprzedażowej, umożliwiający monitorowanie KPI, analizę trendów sprzedażowych i zachowań klientów.',
          details: [
            'Monitorowanie KPI',
            'Analiza trendów sprzedażowych',
            'Analiza zachowań klientów',
            'Analiza RFM',
            'Prognozowanie sprzeday za pomocą modeli Phrophet, ARIMA i SARIMA'
          ],
          technologies: ['Excel', 'Python', 'Pandas', 'SQL', 'Openpyxl', 'Seaborn', 'Matplotlib', 'Power BI', 'DAX'],
          image: `${BASE_URL}calculator-papers.jpg`,
          fallbackImage: `${BASE_URL}box.jpg`
        }
      ]
    },
    animation: {
      title: 'Animacja Przepływu API',
      subtitle: 'Interaktywny Przepływ Żądań API',
      description: 'Wizualizacja podróży żądania API przez system',
      client: 'Klient',
      server: 'Serwer',
      success: 'Sukces',
      pause: 'Pauza',
      request: 'Żądanie',
      response: 'Odpowiedź',
      processing: 'Przetwarzanie',
      currentRequest: 'Aktualne Żądanie',
      commonChallenges: 'Typowe Wyzwania',
      challenges: {
        soft_delete: 'Implementacja Miękkiego Usuwania',
        cascade_deletion: 'Proces Kaskadowego Usuwania',
        data_validation: 'Walidacja Danych',
        error_handling: 'Obsługa Błędów',
        version_control: 'Kontrola Wersji',
        authorization: 'Autoryzacja',
        rate_limiting: 'Limitowanie Żądań',
        file_upload: 'Przesyłanie plików',
        data_integrity: 'Integralność danych',
        recovery: 'Odzyskiwanie',
        concurrency: 'Współbieżność',
        caching: 'Buforowanie',
        security_checks: 'Kontrole bezpieczeństwa',
        partial_updates: 'Aktualizacje częściowe',
        authentication: 'Uwierzytelnianie'
      },
      error: {
        title: 'Wystąpił Błąd',
        description: 'Coś poszło nie tak podczas żądania',
        status: 'Status Błędu',
        details: 'Szczegóły Błędu',
        forceError: 'Wymuś Błąd'
      },
      steps: {
        request: {
          title: 'Żądanie',
          description: 'Klient wysyła żądanie do serwera'
        },
        validation: {
          title: 'Walidacja',
          description: 'Serwer sprawdza poprawność danych'
        },
        processing: {
          title: 'Przetwarzanie',
          description: 'Serwer przetwarza zwalidowane żądanie'
        },
        response: {
          title: 'Odpowiedź',
          description: 'Serwer wysyła odpowiedź'
        }
      }
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Pracujmy razem',
      form: {
        title: 'Wyślij Wiadomość',
        name: 'Twoje Imię',
        namePlaceholder: 'Wpisz swoje imię',
        email: 'Adres Email',
        emailPlaceholder: 'Wpisz swój email',
        message: 'Wiadomość',
        messagePlaceholder: 'Napisz swoją wiadomość...',
        send: 'Wyślij Wiadomość',
        sending: 'Wysyłanie...',
        successMessage: 'Dziękuję! Twoja wiadomość została wysłana pomyślnie.',
        errorMessage: 'Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.'
      },
      social: {
        title: 'Media Społecznościowe',
        description: 'Możesz się ze mną skontaktować przez dowolną z tych platform'
      },
      connect: {
        title: 'Połącz się ze mną',
        description: 'Możesz się ze mną skontaktować przez dowolną z tych platform'
      },
      availability: {
        status: 'Dostępny dla nowych możliwości',
        response: 'Zazwyczaj odpowiada w ciągu 24 godzin'
      }
    },
    etl: {
      title: 'Pipeline ETL',
      subtitle: 'Proces Przetwarzania Danych',
      description: 'Interaktywna wizualizacja procesu Extract, Transform, Load',
      extract: {
        title: 'Ekstrakcja',
        description: 'Pobieranie danych z wielu źródeł, w tym baz danych, plików i API'
      },
      transform: {
        title: 'Transformacja',
        description: 'Czyszczenie, walidacja i przekształcanie danych do pożądanego formatu'
      },
      load: {
        title: 'Ładowanie',
        description: 'Ładowanie przetworzonych danych do systemów docelowych'
      }
    }
  }
};
