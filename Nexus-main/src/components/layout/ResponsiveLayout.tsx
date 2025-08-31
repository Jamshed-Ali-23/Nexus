import React, { useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLocation } from 'react-router-dom';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: string;
}

/**
 * A responsive layout component that adapts to different screen sizes
 * Provides a consistent layout with optional sidebar, header, and footer
 */
export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = 'w-64',
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  // Close sidebar when switching to desktop view or changing routes on mobile
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(false);
    }
  }, [isDesktop, location.pathname]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (sidebarOpen && !isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen, isDesktop]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {header && (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          {React.cloneElement(header as React.ReactElement, { 
            toggleSidebar, 
            sidebarOpen,
            isDesktop 
          })}
        </div>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for desktop */}
        {sidebar && isDesktop && (
          <div 
            className={`hidden lg:block ${sidebarWidth} flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="h-full overflow-y-auto">
              {sidebar}
            </div>
          </div>
        )}
        
        {/* Mobile sidebar overlay */}
        {sidebar && !isDesktop && (
          <div className={`fixed inset-0 z-40 flex transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Backdrop */}
            <div 
              className={`fixed inset-0 bg-gray-600 transition-opacity ${sidebarOpen ? 'opacity-75' : 'opacity-0 pointer-events-none'}`}
              onClick={toggleSidebar}
              aria-hidden="true"
            />
            
            {/* Sidebar */}
            <div className={`relative flex-1 flex flex-col max-w-xs w-64 bg-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="absolute top-0 right-0 -mr-12 pt-2 z-50">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleSidebar}
                  aria-label="Close sidebar"
                >
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {sidebar}
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-auto focus:outline-none">
          <div className="py-4 sm:py-6">
            <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="bg-white border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};