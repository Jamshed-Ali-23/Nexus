import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Building, Users, TrendingUp, Calendar, 
  Mail, MapPin, Globe, Briefcase, PieChart, 
  Award, DollarSign, Target
} from 'lucide-react';

export const RoleBasedProfile: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Entrepreneur-specific profile
  const EntrepreneurProfile = () => (
    <Card>
      <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <Avatar 
              src={user.avatarUrl} 
              alt={user.name} 
              size="xl"
              className="border-4 border-white"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center mt-1">
                <Building size={16} className="mr-1" />
                <span className="text-sm">Founder & CEO at TechStartup</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Badge variant="success" className="flex items-center">
              <TrendingUp size={14} className="mr-1" />
              Seed Stage
            </Badge>
            <Badge variant="info" className="flex items-center">
              <Users size={14} className="mr-1" />
              Team of 8
            </Badge>
            <Button size="sm" variant="light">
              Edit Profile
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-lg font-medium mb-2">About the Startup</h3>
            <p className="text-gray-600 mb-4">
              {user.bio || 'We are building the next generation of AI-powered productivity tools for remote teams. Our mission is to help distributed teams collaborate more effectively and build amazing products together.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border rounded-md p-4">
                <div className="flex items-center text-primary-700 mb-2">
                  <Target size={20} className="mr-2" />
                  <h4 className="font-medium">Industry Focus</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>SaaS</Badge>
                  <Badge>Artificial Intelligence</Badge>
                  <Badge>Productivity</Badge>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center text-primary-700 mb-2">
                  <TrendingUp size={20} className="mr-2" />
                  <h4 className="font-medium">Traction</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm">• 5,000+ Monthly Active Users</p>
                  <p className="text-sm">• $25K MRR</p>
                  <p className="text-sm">• 15% MoM Growth</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Startup Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-medium">January 2022</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Funding Stage</p>
                  <p className="font-medium">Seed</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-medium">8 Employees</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Globe size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a href="#" className="font-medium text-primary-600 hover:underline">techstartup.com</a>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
  // Investor-specific profile
  const InvestorProfile = () => (
    <Card>
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <Avatar 
              src={user.avatarUrl} 
              alt={user.name} 
              size="xl"
              className="border-4 border-white"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center mt-1">
                <Briefcase size={16} className="mr-1" />
                <span className="text-sm">Managing Partner at Venture Capital</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Badge variant="success" className="flex items-center">
              <DollarSign size={14} className="mr-1" />
              $50M AUM
            </Badge>
            <Badge variant="info" className="flex items-center">
              <PieChart size={14} className="mr-1" />
              15 Investments
            </Badge>
            <Button size="sm" variant="light">
              Edit Profile
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-lg font-medium mb-2">About the Investor</h3>
            <p className="text-gray-600 mb-4">
              {user.bio || 'Experienced investor with a focus on early-stage technology startups. I partner with founders who are building innovative solutions in AI, SaaS, and fintech. My approach is hands-on, providing not just capital but strategic guidance and industry connections.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border rounded-md p-4">
                <div className="flex items-center text-blue-700 mb-2">
                  <Target size={20} className="mr-2" />
                  <h4 className="font-medium">Investment Focus</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>SaaS</Badge>
                  <Badge>Artificial Intelligence</Badge>
                  <Badge>Fintech</Badge>
                  <Badge>Healthcare</Badge>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center text-blue-700 mb-2">
                  <Award size={20} className="mr-2" />
                  <h4 className="font-medium">Notable Investments</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm">• TechCorp (Series A Lead)</p>
                  <p className="text-sm">• DataAI (Seed Round)</p>
                  <p className="text-sm">• HealthTech Solutions (Series B)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Investor Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Briefcase size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Firm</p>
                  <p className="font-medium">Venture Capital Partners</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Investment Range</p>
                  <p className="font-medium">$250K - $2M</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Target size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Stage Preference</p>
                  <p className="font-medium">Seed to Series A</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Globe size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a href="#" className="font-medium text-blue-600 hover:underline">vcpartners.com</a>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail size={18} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
  // Render the appropriate profile based on user role
  return user.role === 'entrepreneur' ? <EntrepreneurProfile /> : <InvestorProfile />;
};