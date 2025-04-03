import { useTheme } from '@/components/provider/theme-provider';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  return (
    <>
      {theme === 'dark' ? (
        <Sun onClick={() => setTheme('light')} />
      ) : (
        <Moon onClick={() => setTheme('dark')} />
      )}
    </>
  );
};

export default DarkModeToggle;
