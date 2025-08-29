import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  Menu, X, Bell, MessageCircle, User, LogOut, Settings, HelpCircle,
  ChevronDown, Home, FileText, Handshake, Calendar, Video, Wallet,
  Search, PieChart, Building, Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, className = '', onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-700 hover:bg-gray-100'
        } ${className}`
      }
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </NavLink>
  );
};

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  if (!user) return null;
  
  // Common navigation items for all users (excluding profile-related items)
  const commonNavItems = [
    { to: '/messages', icon: <MessageCircle size={18} />, label: 'Messages' },
    { to: '/notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { to: '/documents', icon: <FileText size={18} />, label: 'Documents' },
    { to: '/payments', icon: <Wallet size={18} />, label: 'Payments' },
    { to: '/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
    { to: '/video-calls', icon: <Video size={18} />, label: 'Video Calls' },
  ];
  
  // Role-specific navigation items
  const roleSpecificNavItems = user.role === 'entrepreneur' 
    ? [
        { to: '/investors', icon: <Users size={18} />, label: 'Find Investors' },
        { to: '/deals', icon: <Handshake size={18} />, label: 'Deals & Funding' },
      ]
    : [
        { to: '/entrepreneurs', icon: <Search size={18} />, label: 'Find Startups' },
        { to: '/portfolio', icon: <PieChart size={18} />, label: 'Portfolio' },
        { to: '/deals', icon: <Building size={18} />, label: 'Investment Deals' },
      ];
  
  // Combine all nav items
  const allNavItems = [...roleSpecificNavItems, ...commonNavItems];
  
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">Business Nexus</span>
            </NavLink>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center space-x-1 overflow-x-auto px-4">
            <NavItem 
              to="/dashboard" 
              icon={<Home size={18} />} 
              label="Dashboard" 
            />
            
            {allNavItems.map((item, index) => (
              <NavItem
                key={index}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
            
            {/* Profile dropdown */}
            <div className="relative ml-4" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                aria-controls="profile-menu"
              >
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name || 'User'} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-primary-600 font-semibold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline font-medium text-gray-700">{user.name?.split(' ')[0] || 'Profile'}</span>
                <ChevronDown 
                  size={16} 
                  className={`hidden md:inline text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              {/* Dropdown menu */}
              <div 
                id="profile-menu"
                className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-150 ${
                  isProfileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  transformOrigin: 'top right',
                  willChange: 'transform, opacity'
                }}
              >
                {/* User info section */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm text-gray-900 font-medium">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email || 'user@example.com'}</p>
                </div>
                
                {/* Menu items */}
                <div className="p-2">
                  <NavLink
                    to={`/profile/${user.role}/${user.id}`}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                    role="menuitem"
                    tabIndex={isProfileOpen ? 0 : -1}
                  >
                    <User className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Your Profile</span>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                    role="menuitem"
                    tabIndex={isProfileOpen ? 0 : -1}
                  >
                    <Settings className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Account Settings</span>
                  </NavLink>
                  <NavLink
                    to="/help"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                    role="menuitem"
                    tabIndex={isProfileOpen ? 0 : -1}
                  >
                    <HelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Help & Support</span>
                  </NavLink>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    role="menuitem"
                    tabIndex={isProfileOpen ? 0 : -1}
                  >
                    <LogOut className="mr-3 h-5 w-5 text-red-400" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <NavItem 
              to="/dashboard" 
              icon={<Home size={20} />} 
              label="Dashboard"
              className="block px-4 py-3 text-base"
              onClick={toggleMenu}
            />
            
            {allNavItems.map((item, index) => (
              <div key={index} onClick={toggleMenu}>
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  className="block px-4 py-3 text-base"
                />
              </div>
            ))}
            
            <div className="border-t border-gray-200 mt-2 pt-2">
              <NavLink
                to={`/profile/${user.role}/${user.id}`}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-base font-medium rounded-md ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={toggleMenu}
              >
                Profile
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-base font-medium rounded-md ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={toggleMenu}
              >
                Settings
              </NavLink>
              <NavLink
                to="/help"
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-base font-medium rounded-md ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={toggleMenu}
              >
                Help & Support
              </NavLink>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};