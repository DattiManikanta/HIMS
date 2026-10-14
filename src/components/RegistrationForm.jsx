import React, { useState, useEffect, useMemo } from 'react';

// Patient appointments queue initialized empty; strictly populated query-wise from database
const INITIAL_APPOINTMENTS = [];

const CONSULTANTS_ROSTER = [
  { name: 'SATYANARAYANA V VSN / ', code: 'EMP00006', spec: 'NEUROLOGIST', fee: 1000, depCode: 'NEU' },
  { name: 'R LALITHA LA', code: 'EMP00001', spec: 'SENIOR GENERAL PHYSICIAN / OPD', fee: 800, depCode: 'GEN' },
  { name: 'RAKESH TUMULA RT', code: 'EMP00002', spec: 'ORTHOPEDICS & SPINE SPECIALIST', fee: 1450, depCode: 'ORT' },
  { name: 'ANIL KUMAR MAHAPATRO AKM', code: 'EMP00003', spec: 'CARDIOLOGY & INTERVENTIONAL SPECIALIST', fee: 850, depCode: 'CAR' },
  { name: 'RAMESH NAIDU M RNM', code: 'EMP00004', spec: 'GENERAL MEDICINE & DIABETOLOGY', fee: 600, depCode: 'GEN' },
  { name: 'Dr. Ananya Iyer', code: 'EMP00005', spec: 'CHIEF CARDIOLOGIST', fee: 700, depCode: 'CAR' },
  { name: 'Dr. Sandeep K. Banerjee', code: 'EMP00007', spec: 'CHIEF PHYSICIAN', fee: 600, depCode: 'GEN' },
  { name: 'Dr. Vikramaditya Rathore', code: 'EMP00008', spec: 'CONSULTANT ORTHOPEDIC SURGEON', fee: 750, depCode: 'ORT' },
  { name: 'Dr. Shalini Deshmukh', code: 'EMP00009', spec: 'SENIOR PEDIATRICIAN', fee: 500, depCode: 'PED' },
  { name: 'Dr. Neil Chatterjee', code: 'EMP00010', spec: 'CLINICAL DERMATOLOGIST', fee: 650, depCode: 'DER' }
];

// Helper to format minutes into 12-hour AM/PM string (e.g. 08:30 AM)
function formatSlotTime(totalMins) {
  let h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  let displayH = h % 12;
  if (displayH === 0) displayH = 12;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(displayH)}:${pad(m)} ${ampm}`;
}

const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatToDdMmmYyyy(date) {
  if (!date) return '';
  const d = (date instanceof Date) ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = MONTH_NAMES_SHORT[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatToYyyyMmDd(date) {
  if (!date) return '';
  const d = (date instanceof Date) ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

function parseAnyDate(str) {
  if (!str) return null;
  if (str instanceof Date) return isNaN(str.getTime()) ? null : str;
  const s = String(str).trim();
  // YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(s)) {
    const parts = s.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  // DD-MMM-YYYY (e.g. 14-Oct-2026)
  const parts = s.split('-');
  if (parts.length === 3) {
    const d = Number(parts[0]);
    const m = MONTH_NAMES_SHORT.findIndex(x => x.toLowerCase() === parts[1].toLowerCase());
    const y = Number(parts[2]);
    if (!isNaN(d) && m !== -1 && !isNaN(y)) {
      return new Date(y, m, d);
    }
  }
  // DD/MM/YYYY
  const slashParts = s.split('/');
  if (slashParts.length === 3) {
    const d = Number(slashParts[0]);
    const m = Number(slashParts[1]) - 1;
    const y = Number(slashParts[2]);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      return new Date(y, m, d);
    }
  }
  const dt = new Date(s);
  return isNaN(dt.getTime()) ? null : dt;
}

// Age in Years, Months, Days calculation matching patientQueue.jsp lines 6511-6535
function getAgeInYMD(dobStr) {
  if (!dobStr) return { years: '', months: 0, days: 0 };
  const dob = parseAnyDate(dobStr);
  if (!dob) return { years: '', months: 0, days: 0 };
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days)
  };
}

// Format today's date into 'dd-MMM-yyyy' (e.g. 14-Oct-2026)
function getTodayDateFormatted() {
  return formatToDdMmmYyyy(new Date());
}

// Format today's date range into 'D Month, YYYY - D Month, YYYY'
function getTodayDateRangeFormatted() {
  const d = new Date();
  const day = d.getDate();
  const month = MONTH_NAMES_FULL[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month}, ${year} - ${day} ${month}, ${year}`;
}

