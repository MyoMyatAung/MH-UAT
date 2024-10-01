import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import SVG files directly
import homeIcon from '../assets/home.svg';
import homeSelectedIcon from '../assets/homeSelected.png';
import explorerIcon from '../assets/explorer.png';
import explorerSelectedIcon from '../assets/explorerSelected.png';
import profileIcon from '../assets/profile.png';
import profileSelectedIcon from '../assets/profileSelected.png';

const Footer: FC = () => {
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState('home');

  return (
    <footer className={`bg-gray-900 fixed bottom-0 left-0 w-full shadow-lg`}>
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        
        {/* Home Icon */}
        <Link to="/" className="flex flex-col items-center" onClick={() => setSelectedMenu('home')}>
          <div className="rounded-full pt-2">
            <img
              src={selectedMenu === 'home' ? homeSelectedIcon : homeIcon}
              alt="Home"
              className="h-12 w-12"  // Adjust size as needed
            />
          </div>
          <span className={`${selectedMenu === 'home' ? 'text-white' : 'text-white'} text-xs mb-1`}>
            {t('footer.home')}
          </span>
        </Link>

        {/* Explorer Icon */}
        <Link to="/explorer" className="flex flex-col items-center" onClick={() => setSelectedMenu('explorer')}>
          <div className="rounded-full pt-2">
            <img
              src={selectedMenu === 'explorer' ? explorerSelectedIcon : explorerIcon}
              alt="Explorer"
              className="h-12 w-12"
            />
          </div>
          <span className={`${selectedMenu === 'explorer' ? 'text-white' : 'text-white'} text-xs mb-1`}>
            {t('footer.explorer')}
          </span>
        </Link>

        {/* Profile Icon */}
        <Link to="/profile" className="flex flex-col items-center" onClick={() => setSelectedMenu('profile')}>
          <div className="rounded-full pt-2">
            <img
              src={selectedMenu === 'profile' ? profileSelectedIcon : profileIcon}
              alt="Profile"
              className="h-12 w-12"
            />
          </div>
          <span className={`${selectedMenu === 'profile' ? 'text-white' : 'text-white'} text-xs mb-1`}>
            {t('footer.profile')}
          </span>
        </Link>

      </div>
    </footer>
  );
};

export default Footer;