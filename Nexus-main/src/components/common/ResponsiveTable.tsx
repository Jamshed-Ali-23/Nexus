import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  mobileLabel?: string;
  priority?: number; // Higher number = higher priority to show on mobile
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
}

export function ResponsiveTable<T>({ 
  data, 
  columns, 
  keyExtractor,
  className = '',
  emptyMessage = 'No data available',
  isLoading = false,
  onRowClick
}: ResponsiveTableProps<T>) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  // For mobile, only show high priority columns
  const visibleColumns = isMobile
    ? columns.filter(col => col.priority && col.priority >= 3)
    : isTablet
      ? columns.filter(col => col.priority && col.priority >= 2)
      : columns;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse flex flex-col w-full">
          <div className="h-10 bg-gray-200 rounded-md w-full mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-md w-full mb-2"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }
  
  const renderCellContent = (item: T, column: Column<T>) => {
    const { accessor } = column;
    if (typeof accessor === 'function') {
      return accessor(item);
    } else {
      return item[accessor] as React.ReactNode;
    }
  };
  
  return (
    <div className={`overflow-x-auto ${className}`}>
      {isMobile ? (
        // Mobile card view
        <div className="space-y-4">
          {data.map(item => (
            <div 
              key={keyExtractor(item)}
              className={`bg-white rounded-lg border border-gray-200 p-4 ${onRowClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {visibleColumns.map((column, colIndex) => (
                <div key={colIndex} className="flex justify-between py-1">
                  <span className="text-sm font-medium text-gray-500">
                    {column.mobileLabel || column.header}:
                  </span>
                  <span className={`text-sm ${column.className || ''}`}>
                    {renderCellContent(item, column)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Desktop/tablet table view
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((column, index) => (
                <th 
                  key={index} 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(item => (
              <tr 
                key={keyExtractor(item)} 
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {visibleColumns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}
                  >
                    {renderCellContent(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}