import React from 'react';

/**
 * Authentic SVG icons for developer and designer tech stacks.
 * Matches keywords case-insensitively (e.g. "Jetpack Compose", "Compose", "Kotlin", "React Native").
 */
export function getTechIconSvg(techName) {
  if (!techName || typeof techName !== 'string') return null;
  const name = techName.trim().toLowerCase();

  // Kotlin
  if (name.includes('kotlin') || name.includes('kmp')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M24 24H0V0H24L12 12L24 24Z" fill="url(#tech-kotlin-grad)" />
        <defs>
          <linearGradient id="tech-kotlin-grad" x1="24" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7F52FF" />
            <stop offset="0.5" stopColor="#C711E1" />
            <stop offset="1" stopColor="#E4485D" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Jetpack Compose
  if (name.includes('compose')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#4285F4" />
        <path d="M12 6L6.5 9V15L12 18L17.5 15V9L12 6Z" fill="#34A853" />
        <path d="M12 9.5L9 11.2V14.8L12 16.5L15 14.8V11.2L12 9.5Z" fill="#073042" />
      </svg>
    );
  }

  // Android
  if (name.includes('android')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.29-1.29a.666.666 0 00-.94-.94l-1.46 1.46C13.56 2.14 12.8 2 12 2c-.8 0-1.56.14-2.42.39L8.12.93a.666.666 0 10-.94.94l1.29 1.29C6.46 4.3 5 6.01 5 8h14c0-1.99-1.46-3.7-3.47-4.84zM9 6a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z"
          fill="#3DDC84"
        />
      </svg>
    );
  }

  // Swift / SwiftUI / Apple / iOS
  if (name.includes('swift') || name.includes('ios') || name.includes('apple')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M21.9 17.5c-.2.4-.7 1.1-1.3 1.9-.8 1.1-1.6 2.2-2.8 2.2-1.2 0-1.6-.7-3-.7-1.4 0-1.9.7-3.1.7-1.2 0-2.1-1.1-2.9-2.2-1.6-2.3-2.8-6.5-1.2-9.3.8-1.4 2.2-2.3 3.8-2.3 1.2 0 2.3.8 3 .8.7 0 2.1-.9 3.5-.8 1.5.1 2.6.6 3.4 1.7-3.1 1.8-2.6 6.1.6 7.7zm-4.7-12c.6-.8 1.1-1.9.9-3-.9.1-2.1.7-2.7 1.5-.6.7-1.1 1.8-.9 2.9 1.1.1 2.1-.6 2.7-1.4z"
          fill="#F05138"
        />
      </svg>
    );
  }

  // Flutter / Dart
  if (name.includes('flutter') || name.includes('dart')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M14.2 2L4 12.2l3.1 3.1L20.4 2h-6.2z" fill="#02569B" />
        <path d="M14.2 11.8L8.7 17.3l3.1 3.1 8.6-8.6h-6.2z" fill="#0175C2" />
        <path d="M11.8 20.4l2.4 2.4h6.2l-5.5-5.5-3.1 3.1z" fill="#29B6F6" />
      </svg>
    );
  }

  // React / React Native
  if (name.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );
  }

  // Python
  if (name.includes('python')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M11.9 2c-3.1 0-5.1.7-5.1 2.7v2h5.2v.7H4.7c-2 0-3.7 1.3-3.7 3.8 0 2.4 1.5 3.8 3.7 3.8h1.3v-1.8c0-2.3 2-4.1 4.3-4.1h5.1V6.8C15.4 3.7 13.9 2 11.9 2zM9.5 4.3a.8.8 0 110-1.6.8.8 0 010 1.6z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c3.1 0 5.1-.7 5.1-2.7v-2h-5.2v-.7h7.3c2 0 3.7-1.3 3.7-3.8 0-2.4-1.5-3.8-3.7-3.8h-1.3v1.8c0 2.3-2 4.1-4.3 4.1H8.6v2.3c0 3.1 1.5 4.8 3.5 4.8zm2.4-2.3a.8.8 0 110 1.6.8.8 0 010-1.6z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  // Firebase
  if (name.includes('firebase')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M4.2 18.2l3.2-16c.1-.4.6-.5.8-.2l4.1 7.6-8.1 8.6z" fill="#FFA000" />
        <path d="M14.8 6.5l-2.5-4.8c-.2-.4-.8-.4-1 0L4.2 18.2l10.6-11.7z" fill="#F57C00" />
        <path d="M12 22.8l7.8-4.4-4-11.9c-.1-.4-.7-.5-.9-.1L4.2 18.2 12 22.8z" fill="#FFCA28" />
      </svg>
    );
  }

  // Supabase
  if (name.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M13.2 23.6a1 1 0 01-1.6-.8l.8-9.4H3.8c-.8 0-1.3-.9-.9-1.6L12.5.4a1 1 0 011.6.8l-.8 9.4h8.6c.8 0 1.3.9.9 1.6L13.2 23.6z"
          fill="#3ECF8E"
        />
      </svg>
    );
  }

  // TypeScript / JavaScript
  if (name.includes('typescript') || name === 'ts') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 10H6.5V12H8V18H10V12H11.5V10Z" fill="white" />
        <path d="M17.5 12.2C17.5 11 16.5 10 15 10C13.5 10 12.5 11 12.5 12.5C12.5 14.5 14 15 15.5 15.5C16.5 16 16.5 16.5 16.5 17C16.5 17.5 16 18 15 18C14 18 13.5 17.5 13.5 16.8H12C12 18.5 13.2 19.5 15 19.5C16.8 19.5 18 18.5 18 17C18 15 16.5 14.5 15 14C14 13.5 14 13 14 12.5C14 12 14.5 11.5 15 11.5C15.8 11.5 16.2 11.8 16.3 12.2H17.5Z" fill="white" />
      </svg>
    );
  }
  if (name.includes('javascript') || name === 'js') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M8 12V18C8 19 7 19 6 18.5V17C6.5 17.3 7 17.5 7 17V12H8Z" fill="#000000" />
        <path d="M14 14C14 13 13 12 11.5 12C10 12 9 13 9 14.5C9 16.5 10.5 17 12 17.5C13 18 13 18.5 13 19C13 19.5 12.5 20 11.5 20C10.5 20 10 19.5 10 18.8H9C9 20.5 10.2 21.5 12 21.5C13.8 21.5 15 20.5 15 19C15 17 13.5 16.5 12 16C11 15.5 11 15 11 14.5C11 14 11.5 13.5 12 13.5C12.8 13.5 13.2 13.8 13.3 14.2H14Z" fill="#000000" />
      </svg>
    );
  }

  // Tailwind CSS
  if (name.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3.1 6.8 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.8-1.1-2.7-2-1.4-1.4-3-3.1-6.8-3.1zM5.4 14.5c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3.1 6.8 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.8-1.1-2.7-2-1.4-1.4-3-3.1-6.8-3.1z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // Next.js
  if (name.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="11" fill="black" stroke="white" strokeWidth="1.5" />
        <path d="M15.5 8.5V15.5L8.5 8.5V15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Node.js
  if (name.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L3 7.2v10.4L12 22.8l9-5.2V7.2L12 2z" fill="#5FA04E" />
      </svg>
    );
  }

  // Figma
  if (name.includes('figma')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#F24E1E" />
        <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#FF7262" />
        <path d="M8 7h4v5H8a2.5 2.5 0 010-5z" fill="#A259FF" />
        <path d="M12 7h4a2.5 2.5 0 010 5 2.5 2.5 0 010 5h-4V7z" fill="#1ABCFE" />
        <path d="M8 12h4v5H8a2.5 2.5 0 010-5z" fill="#0ACF83" />
      </svg>
    );
  }

  // AI / OpenAI / Gemini
  if (name.includes('ai') || name.includes('gpt') || name.includes('gemini') || name.includes('openai') || name.includes('llm')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"
          fill="url(#tech-ai-grad)"
        />
        <defs>
          <linearGradient id="tech-ai-grad" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#818CF8" />
            <stop offset="1" stopColor="#C084FC" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Default clean code chip icon
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-indigo-400">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function TechIcon({ name, className = 'w-3.5 h-3.5 inline-block' }) {
  const icon = getTechIconSvg(name);
  if (!icon) return null;
  return <span className={className}>{icon}</span>;
}
