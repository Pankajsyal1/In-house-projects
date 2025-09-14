import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function About() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('markdownprox_theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('markdownprox_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const teamMembers = [
    {
      name: 'Pankaj',
      role: 'Founder & Lead Developer',
      description: 'Full-stack developer with 5+ years of experience in web technologies.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      description: 'Creative designer focused on user experience and modern interfaces.',
      avatar: '👩‍🎨'
    },
    {
      name: 'Mike Johnson',
      role: 'Product Manager',
      description: 'Product strategist with expertise in developer tools and workflows.',
      avatar: '👔'
    }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Lightning-fast editing with optimized rendering and minimal resource usage.'
    },
    {
      icon: '🔒',
      title: 'Privacy',
      description: 'Your data stays on your device. No cloud storage, no data collection.'
    },
    {
      icon: '🎨',
      title: 'Customization',
      description: 'Fully customizable themes, layouts, and keyboard shortcuts.'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works seamlessly across desktop, tablet, and mobile devices.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={ROUTES.LANDING} className="flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">MX</span>
              </span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MarkdownProX
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Toggle Theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <Link
                to={ROUTES.EDITOR}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About MarkdownProX
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            We're passionate about creating the best markdown editing experience for writers,
            developers, and content creators worldwide.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">Our Story</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                MarkdownProX was born from a simple need: a powerful, privacy-focused markdown editor
                that doesn't compromise on features or user experience. As developers and writers ourselves,
                we were frustrated with existing solutions that either lacked essential features or
                required us to sacrifice our privacy.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our mission is to provide a professional-grade markdown editor that puts you in complete
                control of your content. Every feature is designed with privacy, performance, and
                usability in mind.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Today, MarkdownProX serves thousands of users worldwide, from individual bloggers to
                large development teams, all united by their need for a reliable, feature-rich, and
                privacy-respecting writing tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-purple-600 dark:text-purple-400">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-pink-600 dark:text-pink-400">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-8 text-blue-100">
              Have questions or want to collaborate? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={ROUTES.CONTACT}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
              <Link
                to={ROUTES.EDITOR}
                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold"
              >
                Try MarkdownProX
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6">
            <Link to={ROUTES.LANDING} className="text-blue-600 dark:text-blue-400 hover:underline">
              Home
            </Link>
            <Link to={ROUTES.CONTACT} className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact
            </Link>
            <Link to={ROUTES.TERMS_OF_SERVICE} className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </Link>
            <Link to={ROUTES.PRIVACY_POLICY} className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by the MarkdownProX Team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
