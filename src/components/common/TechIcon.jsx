import React, { useState } from 'react';

/**
 * theSVG slug dictionary mapping common tech names to thesvg.org slugs
 */
export const THESVG_SLUG_MAP = {
  'compose': 'compose',
  'jetpack compose': 'compose',
  'jetpackcompose': 'compose',
  'react': 'react',
  'react native': 'react',
  'reactnative': 'react',
  'next.js': 'nextjs',
  'nextjs': 'nextjs',
  'next': 'nextjs',
  'tailwind': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'tailwindcss': 'tailwindcss',
  'node': 'nodejs',
  'node.js': 'nodejs',
  'nodejs': 'nodejs',
  'vue': 'vue',
  'vue.js': 'vue',
  'vuejs': 'vue',
  'svelte': 'svelte',
  'angular': 'angular',
  'python': 'python',
  'kotlin': 'kotlin',
  'kmp': 'kotlin',
  'swift': 'swift',
  'swiftui': 'swift',
  'ios': 'apple',
  'apple': 'apple',
  'android': 'android',
  'flutter': 'flutter',
  'dart': 'dart',
  'docker': 'docker',
  'kubernetes': 'kubernetes',
  'k8s': 'kubernetes',
  'aws': 'aws',
  'amazon web services': 'aws',
  'gcp': 'googlecloud',
  'google cloud': 'googlecloud',
  'googlecloud': 'googlecloud',
  'azure': 'azure',
  'github': 'github',
  'gitlab': 'gitlab',
  'git': 'git',
  'postgresql': 'postgresql',
  'postgres': 'postgresql',
  'mongodb': 'mongodb',
  'mongo': 'mongodb',
  'redis': 'redis',
  'sqlite': 'sqlite',
  'mysql': 'mysql',
  'graphql': 'graphql',
  'firebase': 'firebase',
  'supabase': 'supabase',
  'typescript': 'typescript',
  'ts': 'typescript',
  'javascript': 'javascript',
  'js': 'javascript',
  'figma': 'figma',
  'openai': 'openai',
  'chatgpt': 'openai',
  'gemini': 'google',
  'claude': 'anthropic',
  'anthropic': 'anthropic',
  'rust': 'rust',
  'go': 'go',
  'golang': 'go',
  'java': 'java',
  'c++': 'cplusplus',
  'cpp': 'cplusplus',
  'c#': 'csharp',
  'csharp': 'csharp',
  'php': 'php',
  'django': 'django',
  'fastapi': 'fastapi',
  'laravel': 'laravel',
  'spring': 'spring',
  'springboot': 'spring',
  'prisma': 'prisma',
  'drizzle': 'drizzle',
  'vite': 'vite',
  'linux': 'linux',
  'ubuntu': 'ubuntu',
  'stripe': 'stripe',
  'huggingface': 'huggingface',
  'tensorflow': 'tensorflow',
  'pytorch': 'pytorch',
  'postman': 'postman',
  'vscode': 'visualstudiocode',
  'visual studio code': 'visualstudiocode',
  'electron': 'electron',
  'tauri': 'tauri',
  'expo': 'expo',
  'vercel': 'vercel',
  'cloudflare': 'cloudflare',
};

