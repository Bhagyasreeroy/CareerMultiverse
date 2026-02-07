import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { 
  User, Briefcase, GraduationCap, Award, 
  Code, Target, BookOpen, Building,
  Plus, Edit3, FileText
} from "lucide-react";

const profileSections = [
  {
    title: "Resume Builder",
    description: "Craft your story for each reality",
    icon: FileText,
    color: "primary",
    items: ["Education", "Experience", "Projects", "Achievements"],
  },
  {
    title: "Skill Inventory",
    description: "Track your evolving capabilities",
    icon: Code,
    color: "secondary",
    items: ["Technical Skills", "Soft Skills", "Certifications"],
  },
  {
    title: "Target Roles",
    description: "Define your destination universes",
    icon: Target,
    color: "accent",
    items: ["Frontend Dev", "Full Stack", "Data Analyst"],
  },
  {
    title: "Dream Companies",
    description: "Choose your reality destinations",
    icon: Building,
    color: "warning",
    items: ["FAANG", "Startups", "Fortune 500"],
  },
];

const learningResources = [
  { type: "Courses", count: 12, icon: GraduationCap },
  { type: "Books", count: 8, icon: BookOpen },
  { type: "Projects", count: 5, icon: Briefcase },
  { type: "Certifications", count: 3, icon: Award },
];

export const ProfileBuilder = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Build Your </span>
            <span className="text-glow-secondary bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Profile
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            One identity, infinite expressions across every career reality
          </p>
        </motion.div>

        {/* Profile avatar card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GlassCard className="p-8" glow>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Basic info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Career Explorer
                </h3>
                <p className="text-muted-foreground mb-4">
                  Navigating the multiverse of possibilities
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full text-sm bg-primary/20 text-primary border border-primary/30">
                    3 Active Realities
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-secondary/20 text-secondary border border-secondary/30">
                    24 Skills
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-success/20 text-success border border-success/30">
                    CGPA: 8.5
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {learningResources.map((resource, index) => (
                  <motion.div
                    key={resource.type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-muted/20 border border-white/5"
                  >
                    <resource.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-display font-bold text-foreground">
                      {resource.count}
                    </div>
                    <div className="text-xs text-muted-foreground">{resource.type}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Profile sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full group hover:border-white/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-xl"
                      style={{
                        background: section.color === "primary" 
                          ? "hsl(var(--primary) / 0.2)"
                          : section.color === "secondary"
                          ? "hsl(var(--secondary) / 0.2)"
                          : section.color === "accent"
                          ? "hsl(var(--accent) / 0.2)"
                          : "hsl(var(--warning) / 0.2)",
                      }}
                    >
                      <section.icon 
                        className="w-6 h-6"
                        style={{
                          color: section.color === "primary" 
                            ? "hsl(var(--primary))"
                            : section.color === "secondary"
                            ? "hsl(var(--secondary))"
                            : section.color === "accent"
                            ? "hsl(var(--accent))"
                            : "hsl(var(--warning))",
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  <NeonButton variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4" />
                  </NeonButton>
                </div>

                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm rounded-lg bg-muted/30 text-muted-foreground border border-white/5 hover:border-white/20 hover:text-foreground transition-all cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 text-sm rounded-lg border border-dashed border-white/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                    + Add more
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
