import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from '../src/routes/appRoutes';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <appRoutes />
    </div>
  );
};

export default App;