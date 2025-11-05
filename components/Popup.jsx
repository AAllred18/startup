import React from 'react';

export function Popup({ show, onClose, title = 'Coming soon', message, confirmText = 'Got it' }) {
  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="d-flex align-items-center justify-content-center"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 1050,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3 shadow p-4"
        style={{ maxWidth: 520, width: '100%', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="btn-close"
          style={{ position: 'absolute', top: 12, right: 12 }}
          onClick={onClose}
        />
        <h5 className="mb-2">{title}</h5>
        <p className="mb-0">{message}</p>
        <div className="text-end mt-3">
          <button className="btn btn-secondary" onClick={onClose}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
