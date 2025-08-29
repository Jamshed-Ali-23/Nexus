import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Users, MessageSquare, Bell, FileText, 
  Settings, HelpCircle, Handshake, Calendar, Video,
  Wallet, Search, PieChart, Building
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary-50 text-primary-700 font-semibold'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
      onClick={() => {
        // Close mobile menu when an item is clicked
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          const event = new CustomEvent('closeMobileMenu');
          window.dispatchEvent(event);
        }
      }}
    >
      <div className="mr-3 flex-shrink-0">{icon}</div>
      <span className="truncate">{label}</span>
    </NavLink>
  );
};

export const RoleBasedNavigation: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Common navigation items for all users (moved to bottom)
  const commonNavItems = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { to: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { to: '/documents', icon: <FileText size={20} />, label: 'Documents' },
    { to: '/payments', icon: <Wallet size={20} />, label: 'Payments' },
    { to: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { to: '/video-calls', icon: <Video size={20} />, label: 'Video Calls' },
  ];
  
  // Settings and help at the bottom
  const bottomNavItems = [
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];
  
  // Role-specific navigation items
  const roleSpecificNavItems = user.role === 'entrepreneur' 
    ? [
        { to: '/investors', icon: <Users size={20} />, label: 'Find Investors' },
        { to: '/deals', icon: <Handshake size={20} />, label: 'Deals & Funding' },
      ]
    : [
        { to: '/entrepreneurs', icon: <Search size={20} />, label: 'Find Startups' },
        { to: '/portfolio', icon: <PieChart size={20} />, label: 'Portfolio' },
        { to: '/deals', icon: <Building size={20} />, label: 'Investment Deals' },
      ];

  // Listen for close menu events
  React.useEffect(() => {
    const handleCloseMenu = () => {
      // This will be used by NavItem to close the mobile menu
    };
    
    window.addEventListener('closeMobileMenu', handleCloseMenu);
    return () => window.removeEventListener('closeMobileMenu', handleCloseMenu);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="px-2 pt-2 pb-4 space-y-1 flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {roleSpecificNavItems.map((item, index) => (
            <NavItem key={`role-${index}`} {...item} />
          ))}
          
          <div className="border-t border-gray-200 my-2"></div>
          
          {commonNavItems.map((item, index) => (
            <NavItem key={`common-${index}`} {...item} />
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-100">
        {bottomNavItems.map((item, index) => (
          <NavItem key={`bottom-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};