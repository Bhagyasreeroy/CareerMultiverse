import { motion } from "framer-motion";
import { useCareer } from '@/hooks/useCareer';
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  Target, TrendingUp, Code, Brain,
  Briefcase, Activity, BookOpen
} from "lucide-react";
import { RealityTree } from "@/components/career/RealityTree";
import { RealitySimulator } from "@/components/career/RealitySimulator";
import { SkillBuilder } from "@/components/career/SkillBuilder";
import { ResumeBuilder } from "@/components/career/ResumeBuilder";
import { SmartRoadmap } from "@/components/career/SmartRoadmap";
import { VersionHistory } from "@/components/career/VersionHistory";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Helper to map skill category to icon/color
const getSkillCategoryStyles = (category: string) => {
  switch (category) {
    case 'technical': return { icon: Code, color: 'primary' as const };
    case 'soft': return { icon: Brain, color: 'secondary' as const };
    case 'domain': return { icon: Briefcase, color: 'accent' as const };
    default: return { icon: Target, color: 'warning' as const };
  }
};

export const Dashboard = () => {
  const { activeReality } = useCareer();

  // Derived state
  const skills = activeReality?.skills || [];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section className="py-20 px-6" id="dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Mission </span>
            <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Control
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Active Reality: <span className="text-primary font-bold">{activeReality?.name}</span>
          </p>
        </motion.div>

        {/* Development Tool: Reality Simulator */}
        <div className="mb-8 flex justify-center">
          <RealitySimulator />
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:text-primary">Overview</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-background data-[state=active]:text-primary">Skills & Milestones</TabsTrigger>
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-background data-[state=active]:text-primary">Smart Roadmap</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-background data-[state=active]:text-primary">Time Travel</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overall Progress Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard className="p-6 h-full" glow glowColor="primary">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold">Readiness</h3>
                  </div>

                  <div className="flex justify-center mb-6">
                    <ProgressRing progress={64} size={160} strokeWidth={12} color="primary" label="Ready" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Skills Mastered</span>
                      <span className="font-mono text-primary">12/40</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-mono text-secondary">3/8</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Reality Tree Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <GlassCard className="p-6 h-full border-primary/20" glow glowColor="secondary">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/20">
                        <TrendingUp className="w-5 h-5 text-secondary" />
                      </div>
                      <h3 className="font-display text-xl font-bold">Reality Tree</h3>
                    </div>
                  </div>
                  <RealityTree />
                </GlassCard>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills Breakdown */}
              <GlassCard className="p-6">
                <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" /> Skill Inventory
                </h3>
                <div className="space-y-4">
                  {Object.entries(skillsByCategory).map(([category, catSkills]) => {
                    const { icon: Icon, color } = getSkillCategoryStyles(category);
                    return (
                      <div key={category} className="space-y-2">
                        <h4 className="text-sm font-semibold capitalize text-muted-foreground flex items-center gap-2">
                          <Icon className={`w-3 h-3 text-${color}`} /> {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(catSkills as any[]).map((skill: any) => (
                            <div key={skill.id} className="text-xs px-2 py-1 rounded bg-muted/50 border border-white/5">
                              {skill.name} <span className="text-muted-foreground ml-1">{skill.proficiency}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6">
                  <SkillBuilder realityId={activeReality?.id || ''} existingSkills={activeReality?.skills || []} />
                </div>
              </GlassCard>

              {/* Resume Builder - NOW AS DIALOG */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold">Resume Studio</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Craft a tailored resume for this reality. Auto-fill skills and export to PDF.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <NeonButton className="w-full justify-center">
                      Open Resume Studio
                    </NeonButton>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] h-[95vh] flex flex-col p-0 border-white/10 bg-black/95 backdrop-blur-xl">
                    <div className="p-6 flex-1 overflow-hidden">
                      <ResumeBuilder />
                    </div>
                  </DialogContent>
                </Dialog>
              </GlassCard>
            </div>
          </TabsContent>

          <TabsContent value="roadmap">
            {activeReality && <SmartRoadmap reality={activeReality} />}
          </TabsContent>

          <TabsContent value="history">
            {activeReality && <VersionHistory reality={activeReality} />}
          </TabsContent>
        </Tabs>
      </div>
    </section >
  );
};
