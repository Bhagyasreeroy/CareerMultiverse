import { useState, useRef } from 'react';
import { useCareer } from '@/hooks/useCareer';
import { CareerManager } from '@/services/CareerManager';
import { ResumeData, ResumeSection, ResumeItem } from '@/types/career';
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Printer, LayoutTemplate, Save, ChevronRight, GripVertical } from "lucide-react";
import { ResumePreview } from './ResumePreview';
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

export const ResumeBuilder = () => {
    const { activeReality } = useCareer();
    const [resumeData, setResumeData] = useState<ResumeData>(
        activeReality?.resumeData || {
            personalInfo: { fullName: '', email: '', phone: '', summary: '', location: '', links: [] },
            sections: []
        }
    );
    const [template, setTemplate] = useState<'professional' | 'modern'>('modern');
    const [previewOpen, setPreviewOpen] = useState(false);
    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Resume_${activeReality?.name || 'Career'}`,
    });

    const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addSection = (type: ResumeSection['type']) => {
        const newSection: ResumeSection = {
            id: crypto.randomUUID(),
            title: type === 'education' ? 'Education' : type === 'experience' ? 'Experience' : 'Custom Section',
            type,
            items: []
        };
        setResumeData(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
    };

    const addItem = (sectionId: string) => {
        const newItem: ResumeItem = {
            id: crypto.randomUUID(),
            title: 'New Role / Degree',
            subtitle: 'Organization',
            dateRange: '2024 - Present',
            description: '',
            location: ''
        };
        setResumeData(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
            )
        }));
    };

    const updateItem = (sectionId: string, itemId: string, field: keyof ResumeItem, value: string) => {
        setResumeData(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
                } : s
            )
        }));
    };

    const deleteItem = (sectionId: string, itemId: string) => {
        setResumeData(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.filter(item => item.id !== itemId)
                } : s
            )
        }));
    };

    const handleSave = () => {
        if (!activeReality) return;
        CareerManager.updateReality(activeReality.id, { resumeData });
        toast.success("Resume saved successfully!");
    };

    if (!activeReality) return <div>No active reality selected.</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
            {/* Editor Side */}
            <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Resume Editor</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setTemplate(t => t === 'modern' ? 'professional' : 'modern')}>
                            <LayoutTemplate className="w-4 h-4 mr-2" />
                            {template === 'modern' ? 'Modern' : 'Professional'}
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button className="lg:hidden" size="sm" onClick={() => setPreviewOpen(true)}>
                            Preview
                        </Button>
                    </div>
                </div>

                <GlassCard className="flex-1 overflow-hidden flex flex-col">
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-8">
                            {/* Personal Info */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4" /> Personal Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input value={resumeData.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input value={resumeData.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input value={resumeData.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input value={resumeData.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label>Professional Summary</Label>
                                        <Textarea rows={3} value={resumeData.personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} />
                                    </div>
                                </div>
                            </section>

                            {/* Dynamic Sections */}
                            {resumeData.sections.map(section => (
                                <section key={section.id} className="space-y-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <Input
                                            value={section.title}
                                            onChange={(e) => {
                                                const newTitle = e.target.value;
                                                setResumeData(prev => ({
                                                    ...prev,
                                                    sections: prev.sections.map(s => s.id === section.id ? { ...s, title: newTitle } : s)
                                                }));
                                            }}
                                            className="font-semibold text-lg bg-transparent border-none h-auto p-0 focus-visible:ring-0 w-[200px]"
                                        />
                                        <Button variant="ghost" size="sm" onClick={() => addItem(section.id)}>
                                            <Plus className="w-4 h-4 mr-2" /> Add Item
                                        </Button>
                                    </div>

                                    <div className="space-y-4 pl-4 border-l-2 border-white/5">
                                        {section.items.map((item, idx) => (
                                            <div key={item.id} className="space-y-3 p-4 bg-muted/20 rounded-lg relative group">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 hover:text-destructive"
                                                    onClick={() => deleteItem(section.id, item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <Input placeholder="Role / Degree" value={item.title} onChange={e => updateItem(section.id, item.id, 'title', e.target.value)} />
                                                    <Input placeholder="Date Range" value={item.dateRange} onChange={e => updateItem(section.id, item.id, 'dateRange', e.target.value)} />
                                                    <Input placeholder="Company / University" value={item.subtitle} onChange={e => updateItem(section.id, item.id, 'subtitle', e.target.value)} />
                                                    <Input placeholder="Location" value={item.location} onChange={e => updateItem(section.id, item.id, 'location', e.target.value)} />
                                                </div>
                                                <Textarea
                                                    placeholder="Description (Support bullet points)"
                                                    value={item.description}
                                                    onChange={e => updateItem(section.id, item.id, 'description', e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            </div>
                                        ))}
                                        {section.items.length === 0 && (
                                            <div className="text-center py-4 text-muted-foreground text-sm italic">
                                                No items added yet.
                                            </div>
                                        )}
                                    </div>
                                </section>
                            ))}

                            <div className="flex gap-2 justify-center pt-8">
                                <Button variant="secondary" onClick={() => addSection('experience')}>+ Experience</Button>
                                <Button variant="secondary" onClick={() => addSection('education')}>+ Education</Button>
                                <Button variant="secondary" onClick={() => addSection('project')}>+ Project</Button>
                            </div>
                        </div>
                    </ScrollArea>
                </GlassCard>
            </div>

            {/* Preview Side (Desktop) */}
            <div className="hidden lg:flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-muted-foreground">Live Preview</h2>
                    <Button onClick={() => handlePrint && handlePrint()} variant="default" className="bg-white text-black hover:bg-white/90">
                        <Printer className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                </div>
                <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-zinc-900/50 p-4 shadow-2xl">
                    <div className="transform origin-top scale-90">
                        {/* Wrapper for print ref */}
                        <div ref={printRef}>
                            <ResumePreview
                                data={resumeData}
                                skills={activeReality.skills}
                                template={template}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal (Mobile) */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl h-[90vh] overflow-auto">
                    <div className="flex justify-end mb-4">
                        <Button onClick={() => handlePrint && handlePrint()}>
                            <Printer className="w-4 h-4 mr-2" /> Print
                        </Button>
                    </div>
                    <div ref={printRef}>
                        <ResumePreview
                            data={resumeData}
                            skills={activeReality.skills}
                            template={template}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
