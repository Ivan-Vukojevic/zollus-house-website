import { Home, Info, Camera, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileNavigation({ activeSection, onSectionChange }: MobileNavigationProps) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'welcome', label: t('nav.home'), icon: Home },
    { id: 'about', label: t('nav.about'), icon: Info },
    { id: 'gallery', label: t('nav.gallery'), icon: Camera },
    { id: 'contact', label: t('nav.contact'), icon: Phone },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeSection === id
                ? 'text-[#a18f85] bg-gray-50'
                : 'text-gray-500 hover:text-[#a18f85]'
            }`}
          >
            <Icon size={22} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}