import { motion } from "framer-motion";
import { useCareer } from '@/hooks/useCareer';
import { GlassCard } from "@/components/ui/GlassCard";
import { GitFork, Play, Clock, ArrowRightLeft, Trash2, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RealityComparator } from "./RealityComparator";
import { CareerManager } from "@/services/CareerManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const RealityTree = () => {
    const { profile, activeReality, forkReality, switchReality } = useCareer();
    const [isForkDialogOpen, setIsForkDialogOpen] = useState(false);
    const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // State for Forking
    const [newForkName, setNewForkName] = useState("");
    const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);

    // State for Comparing
    const [comparingId, setComparingId] = useState<string | null>(null);

    const openForkDialog = (id: string) => {
        setSelectedSourceId(id);
        setIsForkDialogOpen(true);
    };

    const openCompareDialog = (id: string) => {
        setComparingId(id);
        setIsCompareDialogOpen(true);
    };

    const confirmFork = () => {
        if (selectedSourceId && newForkName) {
            forkReality(selectedSourceId, newForkName);
            setNewForkName("");
            setIsForkDialogOpen(false);
            toast.success("Reality forked successfully!");
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this reality? This action cannot be undone.")) {
            try {
                CareerManager.deleteReality(id);
                toast.success("Reality deleted.");
                // trigger re-render or state update implicitly via useCareer if it subscribes, 
                // but since useCareer might not auto-update on static calls, we might need to force reload or rely on hook update.
                // Assuming useCareer uses a listener or we force window reload for now if needed, 
                // but better: modify useCareer to listen to storage events or expose delete method.
                // For now, let's assume global state sync or simple reload.
                window.location.reload();
            } catch (e: any) {
                toast.error(e.message);
            }
        }
    };

    const handleAddTemplate = (templateId: string) => {
        try {
            CareerManager.addTemplate(templateId);
            setIsAddDialogOpen(false);
            toast.success("New career path added!");
            window.location.reload();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center items-center gap-4 mb-8">
                    <h2 className="text-3xl font-display font-bold text-foreground">
                        Reality <span className="text-primary">Branches</span>
                    </h2>
                    <Button onClick={() => setIsAddDialogOpen(true)} variant="outline" className="gap-2">
                        <Plus className="w-4 h-4" /> Add Reality
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile.realities.map((reality) => (
                        <motion.div
                            key={reality.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="relative"
                        >
                            <GlassCard
                                className={`p-6 h-full flex flex-col justify-between ${activeReality?.id === reality.id ? 'border-primary/50 bg-primary/5' : ''}`}
                                glow={activeReality?.id === reality.id}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{reality.name}</h3>
                                        <div className="flex gap-2">
                                            {activeReality?.id === reality.id && (
                                                <span className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground flex items-center gap-1">
                                                    <Play className="w-3 h-3" /> Active
                                                </span>
                                            )}
                                            {profile.realities.length > 1 && activeReality?.id !== reality.id && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDelete(reality.id)}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4">
                                        {reality.description || "A diverging path..."}
                                    </p>

                                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>Created: {new Date(reality.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <GitFork className="w-4 h-4" />
                                            <span>Parent: {profile.realities.find(r => r.id === reality.parentId)?.name || 'Origin'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    {activeReality?.id !== reality.id ? (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => switchReality(reality.id)}
                                            >
                                                Switch To
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openCompareDialog(reality.id)}
                                            >
                                                <ArrowRightLeft className="w-4 h-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex-1"></div>
                                    )}

                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="flex-1"
                                        onClick={() => openForkDialog(reality.id)}
                                    >
                                        <GitFork className="w-4 h-4 mr-2" /> Fork
                                    </Button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Add Reality Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Add New Reality</DialogTitle>
                            <DialogDescription>
                                Start a fresh career path or fork an existing one.
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="template">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="template">Use Template</TabsTrigger>
                                <TabsTrigger value="custom">Custom Fork</TabsTrigger>
                            </TabsList>
                            <TabsContent value="template" className="space-y-4 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {CareerManager.getTemplates().map(t => (
                                        <GlassCard key={t.id} className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => handleAddTemplate(t.id)}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-primary">{t.name}</h4>
                                                <Sparkles className="w-4 h-4 text-accent" />
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-3">{t.description}</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {t.skills.slice(0, 3).map(s => (
                                                    <span key={s.name} className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] rounded">
                                                        {s.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="custom">
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">Select an existing reality to fork from the main view.</p>
                                    <Button onClick={() => setIsAddDialogOpen(false)}>Close</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>

                {/* Shared Dialogs to avoid nesting issues */}
                <Dialog open={isForkDialogOpen} onOpenChange={setIsForkDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Fork Reality</DialogTitle>
                            <DialogDescription>
                                Create a new timeline based on this path.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">New Reality Name</Label>
                                <Input
                                    id="name"
                                    value={newForkName}
                                    onChange={(e) => setNewForkName(e.target.value)}
                                    placeholder="e.g. Startup Path"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={confirmFork}>Create Fork</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isCompareDialogOpen} onOpenChange={setIsCompareDialogOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto w-full">
                        <DialogHeader>
                            <DialogTitle>Multiverse Comparison</DialogTitle>
                            <DialogDescription>
                                Analyzing divergence between timelines.
                            </DialogDescription>
                        </DialogHeader>
                        {activeReality && comparingId && (
                            <RealityComparator realityIdA={activeReality.id} realityIdB={comparingId} />
                        )}
                    </DialogContent>
                </Dialog>

            </div>
        </section>
    );
};
