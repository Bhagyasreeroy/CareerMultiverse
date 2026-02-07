import { ResumeData, ResumeSection, ResumeItem } from '@/types/career';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, GripVertical, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ResumeEditorProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export const ResumeEditor = ({ data, onChange }: ResumeEditorProps) => {

    const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, [field]: value }
        });
    };

    const addResumeItem = (sectionId: string) => {
        const newSections = data.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    items: [
                        ...section.items,
                        {
                            id: Math.random().toString(36).substr(2, 9),
                            title: '',
                            subtitle: '',
                            dateRange: '',
                            description: ''
                        }
                    ]
                };
            }
            return section;
        });
        onChange({ ...data, sections: newSections });
    };

    const updateResumeItem = (sectionId: string, itemId: string, field: keyof ResumeItem, value: string) => {
        const newSections = data.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    items: section.items.map(item =>
                        item.id === itemId ? { ...item, [field]: value } : item
                    )
                };
            }
            return section;
        });
        onChange({ ...data, sections: newSections });
    };

    const removeResumeItem = (sectionId: string, itemId: string) => {
        const newSections = data.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    items: section.items.filter(item => item.id !== itemId)
                };
            }
            return section;
        });
        onChange({ ...data, sections: newSections });
    };

    // Helper to get labels based on section type
    const getLabels = (type: ResumeSection['type']) => {
        switch (type) {
            case 'education': return { title: 'Degree', subtitle: 'University/School' };
            case 'project': return { title: 'Project Name', subtitle: 'Role/Tech Stack' };
            default: return { title: 'Job Title', subtitle: 'Company' };
        }
    };

    return (
        <div className="flex flex-col h-full bg-background border-r">
            <div className="p-4 border-b">
                <h2 className="font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Editor
                </h2>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {/* Personal Info */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Personal Details</h3>
                        <div className="grid gap-3">
                            <div>
                                <Label>Full Name</Label>
                                <Input
                                    value={data.personalInfo.fullName}
                                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Professional Summary</Label>
                                <Textarea
                                    value={data.personalInfo.summary}
                                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                                    className="h-24"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        value={data.personalInfo.email}
                                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        value={data.personalInfo.phone}
                                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sections */}
                    <Accordion type="multiple" defaultValue={['edu', 'exp']} className="w-full">
                        {data.sections.map((section) => {
                            const labels = getLabels(section.type);
                            return (
                                <AccordionItem key={section.id} value={section.id}>
                                    <AccordionTrigger className="hover:no-underline">
                                        <span className="font-semibold text-lg">{section.title}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                        <div className="space-y-4">
                                            {section.items.map((item) => (
                                                <div key={item.id} className="p-3 border rounded-lg bg-card/50 space-y-3 relative group">
                                                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => removeResumeItem(section.id, item.id)}>
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Input
                                                            placeholder={labels.title}
                                                            value={item.title}
                                                            onChange={(e) => updateResumeItem(section.id, item.id, 'title', e.target.value)}
                                                            className="font-medium"
                                                        />
                                                        <Input
                                                            placeholder={labels.subtitle}
                                                            value={item.subtitle}
                                                            onChange={(e) => updateResumeItem(section.id, item.id, 'subtitle', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Input
                                                            placeholder="Date Range (e.g. 2020 - Present)"
                                                            value={item.dateRange}
                                                            onChange={(e) => updateResumeItem(section.id, item.id, 'dateRange', e.target.value)}
                                                        />
                                                        <Input
                                                            placeholder="Location (Optional)"
                                                            value={item.location || ''}
                                                            onChange={(e) => updateResumeItem(section.id, item.id, 'location', e.target.value)}
                                                        />
                                                    </div>
                                                    <Textarea
                                                        placeholder="Description / Bullet Points"
                                                        value={item.description}
                                                        onChange={(e) => updateResumeItem(section.id, item.id, 'description', e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => addResumeItem(section.id)}>
                                                <Plus className="w-4 h-4 mr-2" /> Add {section.title.slice(0, -1)}
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </ScrollArea>
        </div>
    );
};
