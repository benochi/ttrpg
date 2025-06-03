import { cookies } from 'next/headers';

export async function ThemeScript() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'system';

  // This script runs before React hydrates to prevent theme flash
  const script = `
    (function() {
      try {
        const theme = '${theme}';
        let resolvedTheme;
        
        if (theme === 'system') {
          resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
          resolvedTheme = theme;
        }
        
        document.documentElement.setAttribute('data-theme', resolvedTheme);
      } catch (e) {
        // Fallback to light theme
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}