'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { Search, GitBranch, Link, Mail, Terminal, Command as CommandIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  // Toggle menu via keyboard
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {/* Mobile Trigger & Visual Indicator */}
      <button 
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-none bg-surface border border-border shadow-2xl hover:bg-surface/80 transition-colors group flex items-center gap-2"
        aria-label="Open command menu"
      >
        <CommandIcon className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
        <span className="hidden sm:inline-block text-xs font-mono text-muted group-hover:text-foreground transition-colors">Cmd K</span>
      </button>

      {/* The Overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-xl z-50 overflow-hidden rounded-none drafting-border bg-surface shadow-2xl"
            >
              <Command 
                className="w-full flex flex-col overflow-hidden" 
                shouldFilter={true}
              >
                <div className="flex items-center border-b border-border px-4">
                  <Search className="w-5 h-5 text-muted mr-3" />
                  <Command.Input 
                    placeholder="[SYS_INPUT] Enter command..." 
                    className="flex-1 h-14 bg-transparent outline-none text-foreground placeholder:text-muted placeholder:font-mono font-mono text-sm"
                    autoFocus
                  />
                  <div className="text-[10px] font-mono text-muted px-2 py-1 drafting-border bg-background">ESC</div>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
                  <Command.Empty className="p-4 text-sm text-center text-muted font-mono">ERR_404: NO_RESULTS_FOUND</Command.Empty>

                  <Command.Group heading="NAVIGATION" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted">
                    <Command.Item 
                      onSelect={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="flex items-center gap-3 px-3 py-3 text-sm rounded-none cursor-pointer text-muted aria-selected:bg-background aria-selected:text-foreground aria-selected:drafting-border border border-transparent transition-all"
                    >
                      <Terminal className="w-4 h-4 text-accent" /> Home
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="HANDSHAKE_PROTOCOLS" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted mt-2">
                    <Command.Item 
                      onSelect={() => { window.open('mailto:sumitdixit.dev@gmail.com'); setOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 text-sm rounded-none cursor-pointer text-muted aria-selected:bg-background aria-selected:text-foreground aria-selected:drafting-border border border-transparent transition-all"
                    >
                      <Mail className="w-4 h-4 text-accent" /> Initiate Email
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => { window.open('https://github.com/Sumitdixit2'); setOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 text-sm rounded-none cursor-pointer text-muted aria-selected:bg-background aria-selected:text-foreground aria-selected:drafting-border border border-transparent transition-all"
                    >
                      <GitBranch className="w-4 h-4 text-accent" /> View GitHub profile
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => { window.open('https://linkedin.com'); setOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 text-sm rounded-none cursor-pointer text-muted aria-selected:bg-background aria-selected:text-foreground aria-selected:drafting-border border border-transparent transition-all"
                    >
                      <Link className="w-4 h-4 text-accent" /> View LinkedIn profile
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
