import React, { useState } from 'react';
import Header from './components/Header';
import HeroForm from './components/HeroForm';
import ScenarioDisplay from './components/ScenarioDisplay';
import Loader from './components/Loader';
import Notification from './components/Notification';
import { useVoiceCommand } from './hooks/useVoiceCommand';
import i18n from './i18n';

export default function App() {
  const [scenario, setScenario] = useState(null);
  const [usesCount, setUsesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useVoiceCommand((text) => setNotification({ type: 'info', message: `Распознано: ${text}` }));

  const handleGenerate = async (formData) => {
    setNotification({ type: 'loading', message: 'Генерация сценария…' }); setIsLoading(true);
    try {
      const res = await fetch('/api/generate', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setScenario(data); setUsesCount(c => c + 1);
      setNotification({ type: 'success', message: 'Ваш мультфильм готов!' });
    } catch (e) {
      setNotification({ type: 'error', message: e.message || 'Ошибка генерации' });
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-bg p-6 font-cartoon">
      <Header />
      <div className="flex justify-end mb-4">
        <button onClick={() => setIsPremium(p => !p)} className="underline text-primary">
          {isPremium ? 'Отключить Премиум' : 'Включить Премиум'}
        </button>
      </div>
      <HeroForm onSubmit={handleGenerate} disabled={isLoading} usesCount={usesCount} isPremium={isPremium} />
      {isLoading && <Loader />}
      {scenario && <ScenarioDisplay data={scenario} />}
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
    </div>
  );
}