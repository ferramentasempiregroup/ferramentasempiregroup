import React from 'react';
import UTMGenerator from './components/UTMGenerator';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,215,0,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(249,200,14,0.06),transparent_50%)] pointer-events-none" />

      <UTMGenerator />
    </div>
  );
}

export default App;