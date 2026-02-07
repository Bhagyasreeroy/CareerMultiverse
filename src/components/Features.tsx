import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  GitBranch, Layers, History, Target, 
  Brain, Swords, LineChart, Sparkles
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Timeline Branching",
    description: "Fork career paths like Git branches. Each decision creates a new reality to explore.",
    color: "primary",
  },
  {
    icon: Layers,
    title: "Independent Realities",
    description: "Each branch has its own skills, resources, timelines, and success metrics.",
    color: "secondary",
  },
  {
    icon: History,
    title: "Version History",
    description: "Every change is preserved. Compare, rollback, or duplicate any career state.",
    color: "accent",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description: "See exactly what skills you need to bridge the gap to your target role.",
    color: "success",
  },
  {
    icon: Brain,
    title: "Smart Roadmaps",
    description: "AI-curated learning paths with courses, books, and practice resources.",
    color: "warning",
  },
  {
    icon: Swords,
    title: "Interview Simulation",
    description: "Practice with tailored mock interviews for each career path.",
    color: "secondary",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visual dashboards showing your journey across all active realities.",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "What-If Predictions",
    description: "\"If you continue this path, you'll reach X by Y\" simulations.",
    color: "accent",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Multiverse </span>
            <span className="text-glow bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to navigate infinite career possibilities
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-6 h-full group hover:border-white/20 transition-all duration-300">
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: feature.color === "primary" 
                      ? "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.1))"
                      : feature.color === "secondary"
                      ? "linear-gradient(135deg, hsl(var(--secondary) / 0.3), hsl(var(--secondary) / 0.1))"
                      : feature.color === "accent"
                      ? "linear-gradient(135deg, hsl(var(--accent) / 0.3), hsl(var(--accent) / 0.1))"
                      : feature.color === "success"
                      ? "linear-gradient(135deg, hsl(var(--success) / 0.3), hsl(var(--success) / 0.1))"
                      : "linear-gradient(135deg, hsl(var(--warning) / 0.3), hsl(var(--warning) / 0.1))",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon 
                    className="w-7 h-7"
                    style={{
                      color: feature.color === "primary" 
                        ? "hsl(var(--primary))"
                        : feature.color === "secondary"
                        ? "hsl(var(--secondary))"
                        : feature.color === "accent"
                        ? "hsl(var(--accent))"
                        : feature.color === "success"
                        ? "hsl(var(--success))"
                        : "hsl(var(--warning))",
                    }}
                  />
                </motion.div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
