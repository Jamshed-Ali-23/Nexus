import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorSmartphone } from 'lucide-react';

interface VideoCallProps {
  participantName: string;
  onEndCall?: () => void;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  participantName,
  onEndCall
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // In a real implementation, this would toggle the actual audio stream
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // In a real implementation, this would toggle the actual video stream
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real implementation, this would toggle screen sharing
  };

  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Video Display Area */}
      <div className="flex-1 bg-gray-900 relative rounded-lg overflow-hidden">
        {/* Main video (remote participant) */}
        <div className="w-full h-full flex items-center justify-center">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              {/* This would be the actual video stream in a real implementation */}
              <div className="text-white text-xl">
                {isScreenSharing ? 'Screen Share Active' : `Connected with ${participantName}`}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-white text-xl">
                Camera Off
              </div>
            </div>
          )}
        </div>

        {/* Self view (small overlay) */}
        <div className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <div className="text-white text-sm">You</div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <div className="text-white text-sm">Camera Off</div>
            </div>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="mt-4 flex justify-center space-x-4 p-4 bg-white rounded-lg shadow">
        <Button
          onClick={toggleAudio}
          className={`rounded-full p-3 ${isAudioEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600 text-white'}`}
        >
          {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
        </Button>

        <Button
          onClick={toggleVideo}
          className={`rounded-full p-3 ${isVideoEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600 text-white'}`}
        >
          {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
        </Button>

        <Button
          onClick={toggleScreenShare}
          className={`rounded-full p-3 ${isScreenSharing ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <MonitorSmartphone size={20} />
        </Button>

        <Button
          onClick={handleEndCall}
          className="rounded-full p-3 bg-red-600 hover:bg-red-700 text-white"
        >
          <PhoneOff size={20} />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;