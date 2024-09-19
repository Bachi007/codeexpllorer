import { CheckIcon, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useColorScheme } from "./ui/context/ColorSchemeContex";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
    const { setColorScheme, colorScheme } = useColorScheme();
  
    const isActive = (themeName: string) => (theme === themeName ? <CheckIcon className='ml-2 h-4 w-4' /> : null);
    const isColorSchemeActive = (scheme: string) => (colorScheme === scheme ? <CheckIcon className='ml-2 h-4 w-4' /> : null);
  
    const handleThemeChange = (themeName: string, colorScheme?: string) => {
      setTheme(themeName);
      if (colorScheme) {
        setColorScheme(colorScheme);
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full p-0 bg-foreground hover:bg-muted text-background hover:text-muted-foreground border-0 outline-none">
            <Palette className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[99998]">
          <DropdownMenuItem onClick={() => handleThemeChange('light')}>
            <span>Light</span>{isActive('light')}
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Light Themes</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleThemeChange('light-blue', 'blue')}>
                <span>Blue</span>{isColorSchemeActive('blue')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('light-yellow', 'yellow')}>
                <span>Yellow</span>{isColorSchemeActive('yellow')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('light-green', 'green')}>
                <span>Green</span>{isColorSchemeActive('green')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('light-red', 'red')}>
                <span>Red</span>{isColorSchemeActive('red')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('light-orange', 'orange')}>
                <span>Orange</span>{isColorSchemeActive('orange')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('light-violet', 'violet')}>
                <span>Violet</span>{isColorSchemeActive('violet')}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
  
          <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
            <span>Dark</span>{isActive('dark')}
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Dark Themes</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleThemeChange('dark-blue', 'blue')}>
                <span>Blue</span>{isColorSchemeActive('blue')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark-yellow', 'yellow')}>
                <span>Yellow</span>{isColorSchemeActive('yellow')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark-green', 'green')}>
                <span>Green</span>{isColorSchemeActive('green')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark-red', 'red')}>
                <span>Red</span>{isColorSchemeActive('red')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark-orange', 'orange')}>
                <span>Orange</span>{isColorSchemeActive('orange')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark-violet', 'violet')}>
                <span>Violet</span>{isColorSchemeActive('violet')}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
  
          <DropdownMenuItem onClick={() => handleThemeChange('custom')}>
            <span>Custom</span>{isActive('custom')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }