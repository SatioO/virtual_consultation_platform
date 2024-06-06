'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

const createPeerConnection = () => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
      },
    ],
  });
  const remoteStream = new MediaStream();

  peerConnection.addEventListener('signalingstatechange', (e) => {
    console.log('Signaling Event Change!');
    console.log(e);
  });

  peerConnection.addEventListener('icecandidate', (e) => {
    console.log('Found and ice candidate!');
    console.log(e);
  });

  peerConnection.addEventListener('track', (e) => {
    console.log('This should add some video/audio to the remote feed...');
    console.log(e);
  });

  return { peerConnection, remoteStream };
};

export default function RoomPage() {
  const [{ peerConnection }] = useState(createPeerConnection());
  const localFeedRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peerConnection.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      peerConnection.removeEventListener('negotiationneeded', handleNegoNeeded);
    };
  }, []);

  async function handleNegoNeeded() {
    const offer = await peerConnection.createOffer();
    console.log(offer);
  }

  async function makeACall() {
    const constraints = {
      audio: false,
      video: true,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (localFeedRef.current) {
      localFeedRef.current.srcObject = stream;
    }
  }

  return (
    <>
      <video ref={localFeedRef} autoPlay playsInline />
      <Button onClick={makeACall}>Join</Button>
    </>
  );
}
