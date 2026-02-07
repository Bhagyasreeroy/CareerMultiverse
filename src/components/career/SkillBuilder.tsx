import { useState, useEffect } from 'react';
import { CareerManager } from '@/services/CareerManager';
import { RealityId, Skill, SkillCategory } from '@/types/career';
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";

interface SkillBuilderProps {
    realityId: RealityId;
    existingSkills?: Skill[];
}

export const SkillBuilder = ({ realityId, existingSkills }: SkillBuilderProps) => {
    const [skills, setSkills] = useState<Skill[]>(existingSkills || []);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [category, setCategory] = useState<SkillCategory>('technical');
    const [proficiency, setProficiency] = useState([50]);

    useEffect(() => {
        loadSkills();
    }, [realityId]);

    const loadSkills = () => {
        const profile = CareerManager.getProfile();
        const reality = profile.realities.find(r => r.id === realityId);
        if (reality) {
            setSkills(reality.skills || []);
        }
    };

    const resetForm = () => {
        setName('');
        setCategory('technical');
        setProficiency([50]);
        setIsAdding(false);
        setEditingId(null);
    };

    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Skill name is required");
            return;
        }

        const newSkill: Skill = {
            id: editingId || crypto.randomUUID(),
            name,
            category,
            proficiency: proficiency[0]
        };

        let updatedSkills;
        if (editingId) {
            updatedSkills = skills.map(s => s.id === editingId ? newSkill : s);
            toast.success("Skill updated");
        } else {
            updatedSkills = [...skills, newSkill];
            toast.success("Skill added");
        }

        CareerManager.updateReality(realityId, { skills: updatedSkills });
        setSkills(updatedSkills);
        resetForm();
    };

    const handleEdit = (skill: Skill) => {
        setName(skill.name);
        setCategory(skill.category);
        setProficiency([skill.proficiency]);
        setEditingId(skill.id);
        setIsAdding(true);
    };

    const handleDelete = (id: string) => {
        const updatedSkills = skills.filter(s => s.id !== id);
        CareerManager.updateReality(realityId, { skills: updatedSkills });
        setSkills(updatedSkills);
        toast.info("Skill deleted");
    };

    const getCategoryColor = (cat: SkillCategory) => {
        switch (cat) {
            case 'technical': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'soft': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'domain': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            case 'certification': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };

    return (
        <GlassCard className="p-6 h-full flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                        Skill Matrix
                    </h2>
                    <p className="text-sm text-muted-foreground">Manage your capabilities in this reality</p>
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} size="sm" className="gap-2">
                        <Plus className="w-4 h-4" /> Add Skill
                    </Button>
                )}
            </div>

            {isAdding && (
                <GlassCard className="p-4 mb-4 border-primary/20 bg-primary/5">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Skill Name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Python, Leadership..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Select value={category} onValueChange={(v) => setCategory(v as SkillCategory)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="soft">Soft Skill</SelectItem>
                                    <SelectItem value="domain">Domain Knowledge</SelectItem>
                                    <SelectItem value="certification">Certification</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex justify-between">
                                <Label>Proficiency</Label>
                                <span className="text-sm font-mono text-primary">{proficiency[0]}%</span>
                            </div>
                            <Slider
                                value={proficiency}
                                onValueChange={setProficiency}
                                max={100}
                                step={1}
                                className="py-2"
                            />
                        </div>

                        <div className="flex gap-2 justify-end mt-4">
                            <Button variant="ghost" size="sm" onClick={resetForm}>
                                Cancel
                            </Button>
                            <Button size="sm" onClick={handleSave} className="gap-2">
                                <Save className="w-4 h-4" /> {editingId ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </GlassCard>
            )}

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="space-y-3">
                    {skills.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No skills added yet. Start building your profile!
                        </div>
                    ) : (
                        skills.map(skill => (
                            <div
                                key={skill.id}
                                className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{skill.name}</span>
                                        <Badge variant="outline" className={`text-xs ${getCategoryColor(skill.category)}`}>
                                            {skill.category}
                                        </Badge>
                                    </div>
                                    <div className="w-full max-w-[200px] h-1.5 bg-secondary/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary/70 rounded-full"
                                            style={{ width: `${skill.proficiency}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-white"
                                        onClick={() => handleEdit(skill)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => handleDelete(skill.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        </GlassCard>
    );
};
