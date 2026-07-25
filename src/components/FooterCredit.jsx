import React from 'react';

export default function FooterCredit() {
  return (
    <footer className="digital-heroes-footer">
      Built for Digital Heroes Training Task &bull;{' '}
      <a 
        href="https://digitalheroesco.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-semibold text-blue-600 hover:underline"
      >
        digitalheroesco.com
      </a>
    </footer>
  );
}
