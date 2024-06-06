'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LobbyPage() {
  const params = useParams<{ room: string }>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const localFeedRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnabled, setVideoEnabled] = useState(true);
  const [isAudioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    manageLocalStream();
  }, []);

  async function manageLocalStream() {
    const constraints = {
      audio: true,
      video: true,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    stream.getVideoTracks().forEach((track) => {
      track.enabled = isVideoEnabled;
    });
    setLocalStream(stream);

    if (localFeedRef.current) {
      localFeedRef.current.srcObject = stream;
    }
  }

  function handleToggleVideo() {
    localStream?.getVideoTracks().forEach((track) => {
      track.enabled = !isVideoEnabled;
      setVideoEnabled(!isVideoEnabled);
    });
  }

  function handleToggleAudio() {
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = !isAudioEnabled;
      setAudioEnabled(!isAudioEnabled);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative max-w-[900px] max-h-[550px] w-full h-full">
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <video
            className="max-w-[900px] max-h-[550px] w-full h-full object-cover"
            ref={localFeedRef}
            autoPlay
            muted
            playsInline
          />
        </div>
        <div className="absolute bottom-4 left-8 right-8 p-4 flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white h-16 w-16 rounded-full text-black hover:bg-gray-200 p-4"
            onClick={handleToggleAudio}
          >
            {isAudioEnabled ? (
              <MicIcon className="w-24 h-24" />
            ) : (
              <MicOffIcon className="w-24 h-24" />
            )}
            <span className="sr-only">Toggle Microphone</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white h-16 w-16 rounded-full text-black hover:bg-gray-200 p-4"
            onClick={handleToggleVideo}
          >
            {isVideoEnabled ? (
              <VideoIcon className="w-24 h-24" />
            ) : (
              <VideoOffIcon className="w-24 h-24" />
            )}
            <span className="sr-only">Toggle Video</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function MicIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function MicOffIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function VideoIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function VideoOffIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" />
      <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
      <path d="m2 2 20 20" />
    </svg>
  );
}
