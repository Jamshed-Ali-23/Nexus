import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle, Calendar, Video, Wallet } from 'lucide-react';
import { WalletWidget } from '../../components/payment/WalletWidget';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { getUpcomingEvents } from '../../data/calendarEvents';
import { format, parseISO, isAfter } from 'date-fns';
import { getLiveCalls } from '../../data/videoCalls';
import { ResponsiveDashboard, DashboardWidget } from '../../components/dashboard/ResponsiveDashboard';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [liveCalls, setLiveCalls] = useState<any[]>([]);
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  useEffect(() => {
    if (user) {
      // Load upcoming meetings
      const events = getUpcomingEvents();
      const userMeetings = events.filter(event => 
        event.type === 'meeting' && 
        (event.participants.includes(user.id) || event.createdBy === user.id) &&
        isAfter(parseISO(event.end), new Date())
      );
      setUpcomingMeetings(userMeetings);
      
      // Load live video calls
      const calls = getLiveCalls(user.id);
      setLiveCalls(calls);
    }
  }, [user]);
  
  if (!user) return null;
  
  // Get collaboration requests sent by this investor
  const sentRequests = getRequestsFromInvestor(user.id);
  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);
  
  // Filter entrepreneurs based on search and industry filters
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Industry filter
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });
  
  // Get unique industries for filter
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  
  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected => 
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Link to="/calendar" className={isMobile ? 'w-full' : ''}>
            <Button
              variant="outline"
              leftIcon={<Calendar size={18} />}
              className={isMobile ? 'w-full justify-center' : ''}
            >
              Meetings ({upcomingMeetings.length})
            </Button>
          </Link>
          
          <Link to="/video-calls" className={isMobile ? 'w-full' : ''}>
            <Button
              variant="outline"
              leftIcon={<Video size={18} />}
              className={`${isMobile ? 'w-full justify-center' : ''} ${liveCalls.length > 0 ? "animate-pulse border-accent-500 text-accent-700" : ""}`}
            >
              Video Calls {liveCalls.length > 0 && `(${liveCalls.length} Live)`}
            </Button>
          </Link>
          
          <Link to="/entrepreneurs" className={isMobile ? 'w-full' : ''}>
            <Button
              leftIcon={<PlusCircle size={18} />}
              className={isMobile ? 'w-full justify-center' : ''}
            >
              View All Startups
            </Button>
          </Link>
        </div>
      </div>
      
      <ResponsiveDashboard>
        {/* Wallet Widget */}
        <DashboardWidget
          title="Wallet Balance"
          icon={<Wallet size={20} />}
          colSpan={1}
        >
          <WalletWidget />
        </DashboardWidget>
        
        {/* Upcoming Meetings Summary */}
        {upcomingMeetings.length > 0 && (
          <DashboardWidget
            title="Upcoming Meetings"
            icon={<Calendar size={20} />}
            colSpan={3}
            className="bg-accent-50 border-accent-100"
          >
            <div className="space-y-2">
              {upcomingMeetings.slice(0, 3).map((meeting) => (
                <div key={meeting.id} className="flex justify-between items-center p-2 bg-white rounded-md border border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(parseISO(meeting.start), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <Badge variant="accent">{meeting.status}</Badge>
                </div>
              ))}
              
              {upcomingMeetings.length > 3 && (
                <div className="mt-3">
                  <Link to="/calendar" className="text-sm text-accent-700 font-medium hover:text-accent-800 flex justify-center">
                    View all {upcomingMeetings.length} meetings
                  </Link>
                </div>
              )}
            </div>
          </DashboardWidget>
        )}{/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 col-span-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        </div>
        
        {/* Stats summary */}
        <DashboardWidget
          title="Total Startups"
          icon={<Users size={20} />}
          colSpan={1}
          className="bg-primary-50 border-primary-100"
        >
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-primary-900">{entrepreneurs.length}</h3>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Industries"
          icon={<PieChart size={20} />}
          colSpan={1}
          className="bg-secondary-50 border-secondary-100"
        >
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Your Connections"
          icon={<Users size={20} />}
          colSpan={1}
          className="bg-accent-50 border-accent-100"
        >
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-accent-900">
              {sentRequests.filter(req => req.status === 'accepted').length}
            </h3>
          </div>
        </DashboardWidget>
      
        {/* Entrepreneurs grid */}
        <div className="mt-6 col-span-4">
        <DashboardWidget
          title="Featured Startups"
          colSpan={4}
          className="w-full"
        >
          {filteredEntrepreneurs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntrepreneurs.map(entrepreneur => (
                <EntrepreneurCard
                  key={entrepreneur.id}
                  entrepreneur={entrepreneur}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No startups match your filters</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustries([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </DashboardWidget>
        </div>
      </ResponsiveDashboard>
    </div>
  );
};