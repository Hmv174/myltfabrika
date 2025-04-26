import React, { useState } from 'react';
import templates from '../templates.json';
import i18n from '../i18n';
export default function HeroForm({ onSubmit, disabled, usesCount, isPremium }) {
  const [heroName, setHeroName] = useState('');
  const [style, setStyle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [templateId, setTemplateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => { e.preventDefault(); setIsLoading(true); const form = new FormData(); form.append('heroName', heroName); form.append('style', style); form.append('language', 'ru'); form.append('isPremium', isPremium); if (isPremium && photo) form.append('photo', photo); if (isPremium && templateId) form.append('templateId', templateId); await onSubmit(form); setIsLoading(false); };
  const canUseFree = usesCount < 2 || isPremium;
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder={i18n.texts.placeholders.heroName} value={heroName} onChange={e => setHeroName(e.target.value)} className="border p-2 w-full" required disabled={!canUseFree || disabled} />
      <select value={style} onChange={e => setStyle(e.target.value)} className="border p-2 w-full" required disabled={!canUseFree || disabled}>
        <option value="">{i18n.texts.placeholders.style}</option>{i18n.styles.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      {isPremium && <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="border p-2 w-full" disabled={disabled} />}
      {isPremium && <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="border p-2 w-full" disabled={disabled}><option value="">{i18n.texts.placeholders.template}</option>{templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>}
      <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded w-full" disabled={disabled || isLoading || !canUseFree}>{isLoading ? '...' : i18n.texts.create}</button>
      {!canUseFree && <p className="text-red-500">Лимит бесплатных мультфильмов исчерпан. <strong>Премиум</strong> открывает безлимит.</p>}
    </form>
  );
}