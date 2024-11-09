import React, { useState } from 'react';
import ClientPaymentPage from './components/Client/ClientPaymentPage';
import HomePage from './app/page';  // A simple HomePage to test navigation

function App() {
  // State to track the current route
  const [route, setRoute] = useState('home');  // Default route is 'home'

  // A simple function to change routes
  const navigateTo = (newRoute) => {
    setRoute(newRoute);
  };

  return (
    <div>
      {/* Navigation */}
      <nav>
        <button onClick={() => navigateTo('home')}>Home</button>
        <button onClick={() => navigateTo('client')}>Go to Client Payment</button>
      </nav>

      {/* Conditional Rendering of Routes */}
      {route === 'home' && <HomePage />}
      {route === 'client' && <ClientPaymentPage />}
    </div>
  );
}

export default App;
