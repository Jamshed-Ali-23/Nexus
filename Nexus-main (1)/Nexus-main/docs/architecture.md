# Nexus Platform Architecture Documentation

## Project Overview
Nexus is a collaboration platform connecting investors and entrepreneurs. The platform facilitates communication, document sharing, and business relationship management between these two user types.

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Build Tool**: Vite
- **State Management**: React Context API
- **UI Components**: Custom components with Lucide React icons
- **Form Handling**: Native React forms
- **Notifications**: React Hot Toast

## Component Structure

### Layout Components
- `DashboardLayout`: Main layout wrapper for authenticated pages

### Authentication Components
- `LoginPage`: User login interface
- `RegisterPage`: New user registration
- `AuthContext`: Authentication state management

### Dashboard Components
- `EntrepreneurDashboard`: Home page for entrepreneurs
- `InvestorDashboard`: Home page for investors

### User Profile Components
- `EntrepreneurProfile`: Profile page for entrepreneurs
- `InvestorProfile`: Profile page for investors

### Feature Components
- `InvestorsPage`: Directory of investors
- `EntrepreneursPage`: Directory of entrepreneurs
- `MessagesPage`: Messaging interface
- `NotificationsPage`: User notifications
- `DocumentsPage`: Document management
- `SettingsPage`: User settings
- `HelpPage`: Help and support
- `DealsPage`: Business deals management
- `ChatPage`: Direct messaging interface

### UI Components
- `Button`: Reusable button component
- `Card`: Content container component
- `Badge`: Label/tag component
- `Input`: Form input component

### Data Models
- `User`: Base user type
- `Entrepreneur`: Extended user type for entrepreneurs
- `Investor`: Extended user type for investors
- `Message`: Chat message structure
- `ChatConversation`: Conversation between users
- `CollaborationRequest`: Connection request between users
- `Document`: File sharing structure

## Application Flow
1. Users authenticate via login/register
2. Based on role (entrepreneur/investor), users are directed to their respective dashboards
3. Users can browse profiles, send connection requests, and communicate
4. The platform facilitates document sharing and business relationship management

## Planned Enhancements
1. Meeting Scheduling Calendar
2. Video Calling Section
3. Document Processing Chamber
4. Payment Integration
5. Enhanced Security Features