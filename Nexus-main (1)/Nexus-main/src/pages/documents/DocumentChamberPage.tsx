import React, { useState } from 'react';
import DocumentUploader from '../../components/documents/DocumentUploader';
import DocumentPreview from '../../components/documents/DocumentPreview';
import SignaturePad from '../../components/documents/SignaturePad';
import DocumentStatus, { DocumentStatusType } from '../../components/documents/DocumentStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { FileText, Users, Pen, CheckCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  status: DocumentStatusType;
  uploadedAt: Date;
  lastModified: Date;
  sharedWith: string[];
  signedBy: string[];
  file: File;
}

const DocumentChamberPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  
  // Mock function to handle file uploads
  const handleUpload = (files: File[]) => {
    const newDocuments = files.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'draft' as DocumentStatusType,
      uploadedAt: new Date(),
      lastModified: new Date(),
      sharedWith: [],
      signedBy: [],
      file
    }));
    
    setDocuments([...documents, ...newDocuments]);
  };
  
  const handleSignatureSave = (signatureDataUrl: string) => {
    if (!selectedDocument) return;
    
    // In a real app, this would save the signature to the document
    // and update the document status
    const updatedDocuments = documents.map(doc => {
      if (doc.id === selectedDocument.id) {
        return {
          ...doc,
          status: 'signed' as DocumentStatusType,
          signedBy: [...doc.signedBy, 'Current User']
        };
      }
      return doc;
    });
    
    setDocuments(updatedDocuments);
    setShowSignaturePad(false);
    
    // Find and select the updated document
    const updatedDoc = updatedDocuments.find(doc => doc.id === selectedDocument.id);
    if (updatedDoc) {
      setSelectedDocument(updatedDoc);
    }
  };
  
  const handleShareDocument = (document: Document) => {
    // In a real app, this would open a sharing dialog
    // For now, we'll just update the document status
    const updatedDocuments = documents.map(doc => {
      if (doc.id === document.id) {
        return {
          ...doc,
          status: 'in_review' as DocumentStatusType,
          sharedWith: [...doc.sharedWith, 'Shared User']
        };
      }
      return doc;
    });
    
    setDocuments(updatedDocuments);
    
    // Find and select the updated document
    const updatedDoc = updatedDocuments.find(doc => doc.id === document.id);
    if (updatedDoc) {
      setSelectedDocument(updatedDoc);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Document Chamber</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Document list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Upload Documents</h2>
            <DocumentUploader onUpload={handleUpload} />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium mb-4">Your Documents</h2>
            {documents.length === 0 ? (
              <p className="text-gray-500 text-sm">No documents uploaded yet</p>
            ) : (
              <ul className="space-y-2">
                {documents.map(doc => (
                  <li 
                    key={doc.id} 
                    className={`p-3 rounded-md cursor-pointer ${selectedDocument?.id === doc.id ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedDocument(doc)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <DocumentStatus status={doc.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Right content - Document preview and actions */}
        <div className="lg:col-span-2">
          {selectedDocument ? (
            <div>
              {showSignaturePad ? (
                <SignaturePad 
                  onSave={handleSignatureSave}
                  onCancel={() => setShowSignaturePad(false)}
                />
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">{selectedDocument.name}</h2>
                    <DocumentStatus status={selectedDocument.status} />
                  </div>
                  
                  <Tabs defaultValue="preview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="preview">
                        <FileText className="h-4 w-4 mr-2" />
                        Preview
                      </TabsTrigger>
                      <TabsTrigger value="sharing">
                        <Users className="h-4 w-4 mr-2" />
                        Sharing
                      </TabsTrigger>
                      <TabsTrigger value="signatures">
                        <Pen className="h-4 w-4 mr-2" />
                        Signatures
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="focus:outline-none">
                      <DocumentPreview file={selectedDocument.file} />
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          onClick={() => setShowSignaturePad(true)}
                          className="bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          <Pen className="h-4 w-4 mr-2" />
                          Sign Document
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sharing" className="focus:outline-none">
                      <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-4">Share Document</h3>
                        
                        {selectedDocument.sharedWith.length > 0 ? (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Shared With</h4>
                            <ul className="space-y-2">
                              {selectedDocument.sharedWith.map((user, index) => (
                                <li key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                                    <span className="text-primary-700 font-medium">{user.charAt(0)}</span>
                                  </div>
                                  <span className="text-sm text-gray-700">{user}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm mb-4">This document hasn't been shared yet</p>
                        )}
                        
                        <Button 
                          onClick={() => handleShareDocument(selectedDocument)}
                          className="bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Share Document
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="signatures" className="focus:outline-none">
                      <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-4">Signatures</h3>
                        
                        {selectedDocument.signedBy.length > 0 ? (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Signed By</h4>
                            <ul className="space-y-2">
                              {selectedDocument.signedBy.map((user, index) => (
                                <li key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-700">{user}</span>
                                    <p className="text-xs text-gray-500">
                                      Signed on {new Date().toLocaleDateString()}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm mb-4">No signatures yet</p>
                        )}
                        
                        {selectedDocument.status !== 'signed' && (
                          <Button 
                            onClick={() => setShowSignaturePad(true)}
                            className="bg-primary-600 hover:bg-primary-700 text-white mt-4"
                          >
                            <Pen className="h-4 w-4 mr-2" />
                            Sign Document
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[400px]">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h3>
              <p className="text-gray-500 text-center">
                Upload a document or select one from the list to view and manage it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentChamberPage;