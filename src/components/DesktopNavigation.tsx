import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface DesktopNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DesktopNavigation({ activeSection, onSectionChange }: DesktopNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'welcome', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const currentLanguage = i18n.resolvedLanguage === 'en' ? 'en' : 'hr';

  const setLanguage = (language: 'hr' | 'en') => {
    void i18n.changeLanguage(language);
    window.localStorage.setItem('appLanguage', language);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 transition-colors duration-300 ${
              isScrolled ? 'text-[#a18f85]' : 'text-white'
            }`}>
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 25 20">
                <path d="M23.5 0L46.4497 38.25H0.550327L23.5 0Z" fill="currentColor" />
              </svg>
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#a18f85]' : 'text-white'
            }`}>
              Zollus House
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex space-x-8">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => onSectionChange(id)}
                  className={`relative py-2 px-1 transition-all duration-300 hover:scale-105 ${
                    activeSection === id
                      ? isScrolled
                        ? 'text-[#a18f85]'
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:text-[#a18f85]'
                        : 'text-white/80 hover:text-white'
                  }`}
                  aria-label={label}
                >
                  {label}
                  {activeSection === id && (
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300 ${
                      isScrolled ? 'bg-[#a18f85]' : 'bg-white'
                    }`} />
                  )}
                </button>
              ))}
            </div>

            <div
              className={`flex items-center gap-1 rounded-full border px-1 py-1 transition-all duration-300 ${
                isScrolled
                  ? 'border-[#a18f85]/30 bg-white/90 shadow-md'
                  : 'border-white/40 bg-white/15 backdrop-blur-sm'
              }`}
              aria-label={t('nav.language')}
            >
              <button
                type="button"
                onClick={() => setLanguage('hr')}
                aria-label={t('common.switchToCroatian')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  currentLanguage === 'hr'
                    ? 'bg-[#a18f85] text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-[#a18f85]/10'
                      : 'text-white/90 hover:bg-white/20'
                }`}
              >
                HR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label={t('common.switchToEnglish')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-[#a18f85] text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-[#a18f85]/10'
                      : 'text-white/90 hover:bg-white/20'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" aria-label={t('nav.toggleMobileMenu')}>
            <div className={`w-6 h-6 transition-colors duration-300 ${
              isScrolled ? 'text-[#a18f85]' : 'text-white'
            }`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}