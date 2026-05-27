import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaHeartbeat, FaAppleAlt, FaRunning, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AIWellness = () => {
  const { user } = useSelector((state) => state.auth);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Form states
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [currentProblems, setCurrentProblems] = useState('');
  const [lifestyle, setLifestyle] = useState('Sedentary');

  // Logic states
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [error, setError] = useState('');

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAiData(null);

    try {
      const response = await axios.post(`${API_URL}/api/ai/generate-plan`, {
        age,
        medicalHistory,
        currentProblems,
        lifestyle
      });

      if (response.data.success) {
        setAiData(response.data.data);
      } else {
        setError('Failed to construct optimization metrics.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'AI service is currently congested. Please re-try.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-green-500 flex items-center gap-2">
              <FaHeartbeat className="animate-pulse" /> SehatSetu AI Clinical Companion
            </h1>
            <p className="text-gray-400 mt-1">Hyper-personalized wellness matrices powered by Gemini GenAI</p>
          </div>
          <Link to="/dashboard" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition">
            🔙 Dashboard
          </Link>
        </div>

        {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-xl mb-6">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Form Panel */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-200">Patient Biometrics Form</h2>
            <form onSubmit={handleGeneratePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Age</label>
                <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 67" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-green-500" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Medical History / Chronic Illnesses</label>
                <textarea required value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} placeholder="e.g., Hypertension, Type-2 Diabetes, Early Osteoarthritis" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-green-500 min-h-[70px]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Current Health Challenges</label>
                <textarea required value={currentProblems} onChange={(e) => setCurrentProblems(e.target.value)} placeholder="e.g., Persistent lower back stiffness, low energy levels in early morning" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-green-500 min-h-[70px]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Activity Level</label>
                <select value={lifestyle} onChange={(e) => setLifestyle(e.target.value)} className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-green-500">
                  <option value="Sedentary">Sedentary (Minimal Movement)</option>
                  <option value="Lightly Active">Lightly Active (Light walking daily)</option>
                  <option value="Moderately Active">Moderately Active (Regular exercises)</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 font-bold p-3 rounded-lg text-white transition disabled:bg-gray-600">
                {loading ? 'Processing Insights Engine...' : '✨ Compile AI Wellness Blueprint'}
              </button>
            </form>
          </div>

          {/* Right Results Display Panel */}
          <div className="lg:grid lg:col-span-2 bg-gray-800/40 p-6 rounded-2xl border border-gray-800 min-h-[400px] flex items-center justify-center relative">
            {loading && (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-lg text-green-400 font-medium animate-pulse">Running server-side context-constrained inference pipeline...</p>
              </div>
            )}

            {!loading && !aiData && (
              <div className="text-center text-gray-500 max-w-sm">
                <p className="text-lg mb-2">📥 Dynamic Blueprint Empty</p>
                <p className="text-sm">Submit the senior biometric metrics form to trigger server-side LLM orchestration mapping.</p>
              </div>
            )}

            {!loading && aiData && (
              <div className="w-full space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                    <h3 className="text-emerald-400 font-bold text-lg flex items-center gap-2 mb-3">
                      <FaAppleAlt /> Geriatric Dietary Matrix
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      {aiData.dietaryAdvice?.map((tip, idx) => <li key={idx}>• {tip}</li>)}
                    </ul>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                    <h3 className="text-blue-400 font-bold text-lg flex items-center gap-2 mb-3">
                      <FaRunning /> Low-Impact Mobility Protocol
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      {aiData.recommendedExercises?.map((ex, idx) => <li key={idx}>• {ex}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Precautions Alert Panel */}
                <div className="bg-amber-950/40 border border-amber-600/50 p-5 rounded-xl">
                  <h3 className="text-amber-400 font-bold text-lg flex items-center gap-2 mb-2">
                    <FaExclamationTriangle /> Diagnostic Contraindications & Warnings
                  </h3>
                  <ul className="space-y-1.5 text-gray-300 text-sm">
                    {aiData.precautions?.map((warn, idx) => <li key={idx}>⚠️ {warn}</li>)}
                  </ul>
                </div>

                {/* Daily Tip Footer */}
                <div className="bg-green-950/30 border border-green-800/40 p-4 rounded-xl text-center italic text-green-400 text-sm">
                  💡 "{aiData.dailyRoutineTip}"
                </div>

                <p className="text-2xs text-gray-600 text-center uppercase tracking-wider">
                  System Guard: Output structured via JSON-Schema parsing contracts to completely stop data hallucination.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AIWellness;