import React, { useEffect } from 'react';
export default function Notification({ type = 'info', message, onClose }) {
  useEffect(() => { if (type !== 'loading') { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); } }, [type, onClose]);
  const borderColor = type === 'error' ? 'border-red-500' : type === 'success' ? 'border-green-500' : 'border-blue-500';
  return (<div className={`fixed top-4 right-4 p-4 rounded shadow-lg bg-white border-l-4 ${borderColor}`}><p>{message}</p></div>);
}