export const POPULAR_TECH_LOGOS = [
  // Mobile
  { name: 'Kotlin', slug: 'kotlin', category: 'Mobile' },
  { name: 'Jetpack Compose', slug: 'compose', category: 'Mobile' },
  { name: 'Android', slug: 'android', category: 'Mobile' },
  { name: 'Apple / iOS', slug: 'apple', category: 'Mobile' },
  { name: 'Swift', slug: 'swift', category: 'Mobile' },
  { name: 'Flutter', slug: 'flutter', category: 'Mobile' },
  { name: 'React Native', slug: 'react', category: 'Mobile' },
  { name: 'Dart', slug: 'dart', category: 'Mobile' },
  { name: 'Expo', slug: 'expo', category: 'Mobile' },

  // Frontend
  { name: 'React', slug: 'react', category: 'Frontend' },
  { name: 'Next.js', slug: 'nextjs', category: 'Frontend' },
  { name: 'Vue.js', slug: 'vue', category: 'Frontend' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', category: 'Frontend' },
  { name: 'TypeScript', slug: 'typescript', category: 'Frontend' },
  { name: 'JavaScript', slug: 'javascript', category: 'Frontend' },
  { name: 'Svelte', slug: 'svelte', category: 'Frontend' },
  { name: 'Vite', slug: 'vite', category: 'Frontend' },
  { name: 'Angular', slug: 'angular', category: 'Frontend' },

  // Backend
  { name: 'Node.js', slug: 'nodejs', category: 'Backend' },
  { name: 'Python', slug: 'python', category: 'Backend' },
  { name: 'Rust', slug: 'rust', category: 'Backend' },
  { name: 'Go', slug: 'go', category: 'Backend' },
  { name: 'Java', slug: 'java', category: 'Backend' },
  { name: 'C#', slug: 'csharp', category: 'Backend' },
  { name: 'FastAPI', slug: 'fastapi', category: 'Backend' },
  { name: 'Django', slug: 'django', category: 'Backend' },
  { name: 'Laravel', slug: 'laravel', category: 'Backend' },
  { name: 'Spring Boot', slug: 'spring', category: 'Backend' },

  // Cloud & DevOps
  { name: 'AWS', slug: 'aws', category: 'Cloud' },
  { name: 'Google Cloud', slug: 'googlecloud', category: 'Cloud' },
  { name: 'Azure', slug: 'azure', category: 'Cloud' },
  { name: 'Docker', slug: 'docker', category: 'Cloud' },
  { name: 'Kubernetes', slug: 'kubernetes', category: 'Cloud' },
  { name: 'GitHub', slug: 'github', category: 'Cloud' },
  { name: 'GitLab', slug: 'gitlab', category: 'Cloud' },
  { name: 'Firebase', slug: 'firebase', category: 'Cloud' },
  { name: 'Supabase', slug: 'supabase', category: 'Cloud' },
  { name: 'Vercel', slug: 'vercel', category: 'Cloud' },
  { name: 'Cloudflare', slug: 'cloudflare', category: 'Cloud' },

  // Database
  { name: 'PostgreSQL', slug: 'postgresql', category: 'Database' },
  { name: 'MongoDB', slug: 'mongodb', category: 'Database' },
  { name: 'Redis', slug: 'redis', category: 'Database' },
  { name: 'MySQL', slug: 'mysql', category: 'Database' },
  { name: 'SQLite', slug: 'sqlite', category: 'Database' },
  { name: 'Prisma', slug: 'prisma', category: 'Database' },
  { name: 'GraphQL', slug: 'graphql', category: 'Database' },

  // AI & ML
  { name: 'OpenAI', slug: 'openai', category: 'AI' },
  { name: 'Claude', slug: 'anthropic', category: 'AI' },
  { name: 'Hugging Face', slug: 'huggingface', category: 'AI' },
  { name: 'PyTorch', slug: 'pytorch', category: 'AI' },
  { name: 'TensorFlow', slug: 'tensorflow', category: 'AI' },

  // Tools & Design
  { name: 'Figma', slug: 'figma', category: 'Tools' },
  { name: 'VS Code', slug: 'visualstudiocode', category: 'Tools' },
  { name: 'Postman', slug: 'postman', category: 'Tools' },
  { name: 'Linux', slug: 'linux', category: 'Tools' },
  { name: 'Stripe', slug: 'stripe', category: 'Tools' },
  { name: 'Git', slug: 'git', category: 'Tools' },
];

export function resolveTheSvgSlug(name) {
  if (!name || typeof name !== 'string') return null;
  const key = name.trim().toLowerCase();
  if (THESVG_SLUG_MAP[key]) return THESVG_SLUG_MAP[key];

  // Try direct clean slug
  const clean = key.replace(/[^a-z0-9]/g, '');
  if (THESVG_SLUG_MAP[clean]) return THESVG_SLUG_MAP[clean];
  return clean || null;
}

export function getLocalTechSvg(techName) {
  if (!techName || typeof techName !== 'string') return null;
  const name = techName.trim().toLowerCase();

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

  // Apple / iOS
  if (name === 'apple' || name === 'ios') {
    return (
      <svg viewBox="0 0 170 170" fill="currentColor" className="w-full h-full text-white">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.53-10.12-11.45-21.43-14.75-33.93-3.3-12.5-4.95-24.28-4.95-35.34 0-14.9 3.59-27.42 10.77-37.56 7.18-10.14 16.73-15.35 28.66-15.63 4.12 0 9.04 1.15 14.75 3.44 5.71 2.29 9.38 3.5 11.01 3.63 1.3 0 4.93-1.28 10.88-3.85 5.95-2.57 10.9-3.71 14.86-3.41 12.82.76 22.84 5.56 30.06 14.4-11.2 6.74-16.63 16.2-16.29 28.38.33 9.46 4.07 17.39 11.22 23.79 7.15 6.4 15.62 10.05 25.42 10.95-2.18 6.52-4.63 12.93-7.36 19.23zM119.22 31.86c0-7.39 2.66-14.46 7.98-21.2 5.32-6.74 11.95-10.66 19.89-11.76.22 1.3.33 2.45.33 3.44 0 7.39-2.83 14.78-8.49 22.18-5.66 7.4-12.44 11.66-20.34 12.78-.22-1.74-.37-3.55-.37-5.44z" />
      </svg>
    );
  }

  return null;
}

import { findLocalLogo, resolveLocalLogoSrc, LOCAL_LOGOS } from '../../data/localLogos';

export default function TechIcon({
  name,
  className = 'w-3.5 h-3.5 inline-block',
  variant = 'icon', // 'icon' (logoname_logo.png) | 'wordmark' (logoname_logo_2.png) | 'default'
}) {
  const [hasError, setHasError] = useState(false);

  // 1. Check local project ./logo/ folder first (user-provided assets)
  // logoname_logo.png = icon only, logoname_logo_2.png = logo with name
  const localLogoSrc = resolveLocalLogoSrc(name, variant === 'wordmark' ? 'wordmark' : 'icon');
  if (localLogoSrc && !hasError) {
    return (
      <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
        <img
          src={localLogoSrc}
          alt={name}
          crossOrigin="anonymous"
          onError={() => setHasError(true)}
          className="w-full h-full object-contain block pointer-events-none select-none"
        />
      </span>
    );
  }

  // 2. If custom local vector SVG is matched, render directly
  const localSvg = getLocalTechSvg(name);
  if (localSvg) {
    return <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>{localSvg}</span>;
  }

  // 3. Resolve theSVG CDN slug (7,600+ brand logos)
  const slug = resolveTheSvgSlug(name);
  if (!slug || hasError) {
    // Clean default code chip fallback
    return (
      <span className={`inline-flex items-center justify-center flex-shrink-0 text-indigo-400 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </span>
    );
  }

  // 4. Render official SVG from theSVG open library CDN
  const cdnUrl = `https://thesvg.org/icons/${slug}/${variant === 'mono' ? 'mono' : 'default'}.svg`;

  return (
    <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      <img
        src={cdnUrl}
        alt={name}
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className="w-full h-full object-contain block pointer-events-none select-none"
      />
    </span>
  );
}
