import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function PrivacyPolicy() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('markdownprox_theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('markdownprox_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to MarkdownProX ("we," "our," or "us"). This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our markdown editor application.
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy
                policy, please do not access the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Information We Collect</h2>

              <h3 className="text-xl font-medium mb-3 text-purple-600 dark:text-purple-400">2.1 Local Storage</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                MarkdownProX stores the following information locally on your device:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Your preferred theme (dark/light mode)</li>
                <li>Editor settings and preferences</li>
                <li>Document content and drafts (if you choose to save them locally)</li>
                <li>Recent files and workspace state</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-purple-600 dark:text-purple-400">2.2 No Personal Data Collection</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not collect, store, or transmit any personal information to our servers. All your data
                remains on your local device unless you explicitly choose to export or share it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">3. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Since we do not collect personal information, we use locally stored data only to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Provide a personalized user experience</li>
                <li>Remember your preferences and settings</li>
                <li>Maintain your workspace state between sessions</li>
                <li>Enable offline functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">4. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy and data security are our top priorities:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>All data is stored locally on your device</li>
                <li>No data is transmitted to external servers</li>
                <li>We use modern web security standards</li>
                <li>Your documents remain private and under your control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">5. Third-Party Services</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                MarkdownProX may use the following third-party services:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>CDN Services:</strong> For loading external libraries and resources</li>
                <li><strong>Analytics:</strong> Anonymous usage statistics (if enabled)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These services do not have access to your document content or personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">6. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Access and view all locally stored data</li>
                <li>Delete any locally stored data at any time</li>
                <li>Export your documents in various formats</li>
                <li>Clear all application data through browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">7. Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                MarkdownProX is suitable for users of all ages. Since we do not collect personal information,
                there are no special considerations for children's privacy. However, we recommend parental
                supervision for children under 13 when using any web application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last updated" date. You are
                advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">9. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> privacy@markdownprox.com<br />
                  <strong>Website:</strong> <Link to={ROUTES.LANDING} className="text-blue-600 dark:text-blue-400 hover:underline">MarkdownProX.com</Link>
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <Link
                to={ROUTES.LANDING}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
