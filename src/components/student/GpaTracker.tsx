import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Input } from '@/components/ui/input';
import { Plus, TrendingUp, GraduationCap } from 'lucide-react';
import { useCareer } from '@/hooks/useCareer';
import { useToast } from '@/components/ui/use-toast';
import { CareerManager } from '@/services/CareerManager';

export const GpaTracker = () => {
    const { profile, refresh } = useCareer();
    const { toast } = useToast();
    const [isAdding, setIsAdding] = useState(false);
    const [term, setTerm] = useState('');
    const [gpa, setGpa] = useState('');

    const gpaHistory = profile?.gpaHistory || [];

    // Calculate Average GPA
    const averageGpa = gpaHistory.length > 0
        ? (gpaHistory.reduce((acc, curr) => acc + curr.gpa, 0) / gpaHistory.length).toFixed(2)
        : '0.00';

    const handleAddGpa = () => {
        if (!term || !gpa) return;

        const newRecord = { term, gpa: parseFloat(gpa) };

        // Optimistic update logic would go here, but we'll use manager + refresh
        // Note: We need to update the PROFILE, not a specific reality.
        // For now, CareerManager primarily updates Realities.
        // We might need to add a `updateProfile` method to CareerManager.

        // Temporary Hack: Update local object and save (since CareerManager.saveProfile exists)
        if (profile) {
            const updatedProfile = {
                ...profile,
                gpaHistory: [...gpaHistory, newRecord]
            };
            CareerManager.saveProfile(updatedProfile);
            refresh();
            toast({ title: "GPA Updated", description: `Added ${term}: ${gpa}` });
            setIsAdding(false);
            setTerm('');
            setGpa('');
        }
    };

    return (
        <GlassCard className="p-6" glow glowColor="primary">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-display text-xl font-bold">Academic Performance</h3>
                        <p className="text-sm text-muted-foreground">Cumulative GPA: <span className="text-primary font-bold">{averageGpa}</span></p>
                    </div>
                </div>
                <NeonButton variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-1" /> Add Term</>}
                </NeonButton>
            </div>

            {isAdding && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10 flex gap-2 items-end"
                >
                    <div className="flex-1 space-y-1">
                        <label className="text-xs text-muted-foreground">Term</label>
                        <Input
                            placeholder="e.g. Fall 2024"
                            className="bg-transparent"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-24 space-y-1">
                        <label className="text-xs text-muted-foreground">GPA</label>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="4.0"
                            className="bg-transparent"
                            value={gpa}
                            onChange={(e) => setGpa(e.target.value)}
                        />
                    </div>
                    <NeonButton size="sm" onClick={handleAddGpa}>Save</NeonButton>
                </motion.div>
            )}

            {/* Simple Visualizer */}
            <div className="space-y-4">
                {gpaHistory.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4 text-sm">
                        No academic records found. Add your first term!
                    </div>
                ) : (
                    gpaHistory.map((record, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="text-sm font-medium w-24 text-muted-foreground">{record.term}</div>
                            <div className="flex-1 h-2 bg-secondary/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(record.gpa / 4.0) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-secondary to-primary"
                                />
                            </div>
                            <div className="text-sm font-bold text-foreground w-12 text-right">{record.gpa}</div>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
};
