import { Button } from "@/components/ui/button";
import { CareerManager } from "@/services/CareerManager";
import { useCareer } from "@/hooks/useCareer";
import { Sparkles, Database, Code, Briefcase } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CareerReality, Skill } from "@/types/career";

export const RealitySimulator = () => {
    const { activeReality, refresh } = useCareer();
    const { toast } = useToast();

    if (!activeReality) return null;

    const applyScenario = (type: 'SDE' | 'DS' | 'PM') => {
        const scenarios: Record<string, Partial<CareerReality>> = {
            SDE: {
                targetRoles: ["Full Stack Developer", "Backend Engineer"],
                skills: [
                    { id: crypto.randomUUID(), name: "React", category: "technical", proficiency: 85 },
                    { id: crypto.randomUUID(), name: "Node.js", category: "technical", proficiency: 80 },
                    { id: crypto.randomUUID(), name: "System Design", category: "technical", proficiency: 60 }
                ] as Skill[],
                metrics: {
                    weeklyHours: 45,
                    projectedMonths: 6,
                    employabilityScore: 92,
                    salaryRange: [120000, 160000]
                },
                attributes: {
                    learningStyle: 'Practical',
                    interviewFocus: ['DSA', 'System Design'],
                    companyType: ['Product', 'Startup']
                }
            },
            DS: {
                targetRoles: ["Data Scientist", "ML Engineer"],
                skills: [
                    { id: crypto.randomUUID(), name: "Python", category: "technical", proficiency: 90 },
                    { id: crypto.randomUUID(), name: "TensorFlow", category: "technical", proficiency: 75 },
                    { id: crypto.randomUUID(), name: "Statistics", category: "technical", proficiency: 85 }
                ] as Skill[],
                metrics: {
                    weeklyHours: 55, // Intentionally high for conflict
                    projectedMonths: 12,
                    employabilityScore: 88,
                    salaryRange: [130000, 180000]
                },
                attributes: {
                    learningStyle: 'Theory',
                    interviewFocus: ['DSA', 'Take-home', 'Portfolio'], // Conflict with SDE
                    companyType: ['Research', 'Product']
                }
            },
            PM: {
                targetRoles: ["Product Manager", "Product Owner"],
                skills: [
                    { id: crypto.randomUUID(), name: "User Research", category: "domain", proficiency: 80 },
                    { id: crypto.randomUUID(), name: "Agile", category: "domain", proficiency: 90 },
                    { id: crypto.randomUUID(), name: "Wireframing", category: "technical", proficiency: 70 }
                ] as Skill[],
                metrics: {
                    weeklyHours: 40,
                    projectedMonths: 8,
                    employabilityScore: 85,
                    salaryRange: [110000, 150000]
                },
                attributes: {
                    learningStyle: 'Mixed',
                    interviewFocus: ['Behavioral', 'Portfolio'],
                    companyType: ['Product', 'Startup', 'Service']
                }
            }
        };

        const scenario = scenarios[type];

        CareerManager.updateReality(activeReality.id, scenario);
        refresh();

        toast({
            title: "Reality Simulated!",
            description: `Injected ${type} scenario data into ${activeReality.name}.`,
        });
    };

    return (
        <div className="p-4 border rounded-xl bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-yellow-400" /> Reality Simulator
            </h3>
            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs border-indigo-500/30 hover:bg-indigo-500/10" onClick={() => applyScenario('SDE')}>
                    <Code className="w-3 h-3 mr-1" /> Inject SDE Data
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-emerald-500/30 hover:bg-emerald-500/10" onClick={() => applyScenario('DS')}>
                    <Database className="w-3 h-3 mr-1" /> Inject DS Data
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-orange-500/30 hover:bg-orange-500/10" onClick={() => applyScenario('PM')}>
                    <Briefcase className="w-3 h-3 mr-1" /> Inject PM Data
                </Button>
            </div>
        </div>
    );
};
