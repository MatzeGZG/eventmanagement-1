import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeServices } from './services';

const init = async () => {
  try {
    await initializeServices();

    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Application initialization failed:', error);
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: #D4AF37; text-align: center;">
        <div>
          <h1>Unable to Load Application</h1>
          <p>Please check your configuration and try again.</p>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #D4AF37; color: black; border: none; border-radius: 4px; cursor: pointer;">
            Retry
          </button>
        </div>
      </div>
    `;
  }
};

init();