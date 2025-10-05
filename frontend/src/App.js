import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const { user, loading } = useContext(AuthContext);
  const [showSignup, setShowSignup] = React.useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {user ? (
          <Dashboard />
        ) : (
          <div className="auth-container">
            {showSignup ? (
              <Signup onToggle={() => setShowSignup(false)} />
            ) : (
              <Login onToggle={() => setShowSignup(true)} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;