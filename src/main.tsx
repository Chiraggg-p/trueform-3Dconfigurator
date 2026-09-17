import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

document.title = "Abhiwan Technology";

// Ensure favicon is set to Abhiwan Technology logo
let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
if (!link) {
  link = document.createElement('link');
  link.rel = 'icon';
  document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = '/favicon.png';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
