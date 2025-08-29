import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Users, MessageSquare, Bell, FileText, 
  Settings, HelpCircle, Handshake, Calendar, Video,
  Wallet, TrendingUp, Search, PieChart, Building
} from 'lucide-react';

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-2 px-1 text-xs ${isActive ? 'text-primary-600' : 'text-gray-600'}`
      }
    >
      <div className="mb-1">{icon}</div>
      <span className="truncate max-w-[60px] text-center">{label}</span>
    </NavLink>
  );
};

export const MobileNavigation: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Define navigation items based on user role
  const entrepreneurItems = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Home' },
    { to: '/investors', icon: <Users size={20} />, label: 'Investors' },
    { to: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { to: '/payments', icon: <Wallet size={20} />, label: 'Payments' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  const investorItems = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Home' },
    { to: '/entrepreneurs', icon: <Search size={20} />, label: 'Startups' },
    { to: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { to: '/payments', icon: <Wallet size={20} />, label: 'Payments' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  const navItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <MobileNavItem
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};