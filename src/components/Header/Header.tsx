import {
  Bell,
  Command,
  LifeBuoy,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeSettingsDropdown } from "@/components/Header/ThemeSettingsDropdown";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-black/20">
      <div className="flex h-full w-20 shrink-0 items-center justify-center border-r border-slate-200/80 md:w-72 md:justify-start md:px-5 dark:border-slate-800/80">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label="Omnisignal home"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/15 dark:bg-white dark:text-slate-950 dark:shadow-black/30">
            O
          </span>
          <span className="hidden md:block">
            <span className="block text-base font-semibold leading-5 tracking-normal text-slate-950 dark:text-white">
              Omnisignal
            </span>
            <span className="block text-xs font-medium leading-4 text-slate-500 dark:text-slate-400">
              Client activity intelligence
            </span>
          </span>
        </a>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-3 md:px-6">
        <div className="hidden min-w-0 flex-1 items-center md:flex">
          <label className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search clients, sessions, funnels..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-3 focus:ring-slate-200/80 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-700 dark:focus:bg-slate-900 dark:focus:ring-slate-700/50"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[11px] font-medium text-slate-500 lg:flex dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              <Command className="size-3" /> K
            </span>
          </label>
        </div>

        <div className="flex flex-1 items-center justify-between gap-2 md:flex-none md:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 gap-2 md:flex"
          >
            <Sparkles className="size-4" />
            Insights
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            className="md:hidden"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon-lg" aria-label="Support">
            <LifeBuoy className="size-5" />
          </Button>
          <ThemeSettingsDropdown />
          <Button
            variant="outline"
            size="icon-lg"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
          </Button>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-900 text-sm font-semibold text-white shadow-sm dark:border-slate-700 dark:bg-white dark:text-slate-950"
            aria-label="Account menu"
          >
            AV
          </a>
        </div>
      </div>
    </header>
  );
};
