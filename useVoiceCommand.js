import { useEffect } from 'react';
export function useVoiceCommand(onCommand) {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = true;
    recognition.onresult = (e) => {
      const last = e.results[e.resultIndex];
      if (last.isFinal) onCommand(last[0].transcript);
    };
    recognition.start();
    return () => recognition.stop();
  }, [onCommand]);
}