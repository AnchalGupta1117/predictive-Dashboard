import React, { useRef, useState } from 'react';
import styles from '../styles/UploadReport.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const UploadReport = ({ onAnalysisComplete }) => {
  const fileInput = useRef();
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);

  const handleUpload = async () => {
    if (!fileSelected) return;

    setUploading(true);
    setAnalyzing(false);
    setDone(false);

    // ✅ Clear old localStorage before upload
    localStorage.removeItem('fault_summary');
    localStorage.removeItem('prediction_summary');
    localStorage.removeItem('fault_counts');
    localStorage.removeItem('fault_trend_data');
    window.dispatchEvent(new Event('storage'));

    // ✅ Reset backend prediction file
    try {
      await fetch(`${BACKEND_URL}/reset`, { method: 'POST' });
    } catch (err) {
      console.warn('Could not reset backend state:', err);
    }

    const formData = new FormData();
    formData.append('file', fileSelected);

    try {
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const fileUrl = `${BACKEND_URL}${result.download_url}`;
        setReportUrl(fileUrl);

        // ✅ Save summary (for FaultSummary)
        if (result.summary && result.total_records !== undefined) {
          const fullSummary = {
            total_records: result.total_records,
            fault_counts: result.summary,
          };
          localStorage.setItem('fault_summary', JSON.stringify(fullSummary));
          localStorage.setItem('prediction_summary', JSON.stringify(fullSummary)); // For FaultSummary.jsx
          localStorage.setItem('fault_counts', JSON.stringify(result.summary)); // For Scheduler.jsx
          window.dispatchEvent(new Event('storage'));
        }

        // ✅ Save trend data
        let trendRaw = result.trend_data || result.rows;
        if (trendRaw) {
          const cleanedTrendData = trendRaw
            .map(item => {
              const ts = item.Timestamp || item.timestamp;
              const fault = item.Fault_Type || item.Fault || item.Predicted_Label;
              if (!ts || !fault) return null;
              return {
                Timestamp: new Date(ts).toISOString(),
                Fault_Type: fault,
              };
            })
            .filter(Boolean);

          if (cleanedTrendData.length) {
            localStorage.setItem('fault_trend_data', JSON.stringify(cleanedTrendData));
            // ✅ Trigger manual storage event to force UI refresh
            window.dispatchEvent(new Event('storage'));
          }
        }

        // Simulated transition
        setTimeout(() => {
          setUploading(false);
          setAnalyzing(true);
          setTimeout(() => {
            setAnalyzing(false);
            setDone(true);
            onAnalysisComplete?.();
          }, 1500);
        }, 1000);
      } else {
        console.error('Server error:', result.error);
        alert('Error: ' + result.error);
        setUploading(false);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please check the backend server.');
      setUploading(false);
    }
  };

  const handleDownloadSample = () => {
    const headers = [
      'Timestamp',
      'Rotational_Speed_RPM',
      'Torque_Nm',
      'Vibration_X_mm_s',
      'Vibration_Y_mm_s',
      'Vibration_Z_mm_s',
      'Temperature_C',
      'Pressure_bar',
      'Flow_Rate_LPM',
    ];
    const rows = [
      ['2025-07-08 00:00:00', 1552.121, 43.53, 2.05, 2.08, 2.36, 69.81, 5.58, 196.77],
      ['2025-07-08 00:01:00', 1485.48, 49.03, 2.46, 2.28, 2.14, 68.21, 4.05, 198.90],
    ];
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_format.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = () => {
    if (reportUrl) window.open(reportUrl, '_blank');
  };

  const handleReset = () => {
    setDone(false);
    setReportUrl(null);
    setFileName('');
    setFileSelected(null);
    fileInput.current.value = '';
    localStorage.removeItem('fault_summary');
    localStorage.removeItem('fault_trend_data');
    window.dispatchEvent(new Event('storage'));
  };

  const handleFileChange = () => {
    const file = fileInput.current.files[0];
    if (file) {
      setFileName(file.name);
      setFileSelected(file);
      setDone(false);
    }
  };

  return (
    <main className={styles.card} aria-label="Predictive Maintenance Report Upload">
      <header className={styles.headerSection}>
        <h1 className={styles.title}>Predictive Maintenance Dashboard</h1>
        <p className={styles.subtitle}>
          Upload your sensor data CSV file for Real-Time Fault Detection
        </p>
      </header>
      <hr className={styles.divider} />
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          handleUpload();
        }}
      >
        <label htmlFor="file-upload" className={styles.label}>Upload CSV File</label>
        <div className={styles.inputRow}>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            ref={fileInput}
            onChange={handleFileChange}
            className={styles.fileInput}
            aria-label="Choose CSV file"
          />
          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={!fileName || uploading || analyzing}
          >
            Analyze
          </button>
        </div>

        {fileName && (
          <div className={styles.fileNameInline}>
            Selected: <strong>{fileName}</strong>
          </div>
        )}
      </form>

      <button className={styles.secondaryBtn} onClick={handleDownloadSample} type="button">
        Download Sample Format
      </button>

      {(uploading || analyzing) && (
        <div className={styles.progressSection} aria-live="polite">
          <div className={styles.progressBarBg}>
            <div className={styles.progressBar}></div>
          </div>
          <div className={styles.statusMsg}>
            {uploading && 'Uploading file...'}
            {analyzing && 'Analyzing data using ML model...'}
          </div>
        </div>
      )}

      {done && (
        <div className={styles.resultSection}>
          <div className={styles.resultTitle}>Prediction Completed</div>
          <div className={styles.resultSubtitle}>Your report is ready for download.</div>
          <div className={styles.resultActions}>
            <button
              className={styles.primaryBtn}
              onClick={handleDownloadReport}
              type="button"
            >
              Download Prediction Report
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={handleReset}
              type="button"
            >
              Upload Another File
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default UploadReport;
