import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import './NavBar.css';

const NavBar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0,
    opacity: 0,
  });
  const router = useRouter();
  const { signOut } = useAuth();

  const navButtons = [
    { icon: 'palette', label: 'Dashboard', iconImage: '/images/dashboard.png', onClick: () => router.push('/dashboard') },
    { icon: 'images', label: 'Chatbot', iconImage: '/images/chatbot.png', onClick: () => router.push('/chatbot') },
    { icon: 'thumbtack', label: 'Forums', iconImage: '/images/forums.png', onClick: () => router.push('/forums') },
    { icon: 'heart', label: 'Subjects', iconImage: '/images/subjects.png', onClick: () => router.push('/subjects') },
    { icon: 'cogs', label: 'Compilers', iconImage: '/images/compilers.png', onClick: () => router.push('/compiler') },
    { icon: 'chart-line', label: 'Recommendations', iconImage: '/images/recommendations.png', onClick: () => router.push('/recommendations') },
    { icon: 'sign-out-alt', label: 'Logout', iconImage: '/images/logout.png', onClick: async () => { await signOut(); router.push('/logout'); } },
  ];

  const handleMouseEnter = (event, index) => {
    const { offsetTop, clientHeight } = event.currentTarget;
    setHighlightStyle({
      top: offsetTop,
      height: clientHeight,
      opacity: 1,
    });
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setHighlightStyle({
      top: 0,
      opacity: 0,
      height: 0,
    });
    setActiveIndex(null);
  };

  return (
    <div id="nav-bar">
      <div id="nav-header">
        <div id="nav-title">Maargdarshak</div>
        <hr />
      </div>
      
      <div id="nav-content">
        {navButtons.map((button, index) => (
          <div
            key={index}
            className={`nav-button ${activeIndex === index ? 'active' : ''}`}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={handleMouseLeave}
            onClick={button.onClick}
            role="button"
            aria-label={button.label}
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && button.onClick()}
          >
            <img src={button.iconImage} alt={button.label} className="nav-icon-image" />
            <span>{button.label}</span>
          </div>
        ))}

        <div 
          id="nav-content-highlight"
          style={{
            top: highlightStyle.top,
            height: highlightStyle.height,
            opacity: highlightStyle.opacity,
            background: '#000',
            transition: 'all 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
