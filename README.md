# 🚀 Predictive Maintenance Dashboard

A comprehensive web-based predictive maintenance system that uses machine learning to detect and predict equipment faults in industrial machinery. Built with React frontend and Flask backend, featuring real-time data analysis, fault prediction, and maintenance scheduling.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Flask](https://img.shields.io/badge/Flask-3.1.0-red)
![XGBoost](https://img.shields.io/badge/XGBoost-2.1.4-orange)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## ✨ Features

### 🔍 **Fault Detection & Prediction**
- **Multi-fault Classification**: Detects 5 types of equipment faults:
  - Bearing Fault
  - Cavitation
  - Imbalance
  - Misalignment
  - Normal Operation
- **Real-time Analysis**: Upload CSV files for instant fault prediction
- **XGBoost ML Model**: High-accuracy machine learning predictions

### 📊 **Interactive Dashboard**
- **Fault Summary**: Visual breakdown of detected faults with percentages
- **Trend Analysis**: Historical fault patterns and trends over time
- **What-If Simulator**: Test different operational parameters to predict outcomes
- **Maintenance Scheduler**: Plan and schedule preventive maintenance

### 🎨 **Modern UI/UX**
- **Glass Morphism Design**: Beautiful glass-card layout with modern aesthetics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Charts**: Dynamic visualizations using Recharts
- **Real-time Updates**: Live data updates and notifications

### 📁 **Data Management**
- **CSV Upload**: Support for sensor data uploads
- **Sample Formats**: Pre-defined templates for easy data formatting
- **Export Capabilities**: Download prediction results and reports
- **Data Validation**: Automatic data format checking and validation

## 🛠 Technology Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Recharts** - Interactive charts and visualizations
- **React Icons** - Beautiful icon library
- **Axios** - HTTP client for API communication
- **React DatePicker** - Date selection components

### Backend
- **Flask 3.1.0** - Python web framework
- **XGBoost 2.1.4** - Gradient boosting machine learning
- **Scikit-learn** - Machine learning utilities
- **Pandas & NumPy** - Data manipulation and analysis
- **Flask-CORS** - Cross-origin resource sharing

### Machine Learning
- **XGBoost Classifier** - Primary prediction model
- **Standard Scaler** - Feature normalization
- **Label Encoder** - Categorical data encoding
- **Feature Engineering** - Advanced data preprocessing

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnchalGupta1117/predictive-Dashboard.git
   cd predictive-dashboard
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask server**
   ```bash
   python app.py
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📖 Usage

### 1. **Upload Data**
- Navigate to the Upload section
- Click "Choose File" to select your CSV data
- Ensure your data includes the required sensor columns:
  - `Rotational_Speed_RPM`
  - `Torque_Nm`
  - `Vibration_X_mm_s`, `Vibration_Y_mm_s`, `Vibration_Z_mm_s`
  - `Temperature_C`
  - `Pressure_bar`
  - `Flow_Rate_LPM`

### 2. **View Predictions**
- After upload, the system will automatically analyze your data
- View fault predictions in the Summary section
- Download prediction results as CSV

### 3. **Analyze Trends**
- Switch to the Trends section to view historical patterns
- Analyze fault distribution over time
- Identify recurring issues

### 4. **Use What-If Simulator**
- Adjust operational parameters
- Predict outcomes for different scenarios
- Optimize maintenance schedules

### 5. **Schedule Maintenance**
- Use the Scheduler to plan preventive maintenance
- Set reminders and notifications
- Track maintenance history

## 🔌 API Endpoints

### Core Endpoints
- `GET /` - Health check
- `POST /predict` - Upload and predict faults
- `POST /predict_simulator` - What-if scenario predictions
- `GET /get_trend_data` - Retrieve trend analysis data
- `GET /download/<filename>` - Download prediction results

### Data Format
The API expects CSV files with the following columns:
```csv
Timestamp,Rotational_Speed_RPM,Torque_Nm,Vibration_X_mm_s,Vibration_Y_mm_s,Vibration_Z_mm_s,Temperature_C,Pressure_bar,Flow_Rate_LPM
2025-01-01 00:00:00,1500,40,2.1,2.0,2.2,70,5.0,200
```

## 📁 Project Structure

```
predictive-dashboard/
├── backend/
│   ├── app.py                 # Flask application
│   ├── models/                # ML models and data
│   │   ├── model.pkl         # Trained XGBoost model
│   │   ├── scaler.pkl        # Feature scaler
│   │   ├── features.pkl      # Feature list
│   │   └── label_encoder.pkl # Label encoder
│   ├── uploads/              # Uploaded files
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   └── styles/          # CSS styles
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


- Project Github URL: https://github.com/AnchalGupta1117/predictive-Dashboard
- Project URL: https://predictive-dashboard-wpfl.vercel.app/ 
---

⭐ **Star this repository if you find it helpful!** 
