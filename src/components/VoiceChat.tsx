import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

const socket = io('http://localhost:4500');

interface VoiceChatProps {
  lobbyId: string;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ lobbyId }) => {
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    socket.on('voiceChatStarted', (sessionId) => {
      setIsVoiceChatActive(true);
      joinVoiceChat(sessionId);
    });

    socket.on('voiceChatEnded', () => {
      setIsVoiceChatActive(false);
      if (peer) {
        peer.destroy();
        setPeer(null);
      }
    });

    socket.on('webrtc-offer', async (data) => {
      if (peer) return;
      const newPeer = new SimplePeer({ initiator: false, trickle: false, stream: localStreamRef.current || undefined });
      setPeer(newPeer);

      newPeer.on('signal', (signal) => {
        socket.emit('webrtc-answer', { signal, lobbyId });
      });

      newPeer.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      newPeer.signal(data.signal);
    });

    socket.on('webrtc-answer', (data) => {
      if (!peer) return;
      peer.signal(data.signal);
    });

    socket.on('webrtc-ice-candidate', (data) => {
      if (!peer) return;
      peer.signal(data.candidate);
    });

    return () => {
      socket.off('voiceChatStarted');
      socket.off('voiceChatEnded');
      socket.off('webrtc-offer');
      socket.off('webrtc-answer');
      socket.off('webrtc-ice-candidate');
    };
  }, [peer, lobbyId]);

  const startVoiceChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });
      setPeer(newPeer);

      newPeer.on('signal', (signal) => {
        socket.emit('webrtc-offer', { signal, lobbyId });
      });

      newPeer.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      socket.emit('startVoiceChat', lobbyId);
      setIsVoiceChatActive(true);
    } catch (error) {
      console.error('Error starting voice chat:', error);
    }
  };

  const joinVoiceChat = async (sessionId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error joining voice chat:', error);
    }
  };

  const endVoiceChat = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
      socket.emit('endVoiceChat', lobbyId);
      setIsVoiceChatActive(false);
    }
  };

  return (
    <div>
      {isVoiceChatActive ? (
        <div>
          <video ref={localVideoRef} autoPlay muted />
          <video ref={remoteVideoRef} autoPlay />
          <button onClick={endVoiceChat}>End Voice Chat</button>
        </div>
      ) : (
        <button onClick={startVoiceChat}>Start Voice Chat</button>
      )}
    </div>
  );
};

export default VoiceChat;
