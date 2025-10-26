import { useState, useRef, useCallback } from 'react';

const DEEPGRAM_API_KEY = 'decce0a88f205bc23c614342ff54bbe5f3500879';

export function useDeepgram() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect to Deepgram WebSocket
      const socket = new WebSocket(
        'wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&channels=1',
        ['token', DEEPGRAM_API_KEY]
      );

      socket.onopen = () => {
        console.log('Deepgram WebSocket connected');
        
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        };

        mediaRecorder.start(250); // Send data every 250ms
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
      };

      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const transcriptText = data.channel?.alternatives?.[0]?.transcript;
        
        if (transcriptText && data.is_final) {
          setTranscript((prev) => prev + ' ' + transcriptText);
        }
      };

      socket.onerror = (error) => {
        console.error('Deepgram WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('Deepgram WebSocket closed');
      };

      socketRef.current = socket;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }

    setIsRecording(false);
  }, []);

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
  };
}
