import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { MultiversePortal } from "@/components/MultiversePortal";
import { GitBranch, Sparkles, Rocket, Users, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  const features = [
    { icon: GitBranch, text: "Fork Career Paths" },
    { icon: Sparkles, text: "Explore What-Ifs" },
    { icon: Rocket, text: "Track Progress" },
    { icon: Users, text: "Compare Outcomes" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Portal Background */}
      <MultiversePortal />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Explore Infinite Possibilities</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Career</span>
          <br />
          <span className="text-glow bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Multiverse
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Every career decision creates a new reality. Explore unlimited what-if paths
          without commitment, fear, or loss of progress.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <NeonButton variant="primary" size="lg" onClick={onExplore}>
            Enter the Multiverse
          </NeonButton>

          <Dialog>
            <DialogTrigger asChild>
              <NeonButton
                variant="ghost"
                size="lg"
                className="group"
              >
                <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" /> Watch Demo
              </NeonButton>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 border-primary/50 bg-black/90 backdrop-blur-3xl overflow-hidden aspect-video">
              <div className="w-full h-full flex items-center justify-center bg-black relative">
                {/* Placeholder for Demo Video - using a retro grid loop or similar if possible, but YT embed is safest */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/5D3vbbLg5d4?si=autoplay=1&mute=0"
                  title="Career Multiverse Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
