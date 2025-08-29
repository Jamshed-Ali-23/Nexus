import React from 'react';
import { File, FileText, Download } from 'lucide-react';

interface DocumentPreviewProps {
  file: File;
  previewUrl?: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ file, previewUrl }) => {
  // In a real implementation, this would use a proper PDF/document viewer library
  // For this mock, we'll just show basic file info and a placeholder

  const isPdf = file.type === 'application/pdf';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPdf ? (
              <FileText className="h-6 w-6 text-red-500 mr-2" />
            ) : (
              <File className="h-6 w-6 text-blue-500 mr-2" />
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {file.name}
              </h3>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-600 flex items-center text-sm"
            onClick={() => {
              // In a real app, this would trigger a download
              alert(`Downloading ${file.name}`);
            }}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {isPdf ? (
          <div className="bg-gray-100 rounded-md p-8 flex flex-col items-center justify-center min-h-[400px]">
            {previewUrl ? (
              <iframe 
                src={previewUrl} 
                className="w-full h-[400px]" 
                title={`Preview of ${file.name}`}
              />
            ) : (
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  PDF preview would appear here in a real implementation
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-md p-8 flex flex-col items-center justify-center min-h-[400px]">
            <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              Preview not available for this file type
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700"
              onClick={() => {
                // In a real app, this would open the file
                alert(`Opening ${file.name}`);
              }}
            >
              Open File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;