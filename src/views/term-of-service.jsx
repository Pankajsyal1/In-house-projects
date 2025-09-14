import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function TermsOfService() {
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
            Terms of Service
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using MarkdownProX ("the Service"), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Description of Service</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                MarkdownProX is a web-based markdown editor that provides:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Real-time markdown editing and preview</li>
                <li>Advanced formatting tools and keyboard shortcuts</li>
                <li>File management and export capabilities</li>
                <li>Customizable themes and user preferences</li>
                <li>Offline functionality with local data storage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">3. User Responsibilities</h2>

              <h3 className="text-xl font-medium mb-3 text-purple-600 dark:text-purple-400">3.1 Appropriate Use</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You agree to use MarkdownProX only for lawful purposes and in accordance with these Terms.
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-purple-600 dark:text-purple-400">3.2 Content Responsibility</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You are solely responsible for all content you create, edit, or store using MarkdownProX.
                We do not monitor or review content, and you retain all rights to your content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">4. Intellectual Property Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The Service and its original content, features, and functionality are and will remain the
                exclusive property of MarkdownProX and its licensors. The Service is protected by copyright,
                trademark, and other laws. Our trademarks and trade dress may not be used in connection with
                any product or service without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">5. Privacy and Data</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your
                use of the Service, to understand our practices. By using the Service, you agree to the
                collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">6. Service Availability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We strive to provide continuous service availability, but we do not guarantee that the Service
                will be available at all times. The Service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Scheduled maintenance</li>
                <li>Technical difficulties</li>
                <li>Force majeure events</li>
                <li>Updates or improvements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">7. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In no event shall MarkdownProX, nor its directors, employees, partners, agents, suppliers,
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">8. Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The information on this Service is provided on an "as is" basis. To the fullest extent
                permitted by law, this Company:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Excludes all representations and warranties relating to this Service and its contents</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">9. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may terminate or suspend your access immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms. Upon
                termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">10. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                If a revision is material, we will try to provide at least 30 days notice prior to any new
                terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">11. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which
                MarkdownProX operates, without regard to its conflict of law provisions. Our failure to
                enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">12. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> legal@markdownprox.com<br />
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
