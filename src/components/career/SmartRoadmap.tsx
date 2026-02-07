import { useState } from 'react';
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/ui/NeonButton";
import { CareerReality, LearningResource } from '@/types/career';
import { BookOpen, Video, Code, FileText, CheckCircle2, Circle, RefreshCw, Clock } from "lucide-react";
import { CareerManager } from '@/services/CareerManager';
import { toast } from "sonner";
import { motion } from 'framer-motion';

interface SmartRoadmapProps {
    reality: CareerReality;
}

export const SmartRoadmap = ({ reality }: SmartRoadmapProps) => {
    const [generating, setGenerating] = useState(false);

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            await CareerManager.generateSmartRoadmap(reality.id);
            toast.success("AI has curated a new learning path!");
        } catch (e) {
            toast.error("Failed to generate roadmap");
        } finally {
            setGenerating(false);
        }
    };

    const toggleStatus = (resource: LearningResource) => {
        const newStatus = resource.status === 'completed' ? 'todo' : 'completed';
        const updatedRoadmap = reality.roadmap.map(r =>
            r.id === resource.id ? { ...r, status: newStatus } : r
        );
        CareerManager.updateReality(
            reality.id,
            { roadmap: updatedRoadmap as any[] },
            `Marked '${resource.title}' as ${newStatus}`
        );
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'course': return <Video className="w-4 h-4" />;
            case 'book': return <BookOpen className="w-4 h-4" />;
            case 'project': return <Code className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold font-display text-primary flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Smart Learning Path
                    </h3>
                    <p className="text-sm text-muted-foreground">AI-curated resources tailored to your skill gaps.</p>
                </div>
                <NeonButton size="sm" onClick={handleGenerate} disabled={generating}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
                    {generating ? 'Curating...' : 'Regenerate'}
                </NeonButton>
            </div>

            <div className="space-y-4">
                {(reality.roadmap || []).length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No roadmap active. Ask AI to generate one!</p>
                    </div>
                ) : (
                    (reality.roadmap || []).map((resource, i) => (
                        <GlassCard
                            key={resource.id}
                            className={`p-4 flex items-start gap-4 transition-all ${resource.status === 'completed' ? 'opacity-60' : ''}`}
                            glow={resource.status === 'in-progress'}
                        >
                            <button onClick={() => toggleStatus(resource)} className="mt-1 shrink-0">
                                {resource.status === 'completed' ? (
                                    <CheckCircle2 className="w-5 h-5 text-success" />
                                ) : (
                                    <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                                )}
                            </button>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className={`font-semibold ${resource.status === 'completed' ? 'line-through decoration-secondary' : ''}`}>
                                        {resource.title}
                                    </h4>
                                    <Badge variant="outline" className="capitalize text-[10px] flex items-center gap-1">
                                        {getIcon(resource.type)} {resource.type}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {resource.estimatedTime}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
};
