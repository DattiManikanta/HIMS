import React, { useState } from 'react';

export function DummyTableTestScreen({ onBack, onGoHome }) {
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Please enter Client Name');
      return;
    }

    setLoading(true);
    setSaveStatus(null);

    fetch('/api/dummy-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: clientName.trim() })
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        setLoading(false);
        if (r.ok && data.success) {
          setSaveStatus({ success: true, message: data.message || '✓ Saved successfully into at_dummy_table!' });
          setClientName('');
        } else {
          setSaveStatus({ success: false, error: data.error || `HTTP ${r.status}: Failed to save into table` });
        }
      })
      .catch(err => {
        setLoading(false);
        setSaveStatus({
          success: false,
          error: err.message || 'Error saving to database'
        });
      });
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '0 16px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {onBack && (
          <button 
            type="button" 
            onClick={onBack}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', cursor: 'pointer' }}
          >
            ← Back
          </button>
        )}
        {onGoHome && (
          <button 
            type="button" 
            onClick={onGoHome}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', cursor: 'pointer' }}
          >
            🏠 Home
          </button>
        )}
      </div>

      {/* Single Field Form Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '36px 30px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Client Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter Client Name"
              required
              autoFocus
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '10px',
                border: '2px solid #cbd5e1',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#0f172a',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0284c7'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 800,
              color: '#ffffff',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px'
            }}
          >
            {loading ? 'Saving...' : 'SAVE'}
          </button>
        </form>

        {/* Status Notification */}
        {saveStatus && (
          <div style={{
            marginTop: '20px',
            padding: '14px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            lineHeight: 1.5,
            wordBreak: 'break-word',
            textAlign: saveStatus.success ? 'center' : 'left',
            background: saveStatus.success ? '#dcfce7' : '#fee2e2',
            border: `1.5px solid ${saveStatus.success ? '#86efac' : '#fca5a5'}`,
            color: saveStatus.success ? '#15803d' : '#b91c1c'
          }}>
            {saveStatus.success ? (
              <div style={{ fontWeight: 800 }}>
                {saveStatus.message || '✓ Saved successfully into at_dummy_table!'}
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 800, marginBottom: '4px' }}>✕ Save Failed:</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.95 }}>{saveStatus.error}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
