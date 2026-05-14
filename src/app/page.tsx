'use client';

import { motion } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { AetherSchematic } from '@/components/sections/aether-schematic';
import { OperatorProfile } from '@/components/sections/operator-profile';
import { OperationsPanel } from '@/components/sections/operations-panel';
import { ResearchArchive } from '@/components/sections/research-archive';
import { SystemSpecs } from '@/components/sections/system-specs';

import { AetherObservatory } from '@/components/sections/aether-observatory';
// We will replace BentoGrid with a Schematic flow later.

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'linear' as const } },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full relative pt-24 md:pt-32 pb-32">
      {/* 
        The main content column. 
        It sits perfectly between the fixed drafting lines created in layout.tsx 
      */}
      {/* Hero / System Entry */}
      <div id="sys-entry" className="relative min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 mt-24 lg:mt-0 w-full">

          {/* Left Column: Identity Console */}
          <motion.section
            className="drafting-border bg-surface/50 p-8 md:p-12 flex flex-col justify-center w-full"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {/* Top Bar of the Title Block */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end mb-16 gap-6 drafting-border-b pb-6">
              <motion.div variants={fadeVariant}>
                <SystemAnnotation label="DOC_TYPE" value="SYSTEMS_ARCHITECTURE_PORTFOLIO" />
              </motion.div>
              <motion.div variants={fadeVariant} className="flex gap-8">
                <SystemAnnotation label="REV" value="v2.0.26" />
                <SystemAnnotation label="STATUS" value={<span className="text-accent">ONLINE</span>} />
              </motion.div>
            </div>

            {/* Main Title Area */}
            <motion.div variants={fadeVariant} className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.1] mb-4">
                Sumit Dixit
              </h1>
              <h2 className="text-xl md:text-2xl text-muted font-light tracking-wide">
                Backend Developer &amp; DevOps Engineer
              </h2>
            </motion.div>

            {/* Technical Summary */}
            <motion.div variants={fadeVariant} className="grid grid-cols-1 md:grid-cols-2 gap-8 drafting-border-t pt-8">
              <div>
                <SystemAnnotation
                  label="PRIMARY_OBJECTIVE"
                  value="Architecting robust, scalable systems built to last decades without downtime."
                  className="max-w-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SystemAnnotation label="STACK.BACKEND" value="Node.js, Express, Postgres" />
                <SystemAnnotation label="STACK.DEVOPS" value="Docker, Nginx, Actions" />
              </div>
            </motion.div>
          </motion.section>

          {/* Operator Registry Panel (Right Column) */}
          <motion.aside
            className="group drafting-border bg-surface/30 relative flex flex-col min-h-[400px] lg:min-h-full aspect-[3/4] lg:aspect-auto w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Precision Crosshairs */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/50 -translate-x-[1px] -translate-y-[1px] z-20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/50 translate-x-[1px] -translate-y-[1px] z-20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/50 -translate-x-[1px] translate-y-[1px] z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/50 translate-x-[1px] translate-y-[1px] z-20" />

            {/* Top Metadata */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <span className="font-mono text-[9px] text-accent/80 uppercase tracking-widest bg-background/90 px-2 py-1 backdrop-blur-md drafting-border">
                [VISUAL_IDENT_CONFIRMED]
              </span>
              <span className="font-mono text-[9px] text-muted uppercase tracking-widest bg-background/80 px-2 py-1 drafting-border">
                ID: SD-001
              </span>
            </div>

            {/* Portrait Container */}
            <div className="absolute inset-0 z-10 p-2">
              <div className="w-full h-full bg-[#0A192F] relative overflow-hidden drafting-border mix-blend-luminosity grayscale opacity-75 group-hover:opacity-100 transition-opacity duration-700">
                {/* Temporary Unsplash portrait for structural demonstration */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Sumit Dixit - Operator Profile"
                  className="object-cover w-full h-full object-center opacity-80"
                />

                {/* Bottom Gradient Fade for Data Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
              </div>
            </div>

            {/* Bottom Metadata */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="font-mono text-[10px] text-muted flex flex-col gap-1.5 bg-background/90 backdrop-blur-md p-3 drafting-border">
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span>CLEARANCE</span>
                  <span className="text-foreground/80">LEVEL_4</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>STATUS</span>
                  <span className="text-accent flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    OPERATOR_ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

        </div>
      </div>

      <AetherObservatory />

      <div className="max-w-4xl mx-auto px-8 md:px-32 flex flex-col gap-24 pb-32 mt-12 md:mt-24">
        {/* System Architecture Showcase */}
        <div id="architecture" className="scroll-mt-32">
          <AetherSchematic />
        </div>

        {/* Human Operator Subsystem */}
        <div id="operator" className="scroll-mt-32">
          <OperatorProfile />
        </div>

        {/* System Operations Modules */}
        <div id="operations" className="scroll-mt-32">
          <OperationsPanel />
        </div>

        {/* Technical Research Registry */}
        <div id="research" className="scroll-mt-32">
          <ResearchArchive />
        </div>

        {/* Dependencies and Handshake */}
        <div className="pt-8 border-t border-border/50">
          <SystemSpecs />
        </div>
      </div>
    </main>
  );
}
