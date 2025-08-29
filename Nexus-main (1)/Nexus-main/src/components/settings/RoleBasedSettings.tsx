import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';
import { Switch } from '../ui/Switch';
import { Rocket, TrendingUp, Users, PieChart, Bell, Lock, Globe, Eye } from 'lucide-react';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, 
  title, 
  description, 
  enabled, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-primary-600">
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch checked={enabled} onChange={onChange} />
    </div>
  );
};

export const RoleBasedSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = React.useState({
    // Common settings
    notifications: true,
    twoFactorAuth: false,
    publicProfile: true,
    darkMode: false,
    
    // Entrepreneur-specific settings
    pitchDeckVisible: true,
    financialsVisible: false,
    teamInfoVisible: true,
    
    // Investor-specific settings
    portfolioVisible: true,
    investmentPreferencesVisible: true,
    contactInfoVisible: false,
  });
  
  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Common settings for all users
  const commonSettings = [
    {
      icon: <Bell size={20} />,
      title: 'Push Notifications',
      description: 'Receive notifications for messages, updates, and events',
      enabled: settings.notifications,
      onChange: () => handleToggle('notifications')
    },
    {
      icon: <Lock size={20} />,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: settings.twoFactorAuth,
      onChange: () => handleToggle('twoFactorAuth')
    },
    {
      icon: <Globe size={20} />,
      title: 'Public Profile',
      description: 'Make your profile visible to other users',
      enabled: settings.publicProfile,
      onChange: () => handleToggle('publicProfile')
    },
    {
      icon: <Eye size={20} />,
      title: 'Dark Mode',
      description: 'Switch to dark theme for better visibility in low light',
      enabled: settings.darkMode,
      onChange: () => handleToggle('darkMode')
    },
  ];
  
  // Entrepreneur-specific settings
  const entrepreneurSettings = [
    {
      icon: <Rocket size={20} />,
      title: 'Pitch Deck Visibility',
      description: 'Allow investors to view your pitch deck',
      enabled: settings.pitchDeckVisible,
      onChange: () => handleToggle('pitchDeckVisible')
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Financial Information',
      description: 'Share financial details with potential investors',
      enabled: settings.financialsVisible,
      onChange: () => handleToggle('financialsVisible')
    },
    {
      icon: <Users size={20} />,
      title: 'Team Information',
      description: 'Display team members and their roles',
      enabled: settings.teamInfoVisible,
      onChange: () => handleToggle('teamInfoVisible')
    },
  ];
  
  // Investor-specific settings
  const investorSettings = [
    {
      icon: <PieChart size={20} />,
      title: 'Portfolio Visibility',
      description: 'Allow entrepreneurs to see your investment portfolio',
      enabled: settings.portfolioVisible,
      onChange: () => handleToggle('portfolioVisible')
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Investment Preferences',
      description: 'Share your investment criteria and focus areas',
      enabled: settings.investmentPreferencesVisible,
      onChange: () => handleToggle('investmentPreferencesVisible')
    },
    {
      icon: <Users size={20} />,
      title: 'Contact Information',
      description: 'Make your contact details available to entrepreneurs',
      enabled: settings.contactInfoVisible,
      onChange: () => handleToggle('contactInfoVisible')
    },
  ];
  
  // Determine role-specific settings
  const roleSpecificSettings = user?.role === 'entrepreneur' 
    ? entrepreneurSettings 
    : investorSettings;
  
  return (
    <Card className="divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {user?.role === 'entrepreneur' ? 'Startup Settings' : 'Investor Settings'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Customize your experience and control what others can see
        </p>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">General Settings</h4>
        {commonSettings.map((setting, index) => (
          <SettingItem key={index} {...setting} />
        ))}
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {user?.role === 'entrepreneur' ? 'Startup Visibility' : 'Investor Visibility'}
        </h4>
        {roleSpecificSettings.map((setting, index) => (
          <SettingItem key={index} {...setting} />
        ))}
      </div>
    </Card>
  );
};