import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { CareerManager } from '@/services/CareerManager';
import { RealityId } from '@/types/career';
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRightLeft, Check, AlertTriangle, Calendar as CalendarIcon, GitMerge, Sparkles, BrainCircuit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/ui/NeonButton";
import { toast } from "sonner";
import { useEffect, useState } from 'react';
import { AIComparisonService, AIAnalysisResult } from '@/services/AIComparisonService';
import { motion } from 'framer-motion';

interface RealityComparatorProps {
    realityIdA: RealityId;
    realityIdB: RealityId;
}

export const RealityComparator = ({ realityIdA, realityIdB }: RealityComparatorProps) => {
    const { realityA, realityB, uniqueToA, uniqueToB, sharedSkills, glitches } = CareerManager.compareRealities(realityIdA, realityIdB);
    const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (realityA && realityB) {
            setLoading(true);
            AIComparisonService.analyzeComparison(realityA, realityB)
                .then(result => {
                    setAnalysis(result);
                    setLoading(false);
                });
        }
    }, [realityA, realityB, realityIdA, realityIdB]);

    if (!realityA || !realityB) return <div>Realities not found</div>;

    const chartConfig = {
        realityA: {
            label: realityA.name,
            color: "hsl(var(--primary))",
        },
        realityB: {
            label: realityB.name,
            color: "hsl(var(--secondary))",
        },
    } satisfies ChartConfig;

    return (
        <div className="flex flex-col h-full gap-4 max-h-[800px]">
            {/* AI Insight Section */}
            <GlassCard className="p-4 shrink-0 bg-primary/5 border-primary/20" glow>
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/20 shrink-0">
                        <BrainCircuit className={`w-6 h-6 text-primary ${loading ? 'animate-pulse' : ''}`} />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                            Multiverse AI Analyst
                            {!loading && <Badge variant="outline" className="text-xs border-primary/50 text-primary">{analysis?.compatibilityScore}% Compatibility</Badge>}
                        </h3>

                        {loading ? (
                            <div className="space-y-2 mt-2">
                                <div className="h-4 w-3/4 bg-primary/10 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-primary/10 rounded animate-pulse" />
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p className="text-sm text-foreground mb-2">{analysis?.summary}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/30 p-2 rounded-lg border border-white/5">
                                    <Sparkles className="w-3 h-3 text-warning" />
                                    <strong>Recommendation:</strong> {analysis?.recommendation}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                {/* Reality A Column */}
                <GlassCard className="p-4 flex flex-col h-full border-l-4 border-l-primary" glow glowColor="primary">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-primary">{realityA.name}</h3>
                        <p className="text-xs text-muted-foreground">{realityA.description}</p>
                    </div>

                    <ScrollArea className="flex-1 pr-4">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" /> Unique Skills
                                </h4>
                                {uniqueToA.skills.length === 0 ? (
                                    <p className="text-xs text-muted-foreground italic">No unique skills</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueToA.skills.map(s => (
                                            <Badge key={s.id} variant="secondary" className="bg-primary/20 text-primary-foreground hover:bg-primary/30">
                                                {s.name} ({s.proficiency}%)
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-primary" /> Unique Milestones
                                </h4>
                                <div className="space-y-2">
                                    {uniqueToA.milestones.map(m => (
                                        <div key={m.id} className="p-2 rounded bg-muted/20 text-sm">
                                            {m.title}
                                        </div>
                                    ))}
                                    {uniqueToA.milestones.length === 0 && (
                                        <p className="text-xs text-muted-foreground italic">No unique milestones</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </GlassCard>

                {/* Reality B Column */}
                <GlassCard className="p-4 flex flex-col h-full border-r-4 border-r-secondary" glow glowColor="secondary">
                    <div className="mb-4 text-right">
                        <h3 className="text-xl font-bold text-secondary">{realityB.name}</h3>
                        <p className="text-xs text-muted-foreground">{realityB.description}</p>
                    </div>

                    <ScrollArea className="flex-1 pl-4" dir="rtl">
                        <div className="space-y-6 text-left" dir="ltr">
                            <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 justify-end">
                                    Unique Skills <Check className="w-4 h-4 text-secondary" />
                                </h4>
                                {uniqueToB.skills.length === 0 ? (
                                    <p className="text-xs text-muted-foreground italic text-right">No unique skills</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        {uniqueToB.skills.map(s => (
                                            <Badge key={s.id} variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                                                {s.name} ({s.proficiency}%)
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 justify-end">
                                    Unique Milestones <CalendarIcon className="w-4 h-4 text-secondary" />
                                </h4>
                                <div className="space-y-2">
                                    {uniqueToB.milestones.map(m => (
                                        <div key={m.id} className="p-2 rounded bg-muted/20 text-sm text-right">
                                            {m.title}
                                        </div>
                                    ))}
                                    {uniqueToB.milestones.length === 0 && (
                                        <p className="text-xs text-muted-foreground italic text-right">No unique milestones</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </GlassCard>
            </div>

            {/* Shared Skills Comparison Chart */}
            {sharedSkills.length > 0 && (
                <GlassCard className="p-4 shrink-0 bg-background/40">
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <ArrowRightLeft className="w-4 h-4" /> Skill Proficiency Comparison
                    </h3>
                    <div className="h-[200px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={sharedSkills} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeOpacity={0.1} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    fontSize={12}
                                />
                                <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="realityA" fill="var(--color-realityA)" radius={4} name={realityA.name} />
                                <Bar dataKey="realityB" fill="var(--color-realityB)" radius={4} name={realityB.name} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </GlassCard>
            )}

            {/* Deep Comparison Table */}
            <GlassCard className="p-4 shrink-0 bg-background/40 mt-4">
                <h3 className="text-sm font-bold mb-4">Deep Dive Comparison</h3>
                <div className="grid grid-cols-3 gap-4 text-sm border-b border-white/10 pb-2 mb-2">
                    <div className="font-semibold text-muted-foreground">Category</div>
                    <div className="font-semibold text-primary">{realityA.name}</div>
                    <div className="font-semibold text-secondary">{realityB.name}</div>
                </div>

                <div className="space-y-4">
                    {/* Time */}
                    <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-2">
                        <div className="text-muted-foreground">Weekly Hours</div>
                        <div>{realityA.metrics.weeklyHours} hrs</div>
                        <div>{realityB.metrics.weeklyHours} hrs</div>
                    </div>
                    {/* Salary */}
                    <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-2">
                        <div className="text-muted-foreground">Est. Salary</div>
                        <div>${(realityA.metrics.salaryRange[0] / 1000).toFixed(0)}k - ${(realityA.metrics.salaryRange[1] / 1000).toFixed(0)}k</div>
                        <div>${(realityB.metrics.salaryRange[0] / 1000).toFixed(0)}k - ${(realityB.metrics.salaryRange[1] / 1000).toFixed(0)}k</div>
                    </div>
                    {/* Learning Resources */}
                    <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-2">
                        <div className="text-muted-foreground">Resources</div>
                        <div className="text-xs">{(realityA.learningResources || []).join(', ') || 'N/A'}</div>
                        <div className="text-xs">{(realityB.learningResources || []).join(', ') || 'N/A'}</div>
                    </div>
                    {/* Interview Focus */}
                    <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-2">
                        <div className="text-muted-foreground">Interview Prep</div>
                        <div className="flex flex-wrap gap-1">
                            {realityA.attributes.interviewFocus.map(i => <Badge key={i} variant="outline" className="text-[10px]">{i}</Badge>)}
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {realityB.attributes.interviewFocus.map(i => <Badge key={i} variant="outline" className="text-[10px]">{i}</Badge>)}
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Glitches / Conflicts */}
            {glitches.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-bold text-destructive mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Unresolved Conflicts
                    </h3>
                    {glitches.map((glitch, i) => (
                        <div key={i} className={`p-3 rounded border text-sm flex gap-3 items-start ${glitch.severity === 'high' ? 'bg-destructive/10 border-destructive text-destructive-foreground' : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-200'
                            }`}>
                            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                            <div>
                                <strong className="block uppercase text-xs tracking-wider opacity-80">{glitch.type}</strong>
                                {glitch.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Merge Action */}
            <div className="mt-8 flex justify-center pb-8">
                <NeonButton
                    className="w-full max-w-md"
                    onClick={() => {
                        try {
                            const newName = `Merged: ${realityA.name.split(' ')[0]} + ${realityB.name.split(' ')[0]}`;
                            CareerManager.mergeRealities(realityA.id, realityB.id, newName);
                            toast.success("Realities merged successfully! Check your Reality Tree.");
                        } catch (e) {
                            toast.error("Failed to merge realities.");
                        }
                    }}
                >
                    <GitMerge className="w-4 h-4 mr-2" /> Merge Paths to Hybrid Reality
                </NeonButton>
            </div>
        </div>
    );
};

const CalendarIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);
