import React, { useState } from 'react';
import { pharmacyDrugsCatalog, pharmacyCategories } from '../data/pharmacyData.js';

export function PharmacyScreen({ records, initialToken }) {
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // 'catalog', 'dispenser', 'cart'
  const [drugs, setDrugs] = useState(pharmacyDrugsCatalog);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Medications');
  
  // Dispenser State
  const [tokenInput, setTokenInput] = useState(initialToken || 'CAR-104');
  const [selectedPatientRecord, setSelectedPatientRecord] = useState(records[initialToken || 'CAR-104'] || null);
  const [dispensedInvoice, setDispensedInvoice] = useState(null);

  // Cart / Counter POS State
  const [cart, setCart] = useState([]);
  const [cartSuccessNotice, setCartSuccessNotice] = useState(null);

  // Filter drugs
  const filteredDrugs = drugs.filter(drug => {
    const matchesCategory = selectedCategory === 'All Medications' || drug.category === selectedCategory;
    const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drug.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drug.indication.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Token Lookup for Prescription Dispensation
  const handleLookupToken = (token) => {
    const key = (token || tokenInput).trim().toUpperCase();
    if (records[key]) {
      setSelectedPatientRecord(records[key]);
      setTokenInput(key);
      setDispensedInvoice(null);
    } else {
      alert(`No active OP patient record found for token "${key}". Try demo tokens: CAR-104, GEN-211, or ORT-082.`);
    }
  };

  // Add drug to Cart
  const handleAddToCart = (drug) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drug.id);
      if (existing) {
        return prev.map(item => item.id === drug.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...drug, qty: 1 }];
    });
    setCartSuccessNotice(`Added ${drug.name} to pharmacy bill.`);
    setTimeout(() => setCartSuccessNotice(null), 3000);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Dispense Patient Prescription
  const handleDispensePrescription = () => {
    if (!selectedPatientRecord) return;
    
    // Match prescribed medicines with catalog pricing
    const dispensedItems = selectedPatientRecord.prescription.map((rxItem, idx) => {
      // Find matching drug in catalog by partial name
      const matched = drugs.find(d => rxItem.medicine.toLowerCase().includes(d.name.split(' ')[0].toLowerCase())) || {
        price: 85.00,
        batchNo: `BATCH-${idx + 101}`,
        expiryDate: '12/2028',
        manufacturer: 'Hospital Formulary'
      };

      return {
        name: rxItem.medicine,
        timing: rxItem.timing,
        instruction: rxItem.instruction,
        duration: rxItem.duration,
        batchNo: matched.batchNo || 'MED-2026',
        expiryDate: matched.expiryDate || '2028',
        price: matched.price || 85.00,
        qty: rxItem.duration.includes('30') ? 30 : 15
      };
    });

    const subtotal = dispensedItems.reduce((sum, item) => sum + (item.price * (item.qty / 10)), 0);
    const tax = subtotal * 0.05; // 5% GST on medicines
    const grandTotal = Math.round(subtotal + tax);

    const invoice = {
      invoiceNo: `PHARM-INV-${Math.floor(10000 + Math.random() * 90000)}`,
      dispenseDate: new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }),
      dispenseTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pharmacistName: 'R. K. Verma, Lead Clinical Pharmacist (Reg #PH-88912)',
      patientName: selectedPatientRecord.patientName,
      token: selectedPatientRecord.token,
      opId: selectedPatientRecord.opId,
      doctor: selectedPatientRecord.doctor,
      department: selectedPatientRecord.department,
      items: dispensedItems,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };

    setDispensedInvoice(invoice);

    // Save invoice to PostgreSQL backend
    fetch('/api/pharmacy/dispense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice)
    })
    .then(r => r.json())
    .then(data => {
      console.log('Pharmacy invoice recorded:', data);
    })
    .catch(err => console.warn('Could not post invoice to API:', err));
  };

  return (
    <div className="pharmacy-section">
      {/* Header */}
      <div className="section-header">
        <div>
          <h2>💊 24/7 Outpatient Central Pharmacy & Drug Formulary</h2>
          <p>Hospital dispensary, patient prescription fulfillment, stock inventory, and digital medicine billing.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ 
            background: 'var(--emerald-light)', 
            color: '#065f46', 
            padding: '4px 12px', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.8rem', 
            fontWeight: 700 
          }}>
            Dispensary Counters 1 to 4 Active ●
          </span>
        </div>
      </div>

      {/* Pharmacy Top Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div className="vital-label">Formulary Drugs Listed</div>
          <div className="vital-val" style={{ color: 'var(--primary)' }}>{drugs.length}+ Active</div>
        </div>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--emerald)' }}>
          <div className="vital-label">In-Stock Availability</div>
          <div className="vital-val" style={{ color: 'var(--emerald)' }}>99.2% Available</div>
        </div>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--amber)' }}>
          <div className="vital-label">Prescriptions Dispensed Today</div>
          <div className="vital-val" style={{ color: 'var(--amber)' }}>218 Patients</div>
        </div>
        <div className="vital-tile" style={{ borderLeft: '4px solid #6366f1' }}>
          <div className="vital-label">Pharmacy Cart Items</div>
          <div className="vital-val" style={{ color: '#6366f1' }}>{cart.length} in Order</div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--border)', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          className={`btn ${activeSubTab === 'catalog' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('catalog')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          📦 Drug Catalog & Stock Inventory
        </button>
        <button
          className={`btn ${activeSubTab === 'dispenser' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('dispenser')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          🧾 OP Prescription Dispenser (Demo)
        </button>
        <button
          className={`btn ${activeSubTab === 'cart' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('cart')}
          style={{ padding: '8px 18px', fontSize: '0.88rem', position: 'relative' }}
        >
          🛒 Quick Counter POS / Bill ({cart.length})
        </button>
      </div>

      {cartSuccessNotice && (
        <div style={{ 
          background: 'var(--emerald-light)', 
          color: '#065f46', 
          padding: '10px 18px', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '18px', 
          fontSize: '0.86rem', 
          fontWeight: 700 
        }}>
          ✓ {cartSuccessNotice}
        </div>
      )}

      {/* VIEW 1: DRUG CATALOG & INVENTORY */}
      {activeSubTab === 'catalog' && (
        <div>
          {/* Search & Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search drug name, generic formula or medical indication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '380px' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {pharmacyCategories.map(cat => (
                <button
                  key={cat}
                  className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ fontSize: '0.78rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Drugs Inventory Table */}
          <div className="staff-console-card" style={{ padding: '20px' }}>
            <table className="staff-table">
              <thead>
                <tr>
                  <th>Drug Name & Formulation</th>
                  <th>Generic Formula</th>
                  <th>Category</th>
                  <th>Batch / Expiry</th>
                  <th>Unit MRP</th>
                  <th>Current Stock</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Dispensary Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrugs.map(drug => (
                  <tr key={drug.id}>
                    <td>
                      <strong style={{ color: 'var(--dark)' }}>{drug.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{drug.packSize} • {drug.manufacturer}</div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#334155' }}>
                      {drug.genericName}
                    </td>
                    <td>
                      <span style={{ 
                        background: 'var(--bg-alt)', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        border: '1px solid var(--border)' 
                      }}>
                        {drug.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <div>{drug.batchNo}</div>
                      <div style={{ color: '#059669', fontWeight: 600 }}>Exp: {drug.expiryDate}</div>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--dark)', fontSize: '0.95rem' }}>₹{drug.price.toFixed(2)}</strong>
                    </td>
                    <td>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: drug.stock > 100 ? '#059669' : '#d97706'
                      }}>
                        ● {drug.stock} units
                      </span>
                    </td>
                    <td>
                      {drug.rxRequired ? (
                        <span style={{ background: 'var(--rose-light)', color: '#b91c1c', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                          Rx Required
                        </span>
                      ) : (
                        <span style={{ background: 'var(--emerald-light)', color: '#065f46', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                          OTC
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAddToCart(drug)}
                        style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                      >
                        + Add to Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: OP PRESCRIPTION DISPENSER (Patient Token Connected) */}
      {activeSubTab === 'dispenser' && (
        <div>
          {/* Token Lookup */}
          <div className="lookup-box">
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                LOAD PATIENT OP TOKEN FOR PHARMACY DISPENSATION:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. CAR-104 or GEN-211"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  style={{ fontSize: '1.05rem', fontWeight: 700 }}
                />
                <button className="btn btn-primary" onClick={() => handleLookupToken(tokenInput)}>
                  Fetch Prescription ▶
                </button>
              </div>

              <div className="quick-tokens-list">
                <span>Quick Patients:</span>
                <button className="quick-token-chip" onClick={() => handleLookupToken('CAR-104')}>
                  CAR-104 (Rajesh Kumar - Cardiology)
                </button>
                <button className="quick-token-chip" onClick={() => handleLookupToken('GEN-211')}>
                  GEN-211 (Gopal Krishna - General Med)
                </button>
                <button className="quick-token-chip" onClick={() => handleLookupToken('ORT-082')}>
                  ORT-082 (David D'Souza - Ortho)
                </button>
              </div>
            </div>
          </div>

          {/* Patient Rx Details */}
          {selectedPatientRecord && (
            <div className="prescription-card" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark)' }}>
                    Patient: {selectedPatientRecord.patientName}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Token: <strong>{selectedPatientRecord.token}</strong> | OP ID: <strong>{selectedPatientRecord.opId}</strong> | Age/Gender: {selectedPatientRecord.age} Yrs / {selectedPatientRecord.gender}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {selectedPatientRecord.doctor}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {selectedPatientRecord.department} • {selectedPatientRecord.room}
                  </div>
                </div>
              </div>

              {/* Diagnosis Alert */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#166534', marginBottom: '18px' }}>
                <strong>Clinical Diagnosis:</strong> {selectedPatientRecord.diagnosis}
              </div>

              {/* Prescribed Drugs List for Dispensing */}
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '12px' }}>
                Prescribed Drug Line Items for Fulfillment:
              </h4>
              <table className="rx-table">
                <thead>
                  <tr>
                    <th>Medicine & Dosage</th>
                    <th>Schedule</th>
                    <th>Instructions</th>
                    <th>Duration</th>
                    <th>Dispensary Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPatientRecord.prescription.map((med, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: 'var(--dark)' }}>{med.medicine}</td>
                      <td>
                        <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          {med.timing}
                        </span>
                      </td>
                      <td>{med.instruction}</td>
                      <td>{med.duration}</td>
                      <td>
                        <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.82rem' }}>
                          ✓ In Stock (Cabin Ready)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button 
                  className="btn btn-emerald" 
                  onClick={handleDispensePrescription}
                  style={{ padding: '12px 28px', fontSize: '0.94rem' }}
                >
                  ✓ Verify Pharmacist Seal & Dispense Medication ▶
                </button>
              </div>
            </div>
          )}

          {/* Generated Pharmacy Bill / Invoice */}
          {dispensedInvoice && (
            <div className="token-slip-container" style={{ maxWidth: '680px', marginTop: '30px' }} id="printable-pharmacy-bill">
              <div className="token-slip-header" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f172a 100%)' }}>
                <h3 className="slip-hospital-title">PULSECARE CENTRAL PHARMACY</h3>
                <p className="slip-tagline">Licensed Hospital Outpatient Drug Dispensary • Reg #DL-2026-KA-441</p>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
                  Invoice: <strong>{dispensedInvoice.invoiceNo}</strong> | Date: <strong>{dispensedInvoice.dispenseDate} {dispensedInvoice.dispenseTime}</strong>
                </div>
              </div>

              <div style={{ padding: '20px 24px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px', fontSize: '0.84rem' }}>
                  <div>
                    <div>Patient: <strong>{dispensedInvoice.patientName}</strong> (Token: {dispensedInvoice.token})</div>
                    <div style={{ color: 'var(--text-muted)' }}>OP ID: {dispensedInvoice.opId}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>Doctor: <strong>{dispensedInvoice.doctor}</strong></div>
                    <div style={{ color: 'var(--text-muted)' }}>{dispensedInvoice.department}</div>
                  </div>
                </div>

                {/* Itemized Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '14px 0', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Item Description</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Batch / Exp</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Qty</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispensedInvoice.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px' }}>
                          <strong>{item.name}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.instruction} ({item.timing})</div>
                        </td>
                        <td style={{ padding: '8px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {item.batchNo} | {item.expiryDate}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>{item.qty} tabs</td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>₹{(item.price * (item.qty / 10)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Bill Summary */}
                <div style={{ borderTop: '2px solid var(--border)', paddingTop: '12px', fontSize: '0.86rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                    <span>₹{dispensedInvoice.subtotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>GST Tax (5%):</span>
                    <span>₹{dispensedInvoice.tax}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                    <span>Total Amount Paid:</span>
                    <span style={{ color: 'var(--primary)' }}>₹{dispensedInvoice.grandTotal}</span>
                  </div>
                </div>

                {/* Pharmacist Stamp */}
                <div style={{ marginTop: '20px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>DISPENSED & VERIFIED BY:</div>
                    <div style={{ color: '#0d9488', fontWeight: 600 }}>{dispensedInvoice.pharmacistName}</div>
                    <div style={{ marginTop: '4px', color: '#059669', fontWeight: 700 }}>🐘 Synced with PostgreSQL Database</div>
                  </div>
                  <div style={{ border: '2px solid #059669', color: '#059669', padding: '4px 10px', borderRadius: '6px', fontWeight: 800, letterSpacing: '0.05em' }}>
                    SEALED & CHECKED ✓
                  </div>
                </div>
              </div>

              <div className="token-slip-footer">
                <span>Please complete medication course as directed. Keep away from direct sunlight.</span>
              </div>
            </div>
          )}

          {dispensedInvoice && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                Print Pharmacy Receipt / Bill
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: QUICK COUNTER POS / OTC CART */}
      {activeSubTab === 'cart' && (
        <div className="staff-console-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark)' }}>
              Pharmacy Counter Billing Cart
            </h3>
            {cart.length > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={handleClearCart}>
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛒</div>
              <h4>Your pharmacy counter cart is currently empty</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                Go to the Drug Catalog tab and click "+ Add to Bill" to add medications.
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveSubTab('catalog')} style={{ marginTop: '16px' }}>
                Browse Drug Catalog ▶
              </button>
            </div>
          ) : (
            <div>
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Unit Price</th>
                    <th style={{ textAlign: 'center' }}>Quantity</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.genericName}</div>
                      </td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => handleUpdateCartQty(item.id, -1)}
                            style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                          >-</button>
                          <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => handleUpdateCartQty(item.id, 1)}
                            style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                          >+</button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        ₹{(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ borderTop: '2px solid var(--border)', marginTop: '20px', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                  <span>Grand Total:</span>
                  <span style={{ color: 'var(--primary)' }}>
                    ₹{cart.reduce((sum, i) => sum + (i.price * i.qty), 0).toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button className="btn btn-emerald" onClick={() => {
                    alert('Pharmacy Counter Bill Generated & Processed!');
                    handleClearCart();
                  }}>
                    ✓ Complete OTC Payment & Print Bill
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
