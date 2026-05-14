'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { TechBadge } from '@/components/ui/tech-badge';
import { ShieldAlert, Database, Server, KeySquare, GitMerge, ArrowUpRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function BentoGrid() {
  return (
    <motion.section
      className="max-w-5xl mx-auto px-6 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4">
        
        {/* Philosophy Card */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <GlassCard className="h-full p-6 flex flex-col justify-between" hoverable>
            <ShieldAlert className="w-6 h-6 text-accent mb-4 opacity-70" />
            <div>
              <h3 className="text-lg font-medium text-foreground mb-1">Decade-Lasting</h3>
              <p className="text-sm text-muted">Building robust systems that gracefully handle failure, scale linearly, and require zero 3am pager duty.</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Featured Project: Aether */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 group">
          <GlassCard className="h-full p-6 flex flex-col relative overflow-hidden" hoverable>
            {/* Architectural Abstraction Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-auto relative z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Project Aether</h2>
                <p className="text-muted font-mono text-sm max-w-md">
                  Management system for agencies handling high-concurrency client data.
                </p>
              </div>
              <a href="#" className="p-2 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-colors">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </a>
            </div>

            <div className="relative z-10 mt-12">
              <div className="mb-4 text-xs font-mono text-muted uppercase tracking-wider">Architecture Highlights</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                  <KeySquare className="w-5 h-5 text-accent mb-2" />
                  <h4 className="text-sm font-medium text-foreground">Custom JWT Auth</h4>
                  <p className="text-xs text-muted mt-1">Access/Refresh token rotation with aggressive rate limiting via Redis.</p>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                  <Server className="w-5 h-5 text-accent mb-2" />
                  <h4 className="text-sm font-medium text-foreground">PERN Stack</h4>
                  <p className="text-xs text-muted mt-1">Postgres constraints mapping tightly to Express routing logic.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tech Stack List */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <GlassCard className="h-full p-6" hoverable>
            <Database className="w-6 h-6 text-accent mb-6 opacity-70" />
            <h3 className="text-lg font-medium text-foreground mb-4">Core Stack</h3>
            <div className="flex flex-wrap gap-2">
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>Node.js</TechBadge>
              <TechBadge>Express</TechBadge>
              <TechBadge>PostgreSQL</TechBadge>
              <TechBadge>Redis</TechBadge>
              <TechBadge>Docker</TechBadge>
              <TechBadge>Nginx</TechBadge>
              <TechBadge>Linux CLI</TechBadge>
              <TechBadge>GitHub Actions</TechBadge>
              <TechBadge>React / Next.js</TechBadge>
            </div>
          </GlassCard>
        </motion.div>

        {/* Education */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <GlassCard className="h-full p-6 flex flex-col justify-between" hoverable>
            <GitMerge className="w-6 h-6 text-accent mb-4 opacity-70" />
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">Sophomore @ VIPS</h3>
              <p className="text-xs text-muted font-mono mb-2">BCA (GGSIPU)</p>
              <p className="text-xs text-muted border-t border-border pt-2 mt-2">Smart India Hackathon (College Level Qualifier)</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact / CTA */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <GlassCard className="h-full p-6 flex flex-col justify-center items-center text-center bg-white/[0.02]" hoverable>
            <h3 className="text-lg font-medium text-foreground mb-2">System Access</h3>
            <p className="text-sm text-muted mb-4">Ready to architect your next infrastructure.</p>
            <a 
              href="mailto:contact@example.com" 
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors bg-foreground text-background rounded-md hover:bg-foreground/90"
            >
              Initiate Handshake
            </a>
          </GlassCard>
        </motion.div>

      </div>
    </motion.section>
  );
}
