export const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      title: 'Full Stack Developer',
      subtitle: 'I build modern web applications with cutting-edge technologies',
      cta: 'View My Work',
    },
    about: {
      title: 'About Me',
      description: 'I\'m a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.',
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
          tech: ['React', 'Node.js', 'MongoDB'],
        },
        {
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates',
          tech: ['Next.js', 'Socket.io', 'PostgreSQL'],
        },
        {
          title: 'Weather Dashboard',
          description: 'A responsive weather application with interactive charts',
          tech: ['Vue.js', 'Chart.js', 'API Integration'],
        },
      ],
    },
    skills: {
      title: 'Skills',
      items: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'React', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'Node.js', level: 82 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
    },
    // Additional translations for enhanced components
    common: {
      viewAll: 'View All Projects',
      startProject: 'Start a Project',
      letsTalk: 'Let\'s Talk',
      learnMore: 'Learn More',
      readMore: 'Read More',
      seeMore: 'See More',
      getStarted: 'Get Started',
      download: 'Download',
      subscribe: 'Subscribe',
    },
    stats: {
      projectsCompleted: 'Projects Completed',
      yearsExperience: 'Years Experience',
      clientSatisfaction: 'Client Satisfaction',
      fastSupport: 'Fast Support',
    },
    buttons: {
      viewDemo: 'View Demo',
      sourceCode: 'Source Code',
      liveDemo: 'Live Demo',
      contactMe: 'Contact Me',
      sendMessage: 'Send Message',
      learnMore: 'Learn More',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عنّي',
      projects: 'المشاريع',
      skills: 'المهارات',
      contact: 'اتصل',
    },
    hero: {
      title: 'مطور Full Stack',
      subtitle: 'أبني تطبيقات ويب حديثة باستخدام أحدث التقنيات',
      cta: 'شاهد أعمالي',
    },
    about: {
      title: 'عنّي',
      description: 'أنا مطور شغوف بخبرة في تقنيات الويب الحديثة. أحب إنشاء تطبيقات فعالة وقابلة للتطوير وسهلة الاستخدام.',
    },
    projects: {
      title: 'المشاريع',
      items: [
        {
          title: 'منصة تجارة إلكترونية',
          description: 'حل تجارة إلكترونية كامل باستخدام React و Node.js و MongoDB',
          tech: ['React', 'Node.js', 'MongoDB'],
        },
        {
          title: 'تطبيق إدارة المهام',
          description: 'تطبيق تعاوني لإدارة المهام مع تحديثات في الوقت الفعلي',
          tech: ['Next.js', 'Socket.io', 'PostgreSQL'],
        },
        {
          title: 'لوحة تحكم الطقس',
          description: 'تطبيق طقس تفاعلي مع رسوم بيانية',
          tech: ['Vue.js', 'Chart.js', 'API Integration'],
        },
      ],
    },
    skills: {
      title: 'المهارات',
      items: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'React', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'Node.js', level: 82 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    contact: {
      title: 'تواصل معي',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      success: 'تم إرسال الرسالة بنجاح!',
      error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    },
    // ترجمات إضافية للمكونات المحسنة
    common: {
      viewAll: 'عرض جميع المشاريع',
      startProject: 'ابدأ مشروع',
      letsTalk: 'لنتحدث',
      learnMore: 'اعرف المزيد',
      readMore: 'اقرأ المزيد',
      seeMore: 'شاهد المزيد',
      getStarted: 'ابدأ الآن',
      download: 'تحميل',
      subscribe: 'اشترك',
    },
    stats: {
      projectsCompleted: 'مشروع مكتمل',
      yearsExperience: 'سنوات خبرة',
      clientSatisfaction: 'رضا العملاء',
      fastSupport: 'دعم سريع',
    },
    buttons: {
      viewDemo: 'عرض التجربة',
      sourceCode: 'الكود المصدري',
      liveDemo: 'تجربة حية',
      contactMe: 'اتصل بي',
      sendMessage: 'إرسال رسالة',
      learnMore: 'اعرف المزيد',
    }
  },
} as const
