"use client";

import { Monitor, Moon, Settings, Sun, Check } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "omnisignal-theme";

const themeOptions: {
  value: Theme;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
];

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  const resolvedTheme =
    theme === "system" ? getSystemTheme() : theme;

  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);

  root.style.colorScheme = resolvedTheme;

  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeSettingsDropdown() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      STORAGE_KEY
    ) as Theme | null;

    const validTheme: Theme =
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
        ? savedTheme
        : "system";

    setTheme(validTheme);

    applyTheme(validTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, [theme]);

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);

    applyTheme(selectedTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Theme Settings"
          >
            <Settings className="size-5" />
          </Button>
        }
      />

      <DropdownMenuContent className="min-w-48">
        <div className="px-2 py-1.5 text-sm font-medium">
          Appearance
        </div>

        <DropdownMenuSeparator />

        {themeOptions.map((option) => {
          const Icon = option.icon;

          const isActive = theme === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              closeOnClick
              onClick={() =>
                handleThemeChange(option.value)
              }
              className="flex items-center gap-2"
            >
              <Icon className="size-4" />

              <span>{option.label}</span>

              {isActive && (
                <Check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}