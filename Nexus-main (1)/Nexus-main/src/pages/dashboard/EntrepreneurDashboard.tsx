import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle, Video, Wallet } from 'lucide-react';
import { WalletWidget } from '../../components/payment/WalletWidget';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { getUpcomingEvents } from '../../data/calendarEvents';
import { format, parseISO, isAfter } from 'date-fns';
import { getLiveCalls } from '../../data/videoCalls';
import { ResponsiveDashboard, DashboardWidget } from '../../components/dashboard/ResponsiveDashboard';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [liveCalls, setLiveCalls] = useState<any[]>([]);
  
  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
      
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
  
  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status } : req
      )
    );
  };
  
  if (!user) return null;
  
  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');
  
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
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
          
          <Link to="/investors" className={isMobile ? 'w-full' : ''}>
            <Button
              leftIcon={<PlusCircle size={18} />}
              className={isMobile ? 'w-full justify-center' : ''}
            >
              Find Investors
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Dashboard widgets */}
      <ResponsiveDashboard>
        {/* Wallet Widget */}
        <DashboardWidget
          title="Wallet Balance"
          icon={<Wallet size={20} />}
          colSpan={1}
        >
          <WalletWidget />
        </DashboardWidget>
        
        {/* Pending Requests */}
        <DashboardWidget
          title="Pending Requests"
          icon={<Bell size={20} />}
          colSpan={1}
          className="bg-primary-50 border-primary-100"
        >
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-primary-900">{pendingRequests.length}</h3>
          </div>
        </DashboardWidget>
        
        {/* Total Connections */}
        <DashboardWidget
          title="Total Connections"
          icon={<Users size={20} />}
          colSpan={1}
          className="bg-secondary-50 border-secondary-100"
        >
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-secondary-900">
              {collaborationRequests.filter(req => req.status === 'accepted').length}
            </h3>
          </div>
        </DashboardWidget>
        
        {/* Profile Views */}
        <DashboardWidget
          title="Profile Views"
          icon={<TrendingUp size={20} />}
          colSpan={1}
          className="bg-success-50 border-success-100"
        >
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-success-900">24</h3>
          </div>
        </DashboardWidget>
        
        {/* Upcoming Meetings Summary */}
        {upcomingMeetings.length > 0 && (
          <DashboardWidget
            title="Upcoming Meetings"
            icon={<Calendar size={20} />}
            colSpan={4}
            className="bg-accent-50 border-accent-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {upcomingMeetings.slice(0, 3).map((meeting) => (
                <div key={meeting.id} className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(parseISO(meeting.start), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <Badge variant="accent">{meeting.status}</Badge>
                </div>
              ))}
            </div>
            
            {upcomingMeetings.length > 3 && (
              <div className="mt-3">
                <Link to="/calendar" className="text-sm text-accent-700 font-medium hover:text-accent-800 flex justify-center">
                  View all {upcomingMeetings.length} meetings
                </Link>
              </div>
            )}
          </DashboardWidget>
        )}
        
        {/* Collaboration requests */}
        <DashboardWidget
          title="Collaboration Requests"
          colSpan={3}
          action={<Badge variant="primary">{pendingRequests.length} pending</Badge>}
        >
          {collaborationRequests.length > 0 ? (
            <div className="space-y-4">
              {collaborationRequests.map(request => (
                <CollaborationRequestCard
                  key={request.id}
                  request={request}
                  onStatusUpdate={handleRequestStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <AlertCircle size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-600">No collaboration requests yet</p>
              <p className="text-sm text-gray-500 mt-1">When investors are interested in your startup, their requests will appear here</p>
            </div>
          )}
        </DashboardWidget>
        
        {/* Recommended investors */}
        <DashboardWidget
          title="Recommended Investors"
          colSpan={1}
          action={
            <Link to="/investors" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          }
        >
          <div className="space-y-4">
            {recommendedInvestors.map(investor => (
              <InvestorCard
                key={investor.id}
                investor={investor}
                showActions={false}
              />
            ))}
          </div>
        </DashboardWidget>
      </ResponsiveDashboard>
    </div>
  );
};