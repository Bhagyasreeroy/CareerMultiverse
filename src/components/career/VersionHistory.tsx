import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/ui/NeonButton";
import { CareerReality } from '@/types/career';
import { History, RotateCcw, ArrowLeft } from "lucide-react";
import { CareerManager } from '@/services/CareerManager';
import { toast } from "sonner";
import { formatDistanceToNow } from 'date-fns';

interface VersionHistoryProps {
    reality: CareerReality;
}

export const VersionHistory = ({ reality }: VersionHistoryProps) => {

    const handleRollback = (snapshotId: string) => {
        try {
            CareerManager.rollbackReality(reality.id, snapshotId);
            toast.success("Time travel successful! Reality rolled back.");
        } catch (e) {
            toast.error("Failed to rollback reality.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold font-display text-primary flex items-center gap-2">
                        <History className="w-5 h-5" /> Temporal Logs
                    </h3>
                    <p className="text-sm text-muted-foreground">Review timeline and restore past states.</p>
                </div>
            </div>

            <div className="relative pl-6 border-l border-white/10 space-y-6">
                {(reality.history || []).map((snapshot) => (
                    <div key={snapshot.id} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-secondary border border-secondary glow-secondary shadow-[0_0_10px_hsl(var(--secondary))]" />

                        <GlassCard className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-semibold text-foreground/90">{snapshot.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(snapshot.timestamp).toLocaleString()} ({formatDistanceToNow(new Date(snapshot.timestamp))} ago)
                                    </p>
                                </div>
                                <NeonButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRollback(snapshot.id)}
                                    className="text-xs hover:text-destructive hover:border-destructive"
                                >
                                    <RotateCcw className="w-3 h-3 mr-1" /> Restore
                                </NeonButton>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-[10px]">
                                    {snapshot.state.skills.length} Skills
                                </Badge>
                                <Badge variant="secondary" className="text-[10px]">
                                    {snapshot.state.milestones.length} Milestones
                                </Badge>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>
    );
};
