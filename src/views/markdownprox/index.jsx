import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function MarkdownProXLanding() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: '⚡',
      title: 'Real-time Preview',
      description: 'See your markdown rendered instantly as you type with live preview and syntax highlighting.'
    },
    {
      icon: '⌨️',
      title: 'Keyboard Shortcuts',
      description: 'Powerful keyboard shortcuts for all formatting options. Work faster with professional shortcuts.'
    },
    {
      icon: '📁',
      title: 'File Management',
      description: 'Manage multiple documents with tabs, import/export files, and auto-save functionality.'
    },
    {
      icon: '🎨',
      title: 'Advanced Formatting',
      description: 'Rich formatting options including tables, code blocks, math equations, and Mermaid diagrams.'
    },
    {
      icon: '🌙',
      title: 'Dark/Light Theme',
      description: 'Beautiful dark and light themes with smooth transitions and eye-friendly design.'
    },
    {
      icon: '📊',
      title: 'Statistics & Analytics',
      description: 'Track your writing with word count, reading time, and document statistics.'
    }
  ];

  const shortcuts = [
    { key: 'Ctrl+B', action: 'Bold' },
    { key: 'Ctrl+I', action: 'Italic' },
    { key: 'Ctrl+K', action: 'Link' },
    { key: 'Ctrl+1', action: 'Heading 1' },
    { key: 'Ctrl+F', action: 'Find & Replace' },
    { key: 'Ctrl+P', action: 'Command Palette' },
    { key: 'F11', action: 'Focus Mode' },
    { key: 'F12', action: 'Fullscreen' }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('markdownprox_theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('markdownprox_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const scrollToEditor = () => {
    // This would navigate to the main editor
    navigate(ROUTES.EDITOR);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={ROUTES.LANDING} v className="flex items-center gap-3">
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
              <button
                onClick={scrollToEditor}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"></div>

        {/* Primary Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
            backgroundSize: '15px 15px'
          }}></div>
        </div>

        {/* Secondary Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.3) 1px, transparent 0)`,
            backgroundSize: '25px 25px',
            transform: 'translate(12px, 12px)'
          }}></div>
        </div>

        {/* Tertiary Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-15 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.3) 1px, transparent 0)`,
            backgroundSize: '35px 35px',
            transform: 'translate(17px, 17px)'
          }}></div>
        </div>

        {/* Animated floating dots - More dots with varied sizes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-20 right-16 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-30 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-50 left-12 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-60 right-8 w-3 h-3 bg-pink-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-70 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-80 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-90 left-20 w-2 h-2 bg-pink-500 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2.8s' }}></div>

          <div className="absolute bottom-10 right-12 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.8s' }}></div>
          <div className="absolute bottom-20 left-16 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-30 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '2.2s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1.7s' }}></div>
          <div className="absolute bottom-50 right-20 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute bottom-60 left-8 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2.3s' }}></div>
          <div className="absolute bottom-70 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.4s' }}></div>
          <div className="absolute bottom-80 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.9s' }}></div>
          <div className="absolute bottom-90 right-16 w-2 h-2 bg-pink-500 rounded-full animate-bounce opacity-40" style={{ animationDelay: '2.6s' }}></div>

          {/* Center area dots */}
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1.6s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2.1s' }}></div>

          {/* Additional scattered dots */}
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.9s' }}></div>
          <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute top-3/4 left-1/5 w-1 h-1 bg-pink-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2.4s' }}></div>
          <div className="absolute top-3/4 right-1/5 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.1s' }}></div>
          <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.3s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MarkdownProX
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              The most powerful and feature-rich markdown editor for professionals, writers, and developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={scrollToEditor}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Writing Now
              </button>
              <button className="px-8 py-4 border-2 border-gray-400 text-gray-200 rounded-xl hover:border-blue-400 hover:text-blue-300 transition-all duration-200 font-semibold text-lg">
                View Demo
              </button>
            </div>


            {/* Feature Showcase */}
            <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-white/30 dark:border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{features[currentFeature].title}</h3>
                <p className="text-gray-200">{features[currentFeature].description}</p>
              </div>
              <div className="text-6xl mb-4">{features[currentFeature].icon}</div>
              <div className="flex justify-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentFeature
                      ? 'bg-white scale-125 shadow-lg'
                      : 'bg-white/50 hover:bg-white/70 border border-white/30'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to create, edit, and manage your markdown documents professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Keyboard Shortcuts</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Work faster with professional keyboard shortcuts. Press F1 in the editor for the complete list.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <kbd className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                  {shortcut.key}
                </kbd>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{shortcut.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the power of MarkdownProX with our interactive demo.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm">MarkdownProX Editor</span>
              </div>
              <div className="text-green-400 font-mono text-sm">
                <div># Welcome to MarkdownProX</div>
                <div className="text-gray-400">This is a **powerful** markdown editor with:</div>
                <div className="text-gray-400">- Real-time preview</div>
                <div className="text-gray-400">- Advanced formatting</div>
                <div className="text-gray-400">- Keyboard shortcuts</div>
                <div className="text-gray-400">- File management</div>
                <div className="text-blue-400">[Try it now →]</div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={scrollToEditor}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Launch Editor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Keyboard Shortcuts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-300">Export Formats</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Free & Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Writing?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of writers, developers, and content creators who use MarkdownProX daily.
          </p>
          <button
            onClick={scrollToEditor}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MX</span>
                </div>
                <h3 className="text-xl font-bold text-white">MarkdownProX</h3>
              </div>
              <p className="text-gray-400">
                Professional markdown editor with advanced features and beautiful design.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Preview</li>
                <li>Keyboard Shortcuts</li>
                <li>File Management</li>
                <li>Export Options</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to={ROUTES.ABOUT}>About</Link></li>
                <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
                <li><Link to={ROUTES.TERMS_OF_SERVICE}>Terms of Service</Link></li>
                <li><Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>GitHub</li>
                <li>Twitter</li>
                <li>Discord</li>
                <li>Email</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">MX</span>
                </div>
                <div className="text-sm">
                  Made with <span className="text-red-500 animate-pulse">❤️</span> by <span className="font-semibold text-blue-400">Pankaj</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span>© {new Date().getFullYear()} MarkdownProX</span>
                <span>Powered by React & Tailwind CSS</span>
                <span>Version 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
