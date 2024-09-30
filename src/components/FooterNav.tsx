// src/components/FooterNav.tsx
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
     const { t } = useTranslation();
     const [selectedMenu, setSelectedMenu] = useState('home');
    return (
      <footer className={`bg-footer fixed bottom-0 left-0 w-full shadow-lg`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex flex-col items-center" onClick={() => setSelectedMenu('home')}
          >
            <div className={`${selectedMenu === 'home' ? 'bg-selected' : 'bg-unselected'} rounded-full p-2`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h1m10-11l2 2m-2-2v10a1 1 0 01-1 1h-1m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-gray-400 text-xs mt-1">{t('footer.home')}</span>
          </Link>
  
          <Link to="/explorer" className="flex flex-col items-center" onClick={() => setSelectedMenu('explorer')}>
          <div className={`${selectedMenu === 'explorer' ? 'bg-selected' : 'bg-unselected'} rounded-full p-2`}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <span className="text-gray-400 text-xs mt-1">{t('footer.explorer')}</span>
          </Link>
  
          <Link to="/profile" className="flex flex-col items-center" onClick={() => setSelectedMenu('profile')}>
          <div className={`${selectedMenu === 'profile' ? 'bg-selected' : 'bg-unselected'} rounded-full p-2`}>
          <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="text-gray-400 text-xs mt-1">{t('footer.profile')}</span>
          </Link>
        </div>
      </footer>
    );
  };
  
  export default Footer;