// Custom DatePicker (matches bootstrap-datepicker from patientQueue.jsp)
function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  format = "dd-MMM-yyyy", // "dd-MMM-yyyy" or "yyyy-mm-dd"
  className = "",
  id,
  showYearSelect = false,
  alignRight = false,
  disableFuture = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);

  const initialDate = parseAnyDate(value) || new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  useEffect(() => {
    const d = parseAnyDate(value);
    if (d) {
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [value]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sun

  const handlePrevMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleSelectDay = (dayNum, e) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = new Date(viewYear, viewMonth, dayNum);
    const formatted = format === "yyyy-mm-dd" ? formatToYyyyMmDd(selected) : formatToDdMmmYyyy(selected);
    onChange(formatted);
    setIsOpen(false);
  };

  const handleSelectToday = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    const formatted = format === "yyyy-mm-dd" ? formatToYyyyMmDd(today) : formatToDdMmmYyyy(today);
    onChange(formatted);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  // Year options for fast dropdown
  const yearsOptions = [];
  const startYr = showYearSelect ? 1920 : 2020;
  const endYr = 2035;
  for (let y = endYr; y >= startYr; y--) {
    yearsOptions.push(y);
  }

  // Selected date comparison
  const parsedVal = parseAnyDate(value);
  const isSelected = (dayNum) => {
    if (!parsedVal) return false;
    return (
      parsedVal.getFullYear() === viewYear &&
      parsedVal.getMonth() === viewMonth &&
      parsedVal.getDate() === dayNum
    );
  };

  const today = new Date();
  const isToday = (dayNum) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === dayNum
    );
  };

  const isFuture = (dayNum) => {
    const d = new Date(viewYear, viewMonth, dayNum);
    d.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return d > now;
  };

  return (
    <div className="hims-datepicker-container" ref={containerRef}>
      <div className="hims-datepicker-input-wrap">
        <button
          type="button"
          className="hims-datepicker-icon-btn"
          onClick={() => setIsOpen(!isOpen)}
          title="Open Calendar Date Picker"
        >
          📅
        </button>
        <input
          type="text"
          id={id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`hims-datepicker-input ${className}`}
          autoComplete="off"
        />
      </div>

      {isOpen && (
        <div className={`hims-datepicker-dropdown ${alignRight ? 'align-right' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="hims-dp-header">
            <button type="button" className="hims-dp-nav-btn" onClick={handlePrevMonth} title="Previous Month">
              ◀
            </button>
            <div className="hims-dp-title">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="hims-dp-select"
              >
                {MONTH_NAMES_SHORT.map((name, i) => (
                  <option key={name} value={i}>{MONTH_NAMES_FULL[i]}</option>
                ))}
              </select>
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="hims-dp-select"
              >
                {yearsOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <button type="button" className="hims-dp-nav-btn" onClick={handleNextMonth} title="Next Month">
              ▶
            </button>
          </div>

          <div className="hims-dp-grid">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => (
              <div key={w} className="hims-dp-weekday">{w}</div>
            ))}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="hims-dp-day empty" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const sel = isSelected(dayNum);
              const tod = isToday(dayNum);
              const fut = disableFuture && isFuture(dayNum);
              return (
                <button
                  type="button"
                  key={dayNum}
                  disabled={fut}
                  onClick={(e) => !fut && handleSelectDay(dayNum, e)}
                  className={`hims-dp-day ${sel ? 'selected' : ''} ${tod ? 'today' : ''} ${fut ? 'disabled' : ''}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          <div className="hims-dp-footer">
            <button type="button" className="hims-dp-footer-btn" onClick={handleSelectToday}>
              Today
            </button>
            <button type="button" className="hims-dp-footer-btn" onClick={handleClear}>
              Clear
            </button>
            <button type="button" className="hims-dp-footer-btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// Custom DateRangePicker matching #reportRangeDiv in patientQueue.jsp (lines 397-414 & 14060-14120)
function CustomDateRangePicker({
  value,
  onChange,
  onRangeApply
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);

  const today = new Date();
  const [rangeStart, setRangeStart] = useState(today);
  const [rangeEnd, setRangeEnd] = useState(today);
  const [activePreset, setActivePreset] = useState('today');

  // Month navigation for left calendar
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Fast manual input dates
  const [inputFrom, setInputFrom] = useState(formatToDdMmmYyyy(today));
  const [inputTo, setInputTo] = useState(formatToDdMmmYyyy(today));

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  const applyRange = (start, end, presetName = '') => {
    const s = start || new Date();
    const e = end || s;
    const startStr = `${s.getDate()} ${MONTH_NAMES_FULL[s.getMonth()]}, ${s.getFullYear()}`;
    const endStr = `${e.getDate()} ${MONTH_NAMES_FULL[e.getMonth()]}, ${e.getFullYear()}`;
    const rangeText = `${startStr} - ${endStr}`;
    setRangeStart(s);
    setRangeEnd(e);
    setInputFrom(formatToDdMmmYyyy(s));
    setInputTo(formatToDdMmmYyyy(e));
    if (presetName) setActivePreset(presetName);
    onChange(rangeText);
    if (onRangeApply) onRangeApply(s, e);
    setIsOpen(false);
  };

  const selectPreset = (type) => {
    const t = new Date();
    let start = new Date(t);
    let end = new Date(t);

    if (type === 'today') {
      start = t;
      end = t;
    } else if (type === 'yesterday') {
      start = new Date(t);
      start.setDate(t.getDate() - 1);
      end = new Date(start);
    } else if (type === 'last7') {
      start = new Date(t);
      start.setDate(t.getDate() - 6);
      end = t;
    } else if (type === 'last30') {
      start = new Date(t);
      start.setDate(t.getDate() - 29);
      end = t;
    } else if (type === 'thisMonth') {
      start = new Date(t.getFullYear(), t.getMonth(), 1);
      end = new Date(t.getFullYear(), t.getMonth() + 1, 0);
    } else if (type === 'last6Months') {
      start = new Date(t.getFullYear(), t.getMonth() - 6, 1);
      end = t;
    } else if (type === 'all') {
      setActivePreset('all');
      onChange("All Appointments");
      if (onRangeApply) onRangeApply(null, null);
      setIsOpen(false);
      return;
    }

    applyRange(start, end, type);
  };

  const handleDayClick = (date) => {
    setActivePreset('custom');
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
      setInputFrom(formatToDdMmmYyyy(date));
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
        setInputFrom(formatToDdMmmYyyy(date));
        setInputTo(formatToDdMmmYyyy(rangeStart));
      } else {
        setRangeEnd(date);
        setInputTo(formatToDdMmmYyyy(date));
      }
    }
  };

  const isInRange = (d) => {
    if (!rangeStart || !rangeEnd) return false;
    const s = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate()).getTime();
    const e = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate()).getTime();
    const cur = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    return cur > s && cur < e;
  };

  const isStart = (d) => {
    if (!rangeStart) return false;
    return (
      d.getFullYear() === rangeStart.getFullYear() &&
      d.getMonth() === rangeStart.getMonth() &&
      d.getDate() === rangeStart.getDate()
    );
  };

  const isEnd = (d) => {
    if (!rangeEnd) return false;
    return (
      d.getFullYear() === rangeEnd.getFullYear() &&
      d.getMonth() === rangeEnd.getMonth() &&
      d.getDate() === rangeEnd.getDate()
    );
  };

  const handleApplyCustom = () => {
    const s = parseAnyDate(inputFrom) || rangeStart || new Date();
    const e = parseAnyDate(inputTo) || rangeEnd || s;
    applyRange(s, e, 'custom');
  };

  const renderMonthCalendar = (y, m, isLeft) => {
    const daysCount = new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(y, m, 1).getDay();

    return (
      <div className="hims-dr-cal-box" key={`${y}-${m}`}>
        <div className="hims-dr-cal-header">
          {isLeft ? (
            <button
              type="button"
              className="hims-dp-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (viewMonth === 0) {
                  setViewMonth(11);
                  setViewYear(prev => prev - 1);
                } else {
                  setViewMonth(prev => prev - 1);
                }
              }}
              title="Previous Month"
            >
              ◀
            </button>
          ) : <div style={{ width: '24px' }}></div>}
          <span style={{ fontWeight: '700', fontSize: '12px', color: '#1e293b' }}>
            {MONTH_NAMES_FULL[m]} {y}
          </span>
          {!isLeft ? (
            <button
              type="button"
              className="hims-dp-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (viewMonth === 11) {
                  setViewMonth(0);
                  setViewYear(prev => prev + 1);
                } else {
                  setViewMonth(prev => prev + 1);
                }
              }}
              title="Next Month"
            >
              ▶
            </button>
          ) : <div style={{ width: '24px' }}></div>}
        </div>

        <div className="hims-dr-grid">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => (
            <div key={w} className="hims-dr-weekday">{w}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="hims-dr-day-cell empty" />
          ))}
          {Array.from({ length: daysCount }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(y, m, dayNum);
            const startSelected = isStart(thisDate);
            const endSelected = isEnd(thisDate);
            const inRangeSelected = isInRange(thisDate);
            const isTodayCell = (
              today.getFullYear() === y &&
              today.getMonth() === m &&
              today.getDate() === dayNum
            );

            return (
              <button
                type="button"
                key={dayNum}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDayClick(thisDate);
                }}
                className={`hims-dr-day-cell ${startSelected ? 'range-start' : ''} ${endSelected ? 'range-end' : ''} ${inRangeSelected ? 'in-range' : ''} ${isTodayCell ? 'today-dot' : ''}`}
                title={formatToDdMmmYyyy(thisDate)}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;

  return (
    <div className="hims-daterange-container" ref={containerRef}>
      <button
        type="button"
        id="reportRangeDiv"
        className="reg-date-range-box hims-report-range-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Click to select Date Range (patientQueue.jsp daterangepicker)"
      >
        <span className="cal-icon" style={{ fontSize: '15px' }}>📅</span>
        <span className="dr-val-text">{value || getTodayDateRangeFormatted()}</span>
        <span className="caret-icon" style={{ marginLeft: '8px', fontSize: '10px', color: '#64748b' }}>▼</span>
      </button>

      <input type="hidden" id="reportFromDt" name="reportFromDt" value={formatToDdMmmYyyy(rangeStart || today)} />
      <input type="hidden" id="reportToDt" name="reportToDt" value={formatToDdMmmYyyy(rangeEnd || today)} />

      {isOpen && (
        <div className="hims-daterange-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="hims-dr-main-layout">
            {/* Presets Sidebar matching patientQueue.jsp */}
            <div className="hims-dr-sidebar-presets">
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>
                Quick Ranges:
              </div>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'today' ? 'active' : ''}`}
                onClick={() => selectPreset('today')}
              >
                📅 Today
              </button>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'yesterday' ? 'active' : ''}`}
                onClick={() => selectPreset('yesterday')}
              >
                ◀ Yesterday
              </button>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'last7' ? 'active' : ''}`}
                onClick={() => selectPreset('last7')}
              >
                7️⃣ Last 7 Days
              </button>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'last30' ? 'active' : ''}`}
                onClick={() => selectPreset('last30')}
              >
                🗓️ Last 30 Days
              </button>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'thisMonth' ? 'active' : ''}`}
                onClick={() => selectPreset('thisMonth')}
              >
                📆 This Month
              </button>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'last6Months' ? 'active' : ''}`}
                onClick={() => selectPreset('last6Months')}
              >
                ⏮️ Last 6 Months
              </button>
              <button
                type="button"
                className={`hims-dr-preset-item-btn ${activePreset === 'all' ? 'active' : ''}`}
                onClick={() => selectPreset('all')}
              >
                🌐 Show All
              </button>
            </div>

            {/* Dual Calendar Views */}
            <div className="hims-dr-calendars-wrap">
              {renderMonthCalendar(viewYear, viewMonth, true)}
              {renderMonthCalendar(rightYear, rightMonth, false)}
            </div>
          </div>

          {/* Bottom Bar: Manual Input & Actions */}
          <div className="hims-dr-bottom-bar">
            <div className="hims-dr-inputs-inline">
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>From:</span>
              <input
                type="text"
                value={inputFrom}
                onChange={(e) => setInputFrom(e.target.value)}
                placeholder="dd-MMM-yyyy"
                className="hims-dr-mini-input"
              />
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>To:</span>
              <input
                type="text"
                value={inputTo}
                onChange={(e) => setInputTo(e.target.value)}
                placeholder="dd-MMM-yyyy"
                className="hims-dr-mini-input"
              />
            </div>
            <div className="hims-dr-actions">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setIsOpen(false)}
                style={{ padding: '4px 10px', fontSize: '11.5px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleApplyCustom}
                style={{ background: '#0284c7', borderColor: '#0284c7', color: '#fff', padding: '4px 12px', fontSize: '11.5px' }}
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Generate slots for a doctor & date matching Indus schedule (strictly query-wise)
function generateDoctorSlots(doctorName, dateStr, appointmentsList, extraTokens = 0) {
  const startHour = 8;
  const startMin = 30;
  const totalSlotsCount = 12 + (extraTokens || 0);
  const slots = [];

  // Determine booked tokens strictly from existing appointments query-wise (no fake dummy bookings)
  const bookedSet = new Set();
  
  if (appointmentsList && appointmentsList.length > 0) {
    appointmentsList.forEach(apt => {
      if (apt.consultant === doctorName) {
        const numMatch = String(apt.token).match(/\d+/);
        if (numMatch) {
          const num = parseInt(numMatch[0], 10);
          bookedSet.add(num);
        }
      }
    });
  }

  for (let i = 1; i <= totalSlotsCount; i++) {
    const startMins = startHour * 60 + startMin + (i - 1) * 20;
    const endMins = startMins + 20;
    const timeLabel = `${formatSlotTime(startMins)}-${formatSlotTime(endMins)}(${i})`;
    const isBooked = bookedSet.has(i);

    slots.push({
      tokenNumber: i,
      timeLabel: timeLabel,
      isBooked: isBooked
    });
  }

  return slots;
}

export function RegistrationForm({ 
  departments, 
  doctors, 
  onRegisterSuccess, 
  onGoToVitals, 
  records,
  activeTab: propActiveTab,
  onTabChange: propOnTabChange
}) {
  // Tabs: 'appointments' (Tab 1: Saved List) vs 'add_appointment' (Tab 2: Data Entry Fields)
  const [internalTab, setInternalTab] = useState('appointments');
  const activeTab = propActiveTab || internalTab;
  const setActiveTab = (tab) => {
    setInternalTab(tab);
    if (propOnTabChange) propOnTabChange(tab);
  };
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedHospital, setSelectedHospital] = useState('INDUS HEALTH CITY');
  const [dateRange, setDateRange] = useState(getTodayDateRangeFormatted());
  const [dateFilterRange, setDateFilterRange] = useState(null);
  const [printModal, setPrintModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [vitalsDrawer, setVitalsDrawer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  // Existing Patient Search in Tab 2 State (query-wise based on PatientMapper DetailedView)
  const [existingSearchTerm, setExistingSearchTerm] = useState('');
  const [existingSearchResults, setExistingSearchResults] = useState([]);
  const [isSearchingExisting, setIsSearchingExisting] = useState(false);
  const [isExistingPatientSelected, setIsExistingPatientSelected] = useState(false);
  const [selectedPatientUmr, setSelectedPatientUmr] = useState('');

  // Fetch live queue from backend based strictly on query-wise data retrieval
  const fetchServerQueue = async () => {
    try {
      const res = await fetch('/patient/patientQueue');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setAppointments(data);
          return;
        }
      }
      const fallbackRes = await fetch('/api/patient/queue');
      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        if (Array.isArray(fbData)) {
          setAppointments(fbData);
        }
      }
    } catch (err) {
      console.warn('Queue fetch warning:', err);
    }
  };

  useEffect(() => {
    fetchServerQueue();
  }, []);

  // Merge newly registered records from App into appointments if present
  useEffect(() => {
    if (records && Object.keys(records).length > 0) {
      const persistedList = Object.values(records)
        .filter(rec => rec && (rec.umrNo || rec.opId || rec.patientCode))
        .map(rec => ({
          umrNo: rec.umrNo || rec.opId || rec.patientCode,
          token: rec.token || rec.tokenNum || '1',
          patientName: (rec.patientName || rec.pname || '').toUpperCase(),
          genderAge: rec.genderAge || `${(rec.gender || 'MALE').toUpperCase()}/${rec.age || 40}yrs`,
          gender: rec.gender || 'MALE',
          age: rec.age || 40,
          appointmentDate: rec.appointmentDate || rec.apptDt || rec.visitDate || '',
          consultant: rec.consultant || rec.docName || rec.doctor || '',
          category: rec.category || rec.patientCategory || 'GENERAL',
          billStatus: rec.billStatus || 'PAID',
          regCash: rec.payment ? (rec.payment.regFee || 50) : (rec.regCash || 50),
          regCredit: 0,
          regUpi: 0,
          conCash: rec.payment ? (rec.payment.consultationFee || 1000) : (rec.conCash || 1000),
          conCredit: 0,
          conUpi: 0,
          phone: rec.phone || rec.mobNum || '',
          vitals: rec.vitals || null
        }));

      if (persistedList.length > 0) {
        setAppointments(prev => {
          const existingUmrs = new Set(prev.map(p => p.umrNo).filter(Boolean));
          const newToAdd = persistedList.filter(p => p.umrNo && !existingUmrs.has(p.umrNo));
          return [...newToAdd, ...prev];
        });
      }
    }
  }, [records]);

  // Tab 2 Form Data State (Matching Screenshot 2 & Exact Doctor Details - ZERO dummy data)
  const [formData, setFormData] = useState({
    title: 'Mr.',
    patientName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    years: '',
    months: 0,
    days: 0,
    mobile: '',
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    village: '',
    address: '',
    walkIn: 'Walk In',
    organization: '--Select Organization--',
    category: 'GENERAL - TRI',
    occupation: '--Select Occupation--',
    idType: 'Aadhaar',
    idNumber: '',
    careBy: 'Self',
    parentOrHusband: '',
    religion: 'Hindu',
    maritalStatus: 'Married',
    bloodGroup: 'B+',
    healthIssue: '',
    // Appointment Details (Selected dynamically on step-by-step workflow)
    location: '',
    appointmentDate: getTodayDateFormatted(),
    token: '',
    consultant: '',
    doctorCode: '',
    specialization: '',
    // Fee Details
    regFee: 50,
    regFinalAmt: 50,
    consFee: 1000,
    discPercent: 0,
    discAmt: 0,
    consFinalAmt: 1000,
    totalAmt: 1050,
    totalBillAmt: 1050,
    amtReceived: 1050,
    balance: 0,
    status: 'PAID',
    authorizedBy: 'Admin',
    // Payment Mode
    paymentMode: 'Cash',
    paymentAmt: 1050
  });

  // Doctor Slots & Extra Tokens State (Tokens OPEN after Doctor is selected)
  const [extraTokensCount, setExtraTokensCount] = useState(0);
  const [selectedSlotToken, setSelectedSlotToken] = useState(null);
  const [isSlotsOpen, setIsSlotsOpen] = useState(false);

  // Dynamic slot generation for currently selected doctor, date, and extra tokens
  const currentDoctorSlots = (React.useMemo || useMemo || ((fn) => fn()))(() => {
    if (!formData.consultant) return [];
    return generateDoctorSlots(
      formData.consultant,
      formData.appointmentDate,
      appointments,
      extraTokensCount
    );
  }, [formData.consultant, formData.appointmentDate, appointments, extraTokensCount]);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Search Existing Patient query-wise from database
  const handleSearchExisting = async (e) => {
    if (e) e.preventDefault();
    if (!existingSearchTerm.trim()) {
      showNotification('Please enter UMR Number, Mobile, or Patient Name to search.');
      return;
    }
    setIsSearchingExisting(true);
    try {
      const res = await fetch(`/patient/searchPatients?term=${encodeURIComponent(existingSearchTerm.trim())}`);
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          setExistingSearchResults(list);
          showNotification(`✓ Found ${list.length} existing patient record(s) in database.`);
        } else {
          setExistingSearchResults([]);
          showNotification(`No existing records found for "${existingSearchTerm}". Enter details below to register as New Patient.`);
        }
      } else {
        setExistingSearchResults([]);
      }
    } catch (err) {
      console.warn('Search existing error:', err);
      setExistingSearchResults([]);
    } finally {
      setIsSearchingExisting(false);
    }
  };

  // Select an existing patient & auto-populate DetailedView fields query-wise
  const handleSelectExistingPatient = async (item) => {
    const umr = item.umrNo || item.patientCode;
    try {
      const res = await fetch(`/patient/getPatientDetails?umrNo=${encodeURIComponent(umr)}`);
      let details = item;
      if (res.ok) {
        const full = await res.json();
        if (full && !full.error) details = { ...item, ...full };
      }

      setFormData(prev => ({
        ...prev,
        title: details.title || prev.title,
        patientName: details.pname || details.patientName || '',
        lastName: details.lastName || '',
        gender: details.gender || 'Male',
        dob: details.dob || '',
        years: details.age || '',
        mobile: details.mobNum || details.phone || '',
        address: details.addr || details.address || '',
        village: details.village || '',
        city: details.city || 'Visakhapatnam',
        state: details.state || 'Andhra Pradesh',
        country: details.country || 'India',
        bloodGroup: details.bloodGrp || details.bloodGroup || 'B+',
        category: details.category || details.patientCategory || 'GENERAL - TRI',
        idType: details.idProofType || 'Aadhaar',
        idNumber: details.idProofNum || '',
        parentOrHusband: details.parentName || ''
      }));

      setIsExistingPatientSelected(true);
      setSelectedPatientUmr(umr);
      setExistingSearchResults([]);
      showNotification(`✓ Loaded existing patient ${details.patientName || details.pname} (${umr}) query-wise!`);
    } catch (err) {
      console.warn('Error fetching patient details:', err);
    }
  };

  const handleClearExistingPatient = () => {
    setIsExistingPatientSelected(false);
    setSelectedPatientUmr('');
    setExistingSearchTerm('');
    setExistingSearchResults([]);
    setFormData(prev => ({
      ...prev,
      patientName: '',
      lastName: '',
      dob: '',
      years: '',
      mobile: '',
      village: '',
      address: '',
      idNumber: '',
      parentOrHusband: '',
      healthIssue: '',
      token: ''
    }));
    showNotification('Switched to New Patient Registration mode.');
  };

  // Step 1: Hospital Change Handler
  const handleHospitalChange = (hospitalName) => {
    setFormData(prev => ({
      ...prev,
      location: hospitalName,
      consultant: '',
      doctorCode: '',
      specialization: '',
      token: ''
    }));
    setIsSlotsOpen(false); // Close tokens until doctor is chosen
    setSelectedSlotToken(null);
    if (hospitalName) {
      showNotification(`🏥 Hospital selected: ${hospitalName}. Please choose a Doctor to OPEN tokens.`);
    }
  };

  // Step 2: Doctor Change Handler (ONCHANGE OPENS TOKENS)
  const handleConsultantChange = (name) => {
    if (!name) {
      setFormData(prev => ({
        ...prev,
        consultant: '',
        doctorCode: '',
        specialization: '',
        token: ''
      }));
      setIsSlotsOpen(false);
      setSelectedSlotToken(null);
      return;
    }

    const doc = CONSULTANTS_ROSTER.find(c => c.name === name) || CONSULTANTS_ROSTER[0];
    const total = (formData.regFinalAmt || 50) + doc.fee - (formData.discAmt || 0);
    setExtraTokensCount(0);

    // Compute slots for newly selected doctor
    const newSlots = generateDoctorSlots(doc.name, formData.appointmentDate, appointments, 0);
    // Find first available green slot
    const firstAvail = newSlots.find(s => !s.isBooked) || newSlots[0];
    const chosenToken = firstAvail ? firstAvail.tokenNumber : 1;

    setSelectedSlotToken(chosenToken);
    setIsSlotsOpen(true); // <--- OPEN TOKENS IMMEDIATELY ON DOCTOR ONCHANGE!

    setFormData(prev => ({
      ...prev,
      location: prev.location || 'INDUS HEALTH CITY',
      consultant: doc.name,
      doctorCode: doc.code,
      specialization: doc.spec,
      consFee: doc.fee,
      consFinalAmt: doc.fee,
      totalAmt: total,
      totalBillAmt: total,
      amtReceived: total,
      paymentAmt: total,
      token: String(chosenToken)
    }));

    showNotification(`✓ Doctor ${doc.name} (${doc.code}) selected — Token slots OPENED!`);
  };

  // Click on a slot pill - user can select ANY token of their choice, turning it to OCCUPIED RED
  const handleSlotClick = (slot) => {
    const tokenNum = slot.tokenNumber;
    setSelectedSlotToken(tokenNum);
    setFormData(prev => ({
      ...prev,
      token: String(tokenNum)
    }));
    showNotification(`✓ Wish Token #${tokenNum} Selected! Marked as OCCUPIED (RED) for Dr. ${formData.consultant}`);
  };

  // Add extra / emergency token (+)
  const handleAddExtraToken = () => {
    const nextCount = extraTokensCount + 1;
    setExtraTokensCount(nextCount);
    const nextTokenNum = 12 + nextCount;
    setSelectedSlotToken(nextTokenNum);
    setFormData(prev => ({
      ...prev,
      token: String(nextTokenNum)
    }));
    showNotification(`✓ Added Extra Emergency Token #${nextTokenNum} for Dr. ${formData.consultant}`);
  };

  // DOB & Age auto-sync matching patientQueue.jsp (lines 6465-6535)
  const handleDobChange = (dobStr) => {
    if (!dobStr) {
      setFormData(prev => ({ ...prev, dob: '', years: '', months: 0, days: 0 }));
      return;
    }
    const ageParts = getAgeInYMD(dobStr);
    setFormData(prev => ({
      ...prev,
      dob: dobStr,
      years: ageParts.years,
      months: ageParts.months,
      days: ageParts.days
    }));
  };

  const handleAgeChange = (field, val) => {
    setFormData(prev => {
      const numVal = val === '' ? '' : parseInt(val, 10);
      const updated = { ...prev, [field]: numVal };
      const y = parseInt(field === 'years' ? numVal : updated.years, 10) || 0;
      const m = parseInt(field === 'months' ? numVal : updated.months, 10) || 0;
      const d = parseInt(field === 'days' ? numVal : updated.days, 10) || 0;
      if (y > 0 || m > 0 || d > 0) {
        const today = new Date();
        const calcDob = new Date(today.getFullYear() - y, today.getMonth() - m, today.getDate() - d);
        updated.dob = formatToYyyyMmDd(calcDob);
      } else if (val === '') {
        updated.dob = '';
      }
      return updated;
    });
  };

  // Handle Edit Patient
  const handleEditPatient = (row) => {
    setIsEditMode(true);
    setEditingPatient(row);

    const rawName = row.pname || row.patientName || '';
    const parts = rawName.split(' ');
    let title = row.title || 'Mr.';
    let pName = rawName;
    let lName = row.lastName || '';

    if (!row.title && parts.length > 1 && ['Mr', 'Mr.', 'Mrs', 'Mrs.', 'Ms', 'Ms.', 'Baby', 'Master', 'Dr', 'Dr.'].includes(parts[0])) {
      title = parts[0].endsWith('.') ? parts[0] : `${parts[0]}.`;
      pName = parts.slice(1).join(' ');
    }

    setFormData(prev => ({
      ...prev,
      title: title,
      patientName: pName,
      lastName: lName,
      gender: row.gender || (row.genderAge ? row.genderAge.split('/')[0] : 'Male'),
      years: row.age || 40,
      mobile: row.mobNum || row.phone || '',
      consultant: row.consultant || row.docName || 'SATYANARAYANA V VSN',
      category: row.patientCategory || row.category || 'GENERAL - TRI',
      address: row.address || row.addr || '',
      village: row.village || '',
      city: row.city || 'Visakhapatnam',
      token: row.tokenNum || row.token || '',
      regFee: row.regFee != null ? row.regFee : 50,
      regFinalAmt: row.regFee != null ? row.regFee : 50,
      consFee: row.consFee != null ? row.consFee : 1000,
      consFinalAmt: row.consFee != null ? row.consFee : 1000,
      totalBillAmt: row.totAmt != null ? row.totAmt : 1050,
      paymentMode: (row.regUpi > 0 || row.conUpi > 0) ? 'UPI' : (row.regCredit > 0 || row.conCredit > 0) ? 'Credit' : 'Cash'
    }));

    setActiveTab('add_appointment');
    showNotification(`✏️ Loaded ${row.patientName} (${row.umrNo}) into form for editing.`);
  };

  // Handle Delete Patient
  const handleDeletePatient = async (row) => {
    if (window.confirm(`Are you sure you want to remove patient ${row.patientName} (${row.umrNo}) from active queue?`)) {
      try {
        await fetch(`/api/patient/delete?umrNo=${encodeURIComponent(row.umrNo)}`, { method: 'POST' });
        setAppointments(prev => prev.filter(p => p.umrNo !== row.umrNo));
        showNotification(`🗑️ Patient ${row.patientName} (${row.umrNo}) removed from queue.`);
      } catch (err) {
        console.warn('Delete error:', err);
      }
    }
  };

  // Handle Form Submission (Save New or Update Existing Patient)
  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (!formData.patientName.trim()) {
      alert('Please enter Patient Name.');
      return;
    }

    const fullName = `${formData.title} ${formData.patientName} ${formData.lastName}`.trim().toUpperCase();

    // -------------------------------------------------------------
    // UPDATE PATIENT (When in Edit Mode)
    // -------------------------------------------------------------
    if (isEditMode && editingPatient) {
      const updatePayload = {
        umrNo: editingPatient.umrNo,
        patientId: editingPatient.patientId,
        patientName: formData.patientName.trim(),
        pname: formData.patientName.trim(),
        lastName: formData.lastName.trim(),
        title: formData.title,
        gender: formData.gender,
        age: formData.years,
        years: formData.years,
        phone: formData.mobile,
        mobile: formData.mobile,
        consultant: formData.consultant,
        doctor: formData.consultant,
        category: formData.category,
        address: formData.address,
        village: formData.village,
        city: formData.city,
        bloodGroup: formData.bloodGroup
      };

      try {
        await fetch('/api/patient/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        });
      } catch (err) {
        console.warn('Update API error:', err);
      }

      setAppointments(prev => prev.map(a => {
        if (a.umrNo === editingPatient.umrNo) {
          return {
            ...a,
            patientName: fullName,
            pname: formData.patientName,
            lastName: formData.lastName,
            title: formData.title,
            genderAge: `${formData.gender.toUpperCase()}/${formData.years}yrs`,
            gender: formData.gender,
            age: formData.years,
            phone: formData.mobile,
            consultant: formData.consultant,
            category: formData.category,
            address: formData.address,
            village: formData.village
          };
        }
        return a;
      }));

      showNotification(`✓ Patient ${fullName} (${editingPatient.umrNo}) updated in database!`);
      setIsEditMode(false);
      setEditingPatient(null);
      setActiveTab('appointments');
      fetchServerQueue();
      return;
    }

    // -------------------------------------------------------------
    // REGISTER NEW PATIENT
    // -------------------------------------------------------------
    const regPayload = {
      patientName: formData.patientName.trim(),
      pname: formData.patientName.trim(),
      lastName: formData.lastName.trim(),
      title: formData.title,
      gender: formData.gender,
      age: formData.years,
      years: formData.years,
      phone: formData.mobile,
      mobile: formData.mobile,
      consultant: formData.consultant,
      doctor: formData.consultant,
      category: formData.category,
      paymentMode: formData.paymentMode,
      regFee: formData.regFinalAmt,
      consFee: formData.consFinalAmt,
      totalAmount: formData.totalBillAmt,
      address: formData.address,
      village: formData.village,
      city: formData.city,
      bloodGroup: formData.bloodGroup,
      healthIssue: formData.healthIssue,
      idProofType: formData.idType,
      idProofNum: formData.idNumber,
      parentOrHusband: formData.parentOrHusband
    };

    let newUmrNo = `UMR${334253 + appointments.length + 1}`;
    let tokenStr = formData.token || `OPD-${120 + appointments.length + 1}`;

    try {
      const resp = await fetch('/api/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regPayload)
      });
      if (resp.ok) {
        const resJson = await resp.json();
        if (resJson.umrNo) newUmrNo = resJson.umrNo;
        if (resJson.tokenNum) tokenStr = resJson.tokenNum;
      }
    } catch (err) {
      console.warn('Register API error:', err);
    }

    const newAppointmentRecord = {
      umrNo: newUmrNo,
      token: tokenStr,
      patientName: fullName,
      genderAge: `${formData.gender.toUpperCase()}/${formData.years}yrs`,
      gender: formData.gender,
      age: formData.years,
      appointmentDate: formData.appointmentDate,
      consultant: formData.consultant,
      category: formData.category,
      billStatus: 'PAID',
      regCash: formData.paymentMode === 'Cash' ? formData.regFinalAmt : 0,
      regCredit: formData.paymentMode === 'Credit' ? formData.regFinalAmt : 0,
      regUpi: formData.paymentMode === 'UPI' ? formData.regFinalAmt : 0,
      conCash: formData.paymentMode === 'Cash' ? formData.consFinalAmt : 0,
      conCredit: formData.paymentMode === 'Credit' ? formData.consFinalAmt : 0,
      conUpi: formData.paymentMode === 'UPI' ? formData.consFinalAmt : 0,
      phone: formData.mobile,
      vitals: { bp: '120/80', pulse: '74', spo2: '99%', temp: '98.6', weight: '65' }
    };

    // Add to local list at top
    setAppointments(prev => [newAppointmentRecord, ...prev]);

    // Parent callback
    if (onRegisterSuccess) {
      const matchingDoc = CONSULTANTS_ROSTER.find(c => c.name === formData.consultant);
      onRegisterSuccess({
        patientName: fullName,
        age: formData.years,
        gender: formData.gender,
        phone: formData.mobile,
        bloodGroup: formData.bloodGroup,
        departmentName: matchingDoc ? matchingDoc.spec : 'General Medicine',
        departmentCode: matchingDoc ? matchingDoc.depCode : 'GEN',
        doctor: formData.consultant,
        room: 'OPD Cabin 101',
        priority: 'Regular',
        opId: newUmrNo,
        token: tokenStr,
        payment: {
          regFee: formData.regFinalAmt,
          consultationFee: formData.consFinalAmt,
          totalAmount: formData.totalBillAmt,
          paymentMethod: formData.paymentMode,
          paymentStatus: 'Paid',
          transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
        }
      });
    }

    // Switch to Tab 1
    setActiveTab('appointments');
    showNotification(`✓ Patient ${fullName} successfully registered (${newUmrNo}). Saved to database.`);

    // Reset form
    setFormData(prev => ({
      ...prev,
      patientName: '',
      lastName: '',
      mobile: '',
      village: '',
      address: '',
      idNumber: '',
      parentOrHusband: '',
      healthIssue: '',
      token: `OPD-${Math.floor(120 + appointments.length + 2)}`
    }));

    fetchServerQueue();
  };

  // Export to Excel / CSV
  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "UMR No,Patient Name,Gender/Age,Appointment Date,Consultant,Category,Bill Status,Reg Cash,Con Cash,Paid Amount\n";
    appointments.forEach(row => {
      const paid = (row.regCash || 0) + (row.conCash || 0) + (row.regUpi || 0) + (row.conUpi || 0);
      csvContent += `${row.umrNo},"${row.patientName}",${row.genderAge},${row.appointmentDate},"${row.consultant}",${row.category},${row.billStatus},${row.regCash},${row.conCash},${paid}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Indus_Hospitals_Appointments_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("📥 Appointments list exported to Excel (CSV).");
  };

  // Filtered appointments (by searchTerm and dateFilterRange matching patientQueue.jsp)
  const filteredAppointments = appointments.filter(row => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = (
        (row.umrNo && row.umrNo.toLowerCase().includes(term)) ||
        (row.patientName && row.patientName.toLowerCase().includes(term)) ||
        (row.consultant && row.consultant.toLowerCase().includes(term)) ||
        (row.phone && row.phone.includes(term))
      );
      if (!matchesSearch) return false;
    }
    if (dateFilterRange && dateFilterRange.start && dateFilterRange.end) {
      const rowDate = parseAnyDate(row.appointmentDate);
      if (rowDate) {
        const startCheck = new Date(dateFilterRange.start);
        startCheck.setHours(0, 0, 0, 0);
        const endCheck = new Date(dateFilterRange.end);
        endCheck.setHours(23, 59, 59, 999);
        if (rowDate < startCheck || rowDate > endCheck) {
          return false;
        }
      }
    }
    return true;
  });

  // Calculate Summary Metrics Bar
  const totalPatients = appointments.length;
  const regCashTotal = appointments.reduce((sum, a) => sum + (a.regCash || 0), 0);
  const regCardTotal = appointments.reduce((sum, a) => sum + (a.regCredit || 0), 0);
  const regUpiTotal = appointments.reduce((sum, a) => sum + (a.regUpi || 0), 0);
  const consCashTotal = appointments.reduce((sum, a) => sum + (a.conCash || 0), 0);
  const consCardTotal = appointments.reduce((sum, a) => sum + (a.conCredit || 0), 0);
  const consUpiTotal = appointments.reduce((sum, a) => sum + (a.conUpi || 0), 0);
  const paidAmtTotal = regCashTotal + regCardTotal + regUpiTotal + consCashTotal + consCardTotal + consUpiTotal;

  return (
    <div className="patient-reg-page">
      {/* Toast Alert */}
      {toast && (
        <div className="patient-reg-toast">
          <span>{toast}</span>
          <button onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Top Breadcrumb & User Info Header */}
      <div className="patient-reg-top-bar">
        <div className="reg-center-title">
          <h1>Patient Registration</h1>
        </div>
        <div className="reg-top-right">
          <span className="reg-breadcrumb">
            <span style={{ color: '#dc2626' }}>⌂ Home</span> &gt; Patient Management &gt; Patient Queue
          </span>
          <div className="reg-top-icons">
            <button 
              className="reg-icon-btn refresh" 
              onClick={() => {
                fetchServerQueue();
                showNotification("🔄 Data refreshed from database.");
              }} 
              title="Refresh Appointments"
            >
              🔄
            </button>
            <button 
              className="reg-icon-btn save" 
              onClick={handleSave} 
              title="Save Record"
            >
              💾
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar (Exact Screenshot 1 & 2 Tabs) */}
      <div className="reg-tabs-header">
        <div className="reg-tab-buttons">
          <button 
            type="button"
            className={`reg-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button 
            type="button"
            className={`reg-tab-btn ${activeTab === 'add_appointment' ? 'active' : ''}`}
            onClick={() => setActiveTab('add_appointment')}
          >
            Add Appointment
          </button>
        </div>
        <div className="reg-tab-right-help">
          <span className="reg-help-link">
            <span className="green-circle-help">?</span> Help
          </span>
          <span className="reg-mgmt-link">
            👤 Patient Management
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: APPOINTMENTS (Matching Screenshot 1 Precisely) */}
      {/* ========================================================================= */}
      {activeTab === 'appointments' && (
        <div className="appointments-tab-pane">
          {/* Top Organization & Hospital Filter Row */}
          <div className="reg-org-filter-row">
            <div className="reg-company-box">
              <input 
                type="text" 
                defaultValue="Vasugan Medical Specialities Pvt Ltd" 
                readOnly 
                className="reg-company-input"
              />
            </div>

            <div className="reg-hospital-select-box">
              <select 
                value={selectedHospital} 
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="reg-hospital-select"
              >
                <option value="INDUS HEALTH CITY">INDUS HEALTH CITY</option>
                <option value="INDUS SUPER SPECIALITY">INDUS SUPER SPECIALITY</option>
                <option value="INDUS CLINIC & DIAGNOSTICS">INDUS CLINIC & DIAGNOSTICS</option>
              </select>
            </div>

            <CustomDateRangePicker 
              value={dateRange} 
              onChange={setDateRange} 
              onRangeApply={(start, end) => {
                setDateFilterRange(start && end ? { start, end } : null);
                if (start && end) {
                  showNotification(`✓ Filtered appointments: ${formatToDdMmmYyyy(start)} to ${formatToDdMmmYyyy(end)}`);
                } else {
                  showNotification(`✓ Showing all appointments`);
                }
              }} 
            />
          </div>

          {/* Light Blue Summary Metrics Pill Bar (Matching Screenshot 1) */}
          <div className="reg-summary-pill-bar">
            <div className="metric-chip">
              <span className="lbl">Total Patients:</span>
              <span className="val blue">{totalPatients}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Reg Cash:</span>
              <span className="val blue">{regCashTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Reg Card:</span>
              <span className="val blue">{regCardTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Reg UPI:</span>
              <span className="val blue">{regUpiTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Cons Cash:</span>
              <span className="val blue">{consCashTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Cons Card:</span>
              <span className="val blue">{consCardTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Cons Upi:</span>
              <span className="val blue">{consUpiTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Paid Amt:</span>
              <span className="val blue">{paidAmtTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Refund Amt:</span>
              <span className="val blue">0.00</span>
            </div>
          </div>

          {/* Table Controls (Show Entries, Excel, PDF, Search) */}
          <div className="reg-table-controls">
            <div className="table-left-tools">
              <div className="entries-dropdown-wrap">
                <span>Show</span>
                <select 
                  value={entriesPerPage} 
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="entries-select"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>
              <button className="export-btn" onClick={handleExportExcel} title="Export to Excel / CSV">
                Excel
              </button>
              <button className="export-btn" onClick={() => window.print()} title="Print Table to PDF">
                PDF
              </button>
            </div>

            <div className="table-search-wrap">
              <label>Search:</label>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search UMR, Patient, Doctor..."
                className="table-search-input"
              />
            </div>
          </div>

          {/* Appointments Clinical Data Table */}
          <div className="reg-table-container">
            <table className="reg-appointments-table">
              <thead>
                <tr>
                  <th>Token No ⇅</th>
                  <th>UMR No ⇅</th>
                  <th>PatientName ⇅</th>
                  <th>Gender/Age ⇅</th>
                  <th>Appointment Date ⇅</th>
                  <th>Consultant ⇅</th>
                  <th>Category ⇅</th>
                  <th>Bill Status ⇅</th>
                  <th>Vitals ⇅</th>
                  <th>Vitals Print ⇅</th>
                  <th>RegistrationFeePrint ⇅</th>
                  <th>ConsultationFeePrint ⇅</th>
                  <th>Ip Registration ⇅</th>
                  <th>Reg.Cash ⇅</th>
                  <th>Reg.Credit ⇅</th>
                  <th>Reg.Upi ⇅</th>
                  <th>Con.Cash ⇅</th>
                  <th>Con.Credit ⇅</th>
                  <th>Con.Upi ⇅</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={20} style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b', background: '#f8fafc' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '32px' }}>📋</span>
                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                          {searchTerm ? 'No matching patient records found' : 'No patient records found in queue'}
                        </span>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>
                          {searchTerm ? 'Try adjusting your search criteria.' : 'Click the "Add Appointment" tab above to register a new patient into the database.'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.slice(0, entriesPerPage).map((row, idx) => (
                  <tr key={row.umrNo || idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td className="cell-token">
                      <span className="badge-token" title={`Token Number: ${row.token || '1'}`}>
                        🎫 {row.token || '1'}
                      </span>
                    </td>
                    <td className="cell-umr"><strong>{row.umrNo}</strong></td>
                    <td className="cell-name">{row.patientName}</td>
                    <td className="cell-gender-age">{row.genderAge}</td>
                    <td className="cell-date">{row.appointmentDate}</td>
                    <td className="cell-consultant">{row.consultant}</td>
                    <td className="cell-category">{row.category}</td>
                    <td className="cell-status">
                      <span className="badge-paid">PAID</span>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon heart" 
                        onClick={() => setVitalsDrawer(row)}
                        title="Record / View Vitals"
                      >
                        ❤️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon print" 
                        onClick={() => setPrintModal({ type: 'vitals', record: row })}
                        title="Print Vitals Slip"
                      >
                        🖨️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon print" 
                        onClick={() => setPrintModal({ type: 'reg', record: row })}
                        title="Print Registration Receipt"
                      >
                        🖨️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon print" 
                        onClick={() => setPrintModal({ type: 'cons', record: row })}
                        title="Print Consultation Bill"
                      >
                        🖨️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon ip" 
                        onClick={() => showNotification(`IP Registration initiated for ${row.patientName} (${row.umrNo})`)}
                        title="IP Admission / Registration"
                      >
                        👍
                      </button>
                    </td>
                    <td>{row.regCash}</td>
                    <td>{row.regCredit}</td>
                    <td>{row.regUpi}</td>
                    <td><strong>{row.conCash}</strong></td>
                    <td>{row.conCredit}</td>
                    <td>{row.conUpi}</td>
                    <td className="cell-action-icon" style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button 
                        className="btn-icon orange-edit" 
                        onClick={() => handleEditPatient(row)}
                        title="Edit / Update Patient Record"
                        style={{ cursor: 'pointer' }}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon red-delete" 
                        onClick={() => handleDeletePatient(row)}
                        title="Delete Patient Record"
                        style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '15px' }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ADD APPOINTMENT - PATIENT DETAILS AT TOP, THEN DOCTOR & PAYMENT    */}
      {/* ========================================================================= */}
      {activeTab === 'add_appointment' && (
        <form onSubmit={handleSave} className="add-appointment-form">
          
          {/* Edit Mode Alert Banner */}
          {isEditMode && editingPatient && (
            <div style={{
              background: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: '8px',
              padding: '12px 20px',
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(245,158,11,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>✏️</span>
                <div>
                  <strong style={{ color: '#b45309', fontSize: '15px' }}>UPDATE PATIENT RECORD:</strong>
                  <span style={{ marginLeft: '8px', color: '#78350f', fontWeight: '500' }}>
                    Editing <strong>{editingPatient.patientName}</strong> | UMR: <strong style={{ color: '#1e40af' }}>{editingPatient.umrNo}</strong> | Token: <strong>{editingPatient.tokenNum || editingPatient.token}</strong>
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditMode(false);
                  setEditingPatient(null);
                  setFormData(prev => ({
                    ...prev,
                    patientName: '',
                    lastName: '',
                    dob: '',
                    years: '',
                    months: 0,
                    days: 0,
                    mobile: '',
                    village: '',
                    address: '',
                    idNumber: '',
                    parentOrHusband: '',
                    healthIssue: '',
                    appointmentDate: getTodayDateFormatted(),
                    token: ''
                  }));
                  showNotification("Switched back to New Patient Registration mode.");
                }}
                style={{
                  background: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#b91c1c',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                ✕ Cancel Edit
              </button>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SEARCH EXISTING PATIENT (Query-wise from PatientMapper DetailedView)  */}
          {/* ===================================================================== */}
          <div className="form-section-card existing-patient-search-card" style={{
            background: '#f0f9ff',
            border: '1.5px solid #0284c7',
            borderRadius: '8px',
            padding: '12px 18px',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🔍</span>
                <h4 style={{ margin: 0, color: '#0369a1', fontSize: '15px', fontWeight: 'bold' }}>
                  SEARCH EXISTING PATIENT (Database Query by UMR / Phone / Name):
                </h4>
              </div>
              {isExistingPatientSelected && (
                <button
                  type="button"
                  onClick={handleClearExistingPatient}
                  style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    border: '1px solid #93c5fd',
                    borderRadius: '5px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Clear / New Patient Mode
                </button>
              )}
            </div>
            <form onSubmit={handleSearchExisting} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={existingSearchTerm}
                onChange={(e) => setExistingSearchTerm(e.target.value)}
                placeholder="Enter UMR Number (e.g. UMR334254), Mobile, or Patient Name to query database..."
                style={{
                  flex: 1,
                  padding: '7px 12px',
                  border: '1px solid #38bdf8',
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#ffffff'
                }}
              />
              <button
                type="submit"
                disabled={isSearchingExisting}
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 16px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {isSearchingExisting ? 'Searching...' : 'Search Database'}
              </button>
            </form>

            {/* Search Results Dropdown List */}
            {existingSearchResults.length > 0 && (
              <div style={{
                marginTop: '10px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                maxHeight: '180px',
                overflowY: 'auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <div style={{ padding: '6px 12px', background: '#f8fafc', fontSize: '12px', fontWeight: 'bold', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                  Found {existingSearchResults.length} patient record(s) in database (Click to select & populate form):
                </div>
                {existingSearchResults.map((pat, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectExistingPatient(pat)}
                    style={{
                      padding: '8px 12px',
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e0f2fe'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                  >
                    <div>
                      <strong style={{ color: '#0369a1' }}>{pat.umrNo || pat.patientCode}</strong> - <span style={{ fontWeight: '600' }}>{pat.patientName || pat.pname}</span>
                      <span style={{ color: '#64748b', marginLeft: '10px', fontSize: '12px' }}>({pat.gender || 'MALE'} / {pat.age || '-'} yrs)</span>
                    </div>
                    <div style={{ color: '#0f766e', fontSize: '12px', fontWeight: '500' }}>
                      📞 {pat.mobNum || pat.phone || 'No phone'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isExistingPatientSelected && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#0369a1', fontWeight: '600' }}>
                ✓ Active Patient: <span style={{ color: '#1e40af' }}>{formData.title} {formData.patientName} {formData.lastName}</span> (UMR: {selectedPatientUmr}) loaded query-wise from database.
              </div>
            )}
          </div>
          
          {/* ===================================================================== */}
          {/* 1. TOP: PATIENT DETAILS (FULL WIDTH ACROSS SCREEN, EQUAL 6-COL GRID)  */}
          {/* ===================================================================== */}
          <div className="form-section-card patient-details-top-card">
            <div className="card-header-bar">
              <h3 className="section-green-heading">
                <span className="sec-icon">👤</span> Patient Details:
              </h3>
              <span className="sec-badge-hint">Fields marked * are required</span>
            </div>

            <div className="patient-fields-grid-6col">
              {/* Row 1: Title (1), Name (2), Last Name (1), Gender (1), DOB (1) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Title</label>
                <select 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Master">Master</option>
                  <option value="Baby">Baby</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              <div className="input-group col-span-2">
                <label className="field-lbl">New Patient Name *</label>
                <input 
                  type="text" 
                  value={formData.patientName} 
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter First Name *"
                  className="dense-input equal-input required-input"
                  required
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Gender</label>
                <select 
                  value={formData.gender} 
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Date of Birth</label>
                <CustomDatePicker 
                  id="pntDob"
                  value={formData.dob} 
                  onChange={handleDobChange}
                  format="yyyy-mm-dd"
                  placeholder="YYYY-MM-DD"
                  showYearSelect={true}
                  className="dense-input equal-input"
                  disableFuture={true}
                  alignRight={true}
                />
              </div>

              {/* Row 2: Age (1), Mobile (2), State (1), City (1), Village (1) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Age (Y / M / D)</label>
                <div className="age-multi-input-box">
                  <div className="mini-age-wrap">
                    <input 
                      type="number" 
                      id="age"
                      value={formData.years} 
                      onChange={(e) => handleAgeChange('years', e.target.value)}
                      placeholder="Y" 
                      className="dense-input age-val"
                      min="0"
                      max="130"
                    />
                    <span className="age-unit">Y</span>
                  </div>
                  <div className="mini-age-wrap">
                    <input 
                      type="number" 
                      id="ageMonths"
                      value={formData.months} 
                      onChange={(e) => handleAgeChange('months', e.target.value)}
                      placeholder="M" 
                      className="dense-input age-val"
                      min="0"
                      max="11"
                    />
                    <span className="age-unit">M</span>
                  </div>
                  <div className="mini-age-wrap">
                    <input 
                      type="number" 
                      id="ageDays"
                      value={formData.days} 
                      onChange={(e) => handleAgeChange('days', e.target.value)}
                      placeholder="D" 
                      className="dense-input age-val"
                      min="0"
                      max="31"
                    />
                    <span className="age-unit">D</span>
                  </div>
                </div>
              </div>

              <div className="input-group col-span-2">
                <label className="field-lbl">Mobile Number</label>
                <div className="phone-prefix-wrap">
                  <span className="flag-prefix">🇮🇳 +91</span>
                  <input 
                    type="tel" 
                    value={formData.mobile} 
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="10-digit mobile" 
                    className="dense-input equal-input with-prefix"
                  />
                </div>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">State</label>
                <select 
                  value={formData.state} 
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">City</label>
                <select 
                  value={formData.city} 
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Visakhapatnam">Visakhapatnam</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bhubaneswar">Bhubaneswar</option>
                  <option value="Vijayawada">Vijayawada</option>
                  <option value="Guntur">Guntur</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Village / Locality</label>
                <input 
                  type="text" 
                  value={formData.village} 
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="Village / Town" 
                  className="dense-input equal-input"
                />
              </div>

              {/* Row 3: Address (2), Walk In (1), Organization (1), Category (1), Occupation (1) = 6 cols */}
              <div className="input-group col-span-2">
                <label className="field-lbl">Address</label>
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street / House No" 
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Visit Category</label>
                <select 
                  value={formData.walkIn} 
                  onChange={(e) => setFormData({ ...formData, walkIn: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Walk In">Walk In</option>
                  <option value="Referral">Referral</option>
                  <option value="Online">Online</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Organization</label>
                <select 
                  value={formData.organization} 
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="--Select Organization--">Self Pay / Individual</option>
                  <option value="Individual">Individual Self-Pay</option>
                  <option value="EHS">EHS (Govt)</option>
                  <option value="Arogyasri">Arogyasri Trust</option>
                  <option value="Corporate TPA">Corporate Insurance TPA</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Billing Category</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="GENERAL - TRI">GENERAL - TRI</option>
                  <option value="VIP">VIP</option>
                  <option value="STAFF">STAFF</option>
                  <option value="BPL">BPL</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Occupation</label>
                <select 
                  value={formData.occupation} 
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="--Select Occupation--">--Select Occupation--</option>
                  <option value="Private Service">Private Service</option>
                  <option value="Govt Employee">Govt Employee</option>
                  <option value="Business">Business</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Student">Student</option>
                  <option value="Homemaker">Homemaker</option>
                </select>
              </div>

              {/* Row 4: ID Type (1), ID Number (1), Care By (1), Parent/Spouse (1), Religion (1), Marital (1) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Govt ID Type</label>
                <select 
                  value={formData.idType} 
                  onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Passport">Passport</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">ID Number</label>
                <input 
                  type="text" 
                  value={formData.idNumber} 
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  placeholder="Enter ID Number" 
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Care By</label>
                <select 
                  value={formData.careBy} 
                  onChange={(e) => setFormData({ ...formData, careBy: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Parent / Spouse Name</label>
                <input 
                  type="text" 
                  value={formData.parentOrHusband} 
                  onChange={(e) => setFormData({ ...formData, parentOrHusband: e.target.value })}
                  placeholder="Father / Spouse Name" 
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Religion</label>
                <select 
                  value={formData.religion} 
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Marital Status</label>
                <select 
                  value={formData.maritalStatus} 
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Row 5: Blood Group (1), Health Issue / Complaints (5) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Blood Group</label>
                <select 
                  value={formData.bloodGroup} 
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="B+">B+</option>
                  <option value="A+">A+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="B-">B-</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="input-group col-span-5">
                <label className="field-lbl">Health Issue / Chief Complaints</label>
                <input 
                  type="text" 
                  value={formData.healthIssue} 
                  onChange={(e) => setFormData({ ...formData, healthIssue: e.target.value })}
                  placeholder="Chief complaints, symptoms, fever, pain, etc." 
                  className="dense-input equal-input"
                />
              </div>
            </div>

            {/* Status Ribbon Bar */}
            <div className="reg-validity-ribbon-bar">
              <div className="ribbon-item">
                <span className="ribbon-lbl">VISIT TYPE:</span>
                <strong className="ribbon-val text-blue">NEW VISIT</strong>
              </div>
              <div className="ribbon-item">
                <span className="ribbon-lbl">REGISTRATION VALIDITY:</span>
                <strong className="ribbon-val text-blue">NO - 0</strong>
              </div>
              <div className="ribbon-item">
                <span className="ribbon-lbl">CONSULTANT VALIDITY:</span>
                <strong className="ribbon-val text-blue">NO - 0</strong>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 2. THEN AFTER: DOCTOR TOKEN DETAILS & PAYMENT DETAILS (EQUAL 50%/50%) */}
          {/* ===================================================================== */}
          <div className="add-appointment-lower-split-grid">
            
            {/* LEFT 50%: Doctor & Token Details */}
            <div className="lower-grid-col">
              <div className="form-section-card h-100">
                <div className="card-header-bar">
                  <h3 className="section-green-heading">
                    <span className="sec-icon">🏥</span> Doctor & Token Details:
                  </h3>
                  <span className="sec-badge-hint">Token & Consultant Routing</span>
                </div>

                {/* Step 1 Quick Hospital Pill Buttons for fast 1-click selection */}
                <div className="hospital-quick-selector">
                  <span className="hosp-step-tag">Step 1: Hospital</span>
                  {['INDUS HEALTH CITY', 'INDUS SUPER SPECIALITY', 'INDUS CLINIC & DIAGNOSTICS'].map(hosp => (
                    <button
                      type="button"
                      key={hosp}
                      className={`hosp-quick-btn ${formData.location === hosp ? 'active' : ''}`}
                      onClick={() => handleHospitalChange(hosp)}
                      title={`Select ${hosp}`}
                    >
                      🏥 {hosp}
                    </button>
                  ))}
                </div>

                {/* 1. TOP BOX: Light Blue Container with 2 Rows (Matching Indus Screenshot) */}
                <div className="doctor-token-box-container">
                  {/* Row 1: Hospital Select (Step 1), Appointment Date, Token number input */}
                  <div className="doctor-token-box-row">
                    <div className="dt-col dt-col-hospital">
                      <select 
                        value={formData.location} 
                        onChange={(e) => handleHospitalChange(e.target.value)}
                        className="dt-select"
                        title="Step 1: Select Hospital"
                      >
                        <option value="">-- Step 1: Select Hospital --</option>
                        <option value="INDUS HEALTH CITY">INDUS HEALTH CITY</option>
                        <option value="INDUS SUPER SPECIALITY">INDUS SUPER SPECIALITY</option>
                        <option value="INDUS CLINIC & DIAGNOSTICS">INDUS CLINIC & DIAGNOSTICS</option>
                      </select>
                    </div>

                    <div className="dt-col dt-col-date">
                      <CustomDatePicker 
                        id="scheduleDt"
                        value={formData.appointmentDate} 
                        onChange={(newDate) => {
                          setFormData(prev => ({ ...prev, appointmentDate: newDate }));
                          showNotification(`✓ Appointment Date set to: ${newDate}`);
                        }}
                        format="dd-MMM-yyyy"
                        placeholder="dd-M-yyyy"
                        className="dt-input"
                      />
                    </div>

                    <div className="dt-col dt-col-token">
                      <input 
                        type="text" 
                        id="tokenValue"
                        name="apptModel.tokenNum"
                        value={formData.token || ''} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const num = val ? parseInt(val, 10) : null;
                          setSelectedSlotToken(num);
                          setFormData(prev => ({ ...prev, token: val }));
                        }}
                        className="dt-input dt-token-val"
                        title="Assigned Token Number - Click any slot pill below to select your wish token"
                        placeholder="Token"
                        style={formData.token ? {
                          backgroundColor: '#fef2f2',
                          borderColor: '#dc2626',
                          color: '#b91c1c',
                          fontWeight: '800'
                        } : {}}
                      />
                    </div>
                  </div>

                  {/* Row 2: Doctor select (Step 2 - ONCHANGE OPENS TOKENS), Doctor Code, Specialization */}
                  <div className="doctor-token-box-row">
                    <div className="dt-col dt-col-doctor">
                      <select 
                        value={formData.consultant} 
                        onChange={(e) => handleConsultantChange(e.target.value)}
                        className={`dt-select dt-doctor-select ${formData.location && !formData.consultant ? 'ready-for-doc' : ''}`}
                        title="Step 2: Select Consultant Doctor (Opens Tokens)"
                        disabled={!formData.location}
                      >
                        <option value="">
                          {!formData.location 
                            ? '-- 1st Select Hospital Above --' 
                            : '-- Step 2: Select Consultant Doctor (Opens Tokens) --'}
                        </option>
                        {CONSULTANTS_ROSTER.map(doc => (
                          <option key={doc.code} value={doc.name}>{doc.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="dt-col dt-col-code">
                      <input 
                        type="text" 
                        value={formData.doctorCode || '-'} 
                        readOnly 
                        className="dt-input dt-readonly"
                        title="Doctor Employee Code"
                        placeholder="Emp Code"
                      />
                    </div>

                    <div className="dt-col dt-col-spec">
                      <input 
                        type="text" 
                        value={formData.specialization || '-'} 
                        readOnly 
                        className="dt-input dt-readonly"
                        title="Doctor Specialization"
                        placeholder="Specialization"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. DOCTOR SLOTS DETAILS (OPENS ON DOCTOR ONCHANGE) */}
                {!formData.location ? (
                  <div className="doctor-slots-waiting-box">
                    <div className="waiting-icon">🏥</div>
                    <div className="waiting-text">
                      <strong>Step 1: Select Hospital First</strong>
                      <p>
                        Please choose a Hospital from the dropdown or click a hospital button above to enable Doctor selection.
                      </p>
                    </div>
                  </div>
                ) : !formData.consultant || !isSlotsOpen ? (
                  <div className="doctor-slots-waiting-box">
                    <div className="waiting-icon">👨‍⚕️</div>
                    <div className="waiting-text">
                      <strong>Step 2: Select Doctor to OPEN Tokens</strong>
                      <p>
                        Hospital: <strong>{formData.location}</strong> selected. Choose a Consultant Doctor from the dropdown above to OPEN available token slots.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="doctor-slots-open-wrapper">
                    {/* Doctor Slots Details Heading with Color Legend */}
                    <div className="slots-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div className="doctor-slots-title" style={{ margin: 0 }}>
                        <span>Doctor Slots Details:</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 600 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#15803d' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#008000', display: 'inline-block' }}></span> Available (Green)
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#b91c1c' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#dc2626', display: 'inline-block' }}></span> Occupied / Selected (Red)
                        </span>
                        <span className="slots-open-badge">● Dr. {formData.consultant.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Doctor Slots Details Container with 3 Columns of Red/Green Slot Pills */}
                    <div className="doctor-slots-details-container">
                      <div className="doctor-slots-grid">
                        {currentDoctorSlots.map((slot) => {
                          const isSelected = selectedSlotToken === slot.tokenNumber || String(formData.token) === String(slot.tokenNumber);
                          const isOccupiedRed = slot.isBooked || isSelected;
                          return (
                            <button
                              key={slot.tokenNumber}
                              type="button"
                              className={`doctor-slot-pill ${isOccupiedRed ? 'slot-red slot-occupied' : 'slot-green'} ${isSelected ? 'slot-selected slot-wish-selected' : ''}`}
                              style={isSelected ? {
                                backgroundColor: '#dc2626',
                                borderColor: '#991b1b',
                                color: '#ffffff',
                                fontWeight: '800',
                                boxShadow: '0 0 12px rgba(220, 38, 38, 0.9), inset 0 0 4px rgba(255, 255, 255, 0.45)',
                                transform: 'scale(1.05)',
                                outline: '2px solid #fecaca',
                                outlineOffset: '1px',
                                zIndex: 3
                              } : (slot.isBooked ? {
                                backgroundColor: '#d32f2f',
                                borderColor: '#b71c1c',
                                color: '#ffffff',
                                opacity: 0.95
                              } : {
                                backgroundColor: '#008000',
                                borderColor: '#006400',
                                color: '#ffffff'
                              })}
                              onClick={() => handleSlotClick(slot)}
                              title={isSelected 
                                ? `Token #${slot.tokenNumber} (${slot.timeLabel}) - SELECTED WISH TOKEN (OCCUPIED RED)` 
                                : (slot.isBooked 
                                  ? `Token #${slot.tokenNumber} (${slot.timeLabel}) - Occupied / Booked (Click to select wish token)` 
                                  : `Token #${slot.tokenNumber} (${slot.timeLabel}) - Available (Click to select wish token)`)}
                            >
                              {slot.timeLabel} {isSelected ? ' 🔴' : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Add Extra Tokens Row with [+] Button */}
                    <div className="add-extra-tokens-row">
                      <span className="add-extra-tokens-label">Add Extra Tokens:</span>
                      <button 
                        type="button" 
                        className="btn-add-extra-token"
                        onClick={handleAddExtraToken}
                        title="Add Emergency / Extra Token Slot"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Consultant Doctor Select Chips */}
                <div className="quick-doc-chips-wrap" style={{ marginTop: '12px' }}>
                  <span className="chips-label">Quick Select Consultant:</span>
                  <div className="payment-chips-row" style={{ marginTop: '4px', borderTop: 'none', paddingTop: '0' }}>
                    {CONSULTANTS_ROSTER.slice(0, 4).map(doc => (
                      <button
                        type="button"
                        key={doc.code}
                        className={`pay-mode-chip ${formData.consultant === doc.name ? 'active' : ''}`}
                        onClick={() => {
                          if (!formData.location) {
                            handleHospitalChange('INDUS HEALTH CITY');
                          }
                          handleConsultantChange(doc.name);
                        }}
                      >
                        👨‍⚕️ {doc.name.split(' ')[0]} ({doc.fee} ₹)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department & Cabin Info */}
                <div className="doc-room-info-pill" style={{ marginTop: '10px', padding: '6px 10px', background: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#475569' }}>
                  <span>📍 <strong>OPD Cabin:</strong> Room 102 (First Floor)</span>
                  <span>🕒 <strong>Assigned Slot:</strong> {formData.token ? `Token #${formData.token}` : 'Immediate Consultation'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT 50%: Payment Details (Fee Table & Payment Type) */}
            <div className="lower-grid-col">
              <div className="form-section-card h-100">
                <div className="card-header-bar">
                  <h3 className="section-green-heading">
                    <span className="sec-icon">💰</span> Payment Details:
                  </h3>
                  <span className="sec-badge-hint">Billing & Breakdown</span>
                </div>

                <div className="fee-table-grid">
                  {/* Row 1: Registration Fee | Reg Final Amount */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Registration Fee :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.regFee} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Reg Final Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.regFinalAmt} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 2: Consultation Fee | Cons Final Amount */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Consultation Fee :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.consFee} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Cons Final Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.consFinalAmt} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 3: Disc (%) | Disc (₹) */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Discount (%) :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.discPercent} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Discount (₹) :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.discAmt} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 4: Total Amount | Total Bill Amount */}
                  <div className="fee-grid-row highlight-row">
                    <div className="fee-cell-lbl text-bold">Total Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.totalAmt} readOnly className="fee-box-input bold-blue" />
                    </div>
                    <div className="fee-cell-lbl text-bold">Total Bill Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.totalBillAmt} readOnly className="fee-box-input bold-blue" />
                    </div>
                  </div>

                  {/* Row 5: Amt Received | Balance */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Amt Received :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.amtReceived} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Balance :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.balance} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 6: Status | Authorized By */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Status :</div>
                    <div className="fee-cell-val">
                      <span className="badge-paid-pill">PAID</span>
                    </div>
                    <div className="fee-cell-lbl">Authorized By :</div>
                    <div className="fee-cell-val">
                      <select 
                        value={formData.authorizedBy} 
                        onChange={(e) => setFormData({ ...formData, authorizedBy: e.target.value })}
                        className="dense-select equal-input"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Medical Director">Medical Director</option>
                        <option value="Chief Accountant">Chief Accountant</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selector Box */}
                <div className="payment-table-wrap" style={{ marginTop: '10px' }}>
                  <table className="equal-payment-table">
                    <thead>
                      <tr>
                        <th style={{ width: '45%' }}>Payment Mode</th>
                        <th style={{ width: '45%' }}>Amount (₹)</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select 
                            value={formData.paymentMode} 
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="dense-select equal-input"
                          >
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI / GPay / PhonePe</option>
                            <option value="Card">Debit / Credit Card</option>
                            <option value="Credit">Credit / Corporate TPA</option>
                          </select>
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={formData.paymentAmt} 
                            onChange={(e) => setFormData({ ...formData, paymentAmt: Number(e.target.value) })}
                            className="dense-input equal-input text-right bold-num"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            type="button" 
                            className="btn-add-mode-circle" 
                            onClick={() => showNotification("Split payment mode added.")}
                            title="Add Split Mode"
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Quick Payment Mode Selector Chips */}
                  <div className="payment-chips-row">
                    <span className="chips-label">Quick Select:</span>
                    {['Cash', 'UPI', 'Card', 'Credit'].map(mode => (
                      <button
                        type="button"
                        key={mode}
                        className={`pay-mode-chip ${formData.paymentMode === mode ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, paymentMode: mode })}
                      >
                        {mode === 'Cash' && '💵 Cash'}
                        {mode === 'UPI' && '📱 UPI / QR'}
                        {mode === 'Card' && '💳 Card'}
                        {mode === 'Credit' && '🏥 Corporate'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* 3. BOTTOM: EQUAL CENTERED ACTION FOOTER BAR                           */}
          {/* ===================================================================== */}
          <div className="form-equal-footer-bar">
            {isEditMode && editingPatient ? (
              <>
                <button type="submit" className="btn-green-save-prominent" style={{ background: '#d97706', borderColor: '#b45309' }}>
                  💾 Update Patient Record ({editingPatient.umrNo})
                </button>
                <button 
                  type="button" 
                  className="btn-print-token-action"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditingPatient(null);
                    handleSave();
                  }}
                  style={{ background: '#0284c7', borderColor: '#0369a1' }}
                  title="Save this entry as a new patient with fresh UMR"
                >
                  ➕ Save as New Patient
                </button>
                <button 
                  type="button" 
                  className="btn-reset-form-action"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditingPatient(null);
                    setFormData(prev => ({
                      ...prev,
                      patientName: '',
                      lastName: '',
                      mobile: '',
                      village: '',
                      address: '',
                      idNumber: '',
                      parentOrHusband: '',
                      healthIssue: ''
                    }));
                    showNotification("Cancelled edit mode.");
                  }}
                  style={{ background: '#ef4444', color: '#fff', borderColor: '#dc2626' }}
                >
                  ✕ Cancel
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn-green-save-prominent">
                  💾 Save Appointment
                </button>
                <button 
                  type="button" 
                  className="btn-print-token-action"
                  onClick={() => {
                    if (!formData.patientName) {
                      showNotification("Please enter patient name first.");
                      return;
                    }
                    setPrintModal({
                      type: 'reg',
                      patient: {
                        umrNo: `UMR${Math.floor(334250 + Math.random() * 50)}`,
                        token: formData.token,
                        patientName: `${formData.title} ${formData.patientName} ${formData.lastName}`.trim().toUpperCase(),
                        genderAge: `${formData.gender.toUpperCase()}/${formData.years}yrs`,
                        appointmentDate: formData.appointmentDate,
                        consultant: formData.consultant,
                        category: formData.category,
                        phone: formData.mobile,
                        regCash: formData.regFinalAmt,
                        conCash: formData.consFinalAmt
                      }
                    });
                  }}
                >
                  🖨️ Save & Print Token Slip
                </button>
                <button 
                  type="button" 
                  className="btn-reset-form-action"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      patientName: '',
                      lastName: '',
                      mobile: '',
                      village: '',
                      address: '',
                      idNumber: '',
                      parentOrHusband: '',
                      healthIssue: ''
                    }));
                    showNotification("Form reset.");
                  }}
                >
                  🔄 Reset Fields
                </button>
              </>
            )}
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* PRINT RECEIPT / INVOICE MODAL */}
      {/* ========================================================================= */}
      {printModal && (
        <div className="print-modal-overlay">
          <div className="print-receipt-card">
            <div className="print-header">
              <h3>INDUS HEALTH CITY</h3>
              <p>Vasugan Medical Specialities Pvt Ltd</p>
              <div className="print-type-badge">
                {printModal.type === 'reg' ? 'OUTPATIENT REGISTRATION RECEIPT' : 
                 printModal.type === 'cons' ? 'DOCTOR CONSULTATION INVOICE' : 'NURSING VITALS REPORT'}
              </div>
            </div>

            <div className="print-body">
              <div className="print-grid">
                <div><span>UMR No:</span> <strong>{printModal.record.umrNo}</strong></div>
                <div><span>Token:</span> <strong>{printModal.record.token}</strong></div>
                <div><span>Patient Name:</span> <strong>{printModal.record.patientName}</strong></div>
                <div><span>Age / Gender:</span> <strong>{printModal.record.genderAge}</strong></div>
                <div><span>Consultant:</span> <strong>{printModal.record.consultant}</strong></div>
                <div><span>Date:</span> <strong>{printModal.record.appointmentDate}</strong></div>
              </div>

              <hr style={{ margin: '12px 0', borderColor: '#e2e8f0' }} />

              {printModal.type === 'reg' && (
                <div className="print-bill-items">
                  <div className="bill-item"><span>OPD Registration Fee (One-Time)</span> <strong>₹{printModal.record.regCash || 50}.00</strong></div>
                  <div className="bill-item total"><span>Total Paid:</span> <strong>₹{printModal.record.regCash || 50}.00</strong></div>
                </div>
              )}

              {printModal.type === 'cons' && (
                <div className="print-bill-items">
                  <div className="bill-item"><span>Consultant Clinical Fee</span> <strong>₹{printModal.record.conCash || 800}.00</strong></div>
                  <div className="bill-item total"><span>Total Paid:</span> <strong>₹{printModal.record.conCash || 800}.00</strong></div>
                </div>
              )}

              {printModal.type === 'vitals' && (
                <div className="print-bill-items">
                  <div className="bill-item"><span>Blood Pressure (BP):</span> <strong>{printModal.record.vitals?.bp || '120/80 mmHg'}</strong></div>
                  <div className="bill-item"><span>Pulse Rate:</span> <strong>{printModal.record.vitals?.pulse || '74 bpm'}</strong></div>
                  <div className="bill-item"><span>Oxygen Saturation (SpO2):</span> <strong>{printModal.record.vitals?.spo2 || '99%'}</strong></div>
                  <div className="bill-item"><span>Body Temperature:</span> <strong>{printModal.record.vitals?.temp || '98.6 °F'}</strong></div>
                  <div className="bill-item"><span>Body Weight:</span> <strong>{printModal.record.vitals?.weight || '65 kg'}</strong></div>
                </div>
              )}
            </div>

            <div className="print-actions">
              <button className="btn btn-secondary" onClick={() => setPrintModal(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => window.print()}>🖨️ Print Slip</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Vitals View / Record Modal */}
      {vitalsDrawer && (
        <div className="print-modal-overlay">
          <div className="print-receipt-card">
            <div className="print-header" style={{ textAlign: 'left', borderBottom: '2px solid #10b981' }}>
              <h3 style={{ color: '#059669', margin: 0 }}>❤️ Clinical Vitals Desk</h3>
              <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                {vitalsDrawer.patientName} ({vitalsDrawer.umrNo}) | {vitalsDrawer.genderAge}
              </p>
            </div>

            <div className="print-body" style={{ marginTop: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Blood Pressure (BP):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.bp || '120/80'} 
                    className="dense-input" 
                    id="modal-bp"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Pulse (bpm):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.pulse || '74'} 
                    className="dense-input" 
                    id="modal-pulse"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>SpO2 (%):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.spo2 || '99%'} 
                    className="dense-input" 
                    id="modal-spo2"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Temperature (°F):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.temp || '98.6'} 
                    className="dense-input" 
                    id="modal-temp"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Weight (kg):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.weight || '68'} 
                    className="dense-input" 
                    id="modal-weight"
                  />
                </div>
              </div>
            </div>

            <div className="print-actions">
              <button className="btn btn-secondary" onClick={() => setVitalsDrawer(null)}>Cancel</button>
              <button 
                className="btn btn-success" 
                onClick={() => {
                  const updatedVitals = {
                    bp: document.getElementById('modal-bp')?.value || '120/80',
                    pulse: document.getElementById('modal-pulse')?.value || '74',
                    spo2: document.getElementById('modal-spo2')?.value || '99%',
                    temp: document.getElementById('modal-temp')?.value || '98.6',
                    weight: document.getElementById('modal-weight')?.value || '68'
                  };
                  setAppointments(prev => prev.map(a => a.umrNo === vitalsDrawer.umrNo ? { ...a, vitals: updatedVitals } : a));
                  setVitalsDrawer(null);
                  showNotification(`✓ Vitals updated for ${vitalsDrawer.patientName}`);
                }}
              >
                💾 Save Vitals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
