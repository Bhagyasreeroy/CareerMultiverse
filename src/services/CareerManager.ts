import { StudentProfile, CareerReality, RealityId, Milestone, Skill, ResultMetrics, RealityAttributes } from '@/types/career';

// Mock initial state for demonstration
const INITIAL_PROFILE: StudentProfile = {
    id: 'student-1',
    name: 'Alex Explorer',
    email: 'alex@example.com',
    year: 'Junior',
    gpaHistory: [
        { term: 'Fall 2023', gpa: 3.6 },
        { term: 'Spring 2024', gpa: 3.8 }
    ],
    activeRealityId: 'root',
    realities: [
        {
            id: 'root',
            parentId: null,
            name: 'General Explorer',
            description: 'The starting point of your journey',
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString(),
            targetRoles: ['Software Engineer'],
            learningResources: ['MDN Web Docs', 'CS50'],
            roadmap: [],
            history: [],
            skills: [
                { id: '1', name: 'Communication', category: 'soft', proficiency: 60 },
                { id: '2', name: 'Java', category: 'technical', proficiency: 40 }
            ],
            milestones: [
                {
                    id: 'm1',
                    title: 'Complete CS Degree',
                    description: 'Bachelor of Technology in Computer Science',
                    type: 'education',
                    status: 'in-progress',
                    skillsGained: [],
                    requirements: []
                }
            ],
            resumeData: {
                personalInfo: {
                    fullName: 'Alex Explorer',
                    email: 'alex@example.com',
                    phone: '+1 234 567 890',
                    location: 'San Francisco, CA',
                    summary: 'Aspiring technology professional with a passion for building scalable systems.',
                    links: [{ label: 'LinkedIn', url: 'https://linkedin.com' }]
                },
                sections: [
                    {
                        id: 'edu',
                        title: 'Education',
                        type: 'education',
                        items: [
                            {
                                id: 'e1',
                                title: 'B.Tech Computer Science',
                                subtitle: 'Christ University',
                                dateRange: '2023 - 2027',
                                description: 'Focus on Data Structures, Algorithms, and Web Development.',
                                location: 'Bangalore'
                            }
                        ]
                    },
                    {
                        id: 'exp',
                        title: 'Experience',
                        type: 'experience',
                        items: []
                    }
                ]
            },
            metrics: {
                weeklyHours: 15,
                projectedMonths: 12,
                employabilityScore: 65,
                salaryRange: [80000, 100000]
            },
            attributes: {
                learningStyle: 'Mixed',
                interviewFocus: ['DSA', 'Behavioral'],
                companyType: ['Product', 'Startup']
            }
        }
    ]
};

export class CareerManager {
    private static STORAGE_KEY = 'career_multiverse_data';

    static getProfile(): StudentProfile {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) {
            this.saveProfile(INITIAL_PROFILE);
            return INITIAL_PROFILE;
        }
        return JSON.parse(data);
    }

    static saveProfile(profile: StudentProfile): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
        window.dispatchEvent(new Event('career-profile-updated'));
    }

    static getActiveReality(): CareerReality | undefined {
        const profile = this.getProfile();
        return profile.realities.find(r => r.id === profile.activeRealityId);
    }

    /**
     * Forks a reality to create a new parallel timeline.
     */
    static forkReality(sourceRealityId: RealityId, newName: string): CareerReality {
        const profile = this.getProfile();
        const sourceReality = profile.realities.find(r => r.id === sourceRealityId);

        if (!sourceReality) {
            throw new Error(`Reality with ID ${sourceRealityId} not found`);
        }

        const newReality: CareerReality = {
            ...JSON.parse(JSON.stringify(sourceReality)), // Deep copy
            id: crypto.randomUUID(),
            parentId: sourceRealityId,
            name: newName,
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString()
        };

        profile.realities.push(newReality);
        profile.activeRealityId = newReality.id; // Switch to new fork automatically? Let's say yes for now.
        this.saveProfile(profile);

        return newReality;
    }

    /**
     * Switches the active timeline.
     */
    static switchReality(realityId: RealityId): void {
        const profile = this.getProfile();
        if (!profile.realities.find(r => r.id === realityId)) {
            throw new Error('Reality not found');
        }
        profile.activeRealityId = realityId;
        this.saveProfile(profile);
    }

    /**
     * Updates a reality (e.g. adding a milestone/skill).
     */
    /**
     * Updates a reality (e.g. adding a milestone/skill).
     * Automatically saves a snapshot to history before updating.
     */
    static updateReality(realityId: RealityId, updates: Partial<CareerReality>, description: string = 'Updated reality'): void {
        const profile = this.getProfile();
        const index = profile.realities.findIndex(r => r.id === realityId);
        if (index === -1) throw new Error('Reality not found');

        const currentReality = profile.realities[index];

        // Create Snapshot
        const snapshot: any = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            description: description,
            state: JSON.parse(JSON.stringify(currentReality)) // Deep copy
        };

        // Update with history
        const newHistory = [snapshot, ...(currentReality.history || [])].slice(0, 50); // Keep last 50

        profile.realities[index] = {
            ...currentReality,
            ...updates,
            history: newHistory,
            lastModifiedAt: new Date().toISOString()
        };
        this.saveProfile(profile);
    }

    static rollbackReality(realityId: RealityId, snapshotId: string): void {
        const profile = this.getProfile();
        const index = profile.realities.findIndex(r => r.id === realityId);
        if (index === -1) throw new Error('Reality not found');

        const currentReality = profile.realities[index];
        const snapshot = currentReality.history.find(s => s.id === snapshotId);

        if (!snapshot) throw new Error('Snapshot not found');

        // We revert to the snapshot state, BUT we want to keep the history that happened *after* that snapshot?
        // Or do we just restore the state completely?
        // The user request says "Compare, rollback, or duplicate". Standard rollback usually forks or overwrites.
        // Let's overwrite but ADD a new "Rolled back" snapshot so we don't lose the "future" (which becomes past).

        const rollbackSnapshot: any = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            description: `Rolled back to ${new Date(snapshot.timestamp).toLocaleTimeString()}`,
            state: JSON.parse(JSON.stringify(currentReality))
        };

        const newHistory = [rollbackSnapshot, ...currentReality.history];

        profile.realities[index] = {
            ...snapshot.state,
            history: newHistory, // Preserve history chain
            lastModifiedAt: new Date().toISOString()
        };

        this.saveProfile(profile);
    }

    static async generateSmartRoadmap(realityId: RealityId): Promise<void> {
        const profile = this.getProfile();
        const index = profile.realities.findIndex(r => r.id === realityId);
        if (index === -1) return;

        const reality = profile.realities[index];

        // MOCK AI GENERATION
        // In real app, this would call an LLM with reality.targetRoles and reality.skills

        const newRoadmap: any[] = [
            {
                id: crypto.randomUUID(),
                title: `Complete Guide to ${reality.targetRoles[0] || 'Modern Engineering'}`,
                type: 'course',
                status: 'todo',
                estimatedTime: '40 hours',
                skillsTargeted: reality.targetRoles
            },
            {
                id: crypto.randomUUID(),
                title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
                type: 'book',
                status: 'todo',
                estimatedTime: '3 weeks',
                skillsTargeted: ['Software Engineering']
            },
            {
                id: crypto.randomUUID(),
                title: 'Build a Full Stack App with Next.js',
                type: 'project',
                status: 'in-progress',
                estimatedTime: '20 hours',
                skillsTargeted: ['React', 'Node.js']
            }
        ];

        this.updateReality(realityId, { roadmap: newRoadmap }, 'AI Generated Smart Roadmap');
    }

    /**
     * Compares two realities to find differences.
     */
    static compareRealities(idA: RealityId, idB: RealityId) {
        const profile = this.getProfile();
        const realityA = profile.realities.find(r => r.id === idA);
        const realityB = profile.realities.find(r => r.id === idB);

        if (!realityA || !realityB) throw new Error('One or both realities not found');

        // Simple diff logic
        const uniqueToA = {
            skills: realityA.skills.filter(sa => !realityB.skills.some(sb => sb.name === sa.name)),
            milestones: realityA.milestones.filter(ma => !realityB.milestones.some(mb => mb.id === ma.id)) // Naive ID check
        };

        const uniqueToB = {
            skills: realityB.skills.filter(sb => !realityA.skills.some(sa => sa.name === sb.name)),
            milestones: realityB.milestones.filter(mb => !realityA.milestones.some(ma => ma.id === mb.id))
        };

        const sharedSkills = realityA.skills
            .filter(sa => realityB.skills.some(sb => sb.name === sa.name))
            .map(sa => {
                const sb = realityB.skills.find(s => s.name === sa.name)!;
                return {
                    name: sa.name,
                    realityA: sa.proficiency,
                    realityB: sb.proficiency,
                    diff: sa.proficiency - sb.proficiency
                };
            });

        const glitches = this.detectGlitches(realityA, realityB);

        return { realityA, realityB, uniqueToA, uniqueToB, sharedSkills, glitches };
    }

    static detectGlitches(realityA: CareerReality, realityB: CareerReality) {
        const glitches: { type: string, message: string, severity: 'high' | 'medium' | 'low' }[] = [];

        const metricsA = realityA.metrics || { weeklyHours: 0 };
        const metricsB = realityB.metrics || { weeklyHours: 0 };
        const attrA = realityA.attributes || { interviewFocus: [], companyType: [] };
        const attrB = realityB.attributes || { interviewFocus: [], companyType: [] };

        // 1. Time Conflict
        // If sum of hours > 60 (assuming 60 is max burnout limit)
        // Or if both are demanding (>20 each)
        if (metricsA.weeklyHours + metricsB.weeklyHours > 60) {
            glitches.push({
                type: 'Time Paradox',
                message: `Combined time commitment (${metricsA.weeklyHours + metricsB.weeklyHours} hrs/week) exceeds physical limits. High burnout risk.`,
                severity: 'high'
            });
        }

        // 2. Interview Focus Conflict
        // e.g. Deep DSA vs heavy Portfolio/Design focus
        const aFocus = attrA.interviewFocus || [];
        const bFocus = attrB.interviewFocus || [];

        if (aFocus.includes('DSA') && bFocus.includes('Portfolio')) {
            glitches.push({
                type: 'Cognitive Dissonance',
                message: `Conflicting prep styles: '${realityA.name}' requires DSA grinding, while '${realityB.name}' needs creative Portfolio work. Hard to switch context.`,
                severity: 'medium'
            });
        }

        // 3. Goal Conflict
        // e.g. Research vs Startup
        const aType = attrA.companyType || [];
        const bType = attrB.companyType || [];

        if (aType.includes('Research') && bType.includes('Startup')) {
            glitches.push({
                type: 'Goal misalignment',
                message: `Target mismatch: Research roles require publications, while Startups value shipping speed.`,
                severity: 'medium'
            });
        }

        // 4. Missing Prerequisites (Checking inside each reality for internal consistency + cross consistency if we were merging, but here we compare A vs B)
        // Let's check if Reality A has milestones that require skills NOT in Reality A (Internal Consistency Check)
        [realityA, realityB].forEach(reality => {
            reality.milestones.forEach(milestone => {
                milestone.requirements.forEach(reqSkill => {
                    const existingSkill = reality.skills.find(s => s.name === reqSkill.name);
                    if (!existingSkill || existingSkill.proficiency < (reqSkill.proficiency || 0)) {
                        glitches.push({
                            type: 'Missing Prerequisite',
                            message: `In '${reality.name}', milestone '${milestone.title}' requires ${reqSkill.name} (> ${reqSkill.proficiency}%), but you have ${existingSkill ? existingSkill.proficiency + '%' : 'none'}.`,
                            severity: 'high'
                        });
                    }
                });
            });
        });

        return glitches;
    }

    /**
     * Merges two realities into a new hybrid reality.
     */
    static mergeRealities(idA: RealityId, idB: RealityId, newName: string): CareerReality {
        const profile = this.getProfile();
        const realityA = profile.realities.find(r => r.id === idA);
        const realityB = profile.realities.find(r => r.id === idB);

        if (!realityA || !realityB) throw new Error('One or both realities not found');

        // Merge Skills: Union by name, taking the max proficiency
        const mergedSkillsMap = new Map<string, Skill>();
        [...realityA.skills, ...realityB.skills].forEach(skill => {
            if (!mergedSkillsMap.has(skill.name) || (mergedSkillsMap.get(skill.name)!.proficiency < skill.proficiency)) {
                mergedSkillsMap.set(skill.name, skill);
            }
        });
        const mergedSkills = Array.from(mergedSkillsMap.values());

        // Merge Milestones: Union by ID (assuming IDs are somewhat unique or manual de-dupe)
        // If titles match, we consider them same? No, let's just concat and maybe user dedupes later.
        // Or better, unique by ID.
        const mergedMilestonesMap = new Map<string, Milestone>();
        [...realityA.milestones, ...realityB.milestones].forEach(m => mergedMilestonesMap.set(m.id, m));
        const mergedMilestones = Array.from(mergedMilestonesMap.values());

        // Merge Metrics: Average or Sum?
        // Hours: Sum (since you do both)
        // Salary: Average? Or Max potential? Let's Average.
        const mergedMetrics: ResultMetrics = {
            weeklyHours: (realityA.metrics.weeklyHours + realityB.metrics.weeklyHours),
            projectedMonths: Math.max(realityA.metrics.projectedMonths, realityB.metrics.projectedMonths),
            employabilityScore: Math.round((realityA.metrics.employabilityScore + realityB.metrics.employabilityScore) / 2),
            salaryRange: [
                Math.round((realityA.metrics.salaryRange[0] + realityB.metrics.salaryRange[0]) / 2),
                Math.round((realityA.metrics.salaryRange[1] + realityB.metrics.salaryRange[1]) / 2)
            ]
        };

        // Merge Attributes: unique arrays
        const mergeArrays = (a: any[], b: any[]) => Array.from(new Set([...a, ...b]));

        const mergedAttributes: RealityAttributes = {
            learningStyle: 'Mixed', // Default to mixed on merge
            interviewFocus: mergeArrays(realityA.attributes.interviewFocus, realityB.attributes.interviewFocus),
            companyType: mergeArrays(realityA.attributes.companyType, realityB.attributes.companyType)
        };

        const newReality: CareerReality = {
            id: crypto.randomUUID(),
            parentId: realityA.id, // Primary parent
            name: newName,
            description: `Merged from ${realityA.name} and ${realityB.name}`,
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString(),
            targetRoles: mergeArrays(realityA.targetRoles, realityB.targetRoles),
            learningResources: mergeArrays(realityA.learningResources || [], realityB.learningResources || []),
            roadmap: [],
            history: [],
            skills: mergedSkills,
            milestones: mergedMilestones,
            metrics: mergedMetrics,
            attributes: mergedAttributes,
            resumeData: realityA.resumeData // Default to A's resume for now
        };

        profile.realities.push(newReality);
        this.saveProfile(profile);
        return newReality;
    }
    static deleteReality(realityId: RealityId): void {
        const profile = this.getProfile();
        if (profile.realities.length <= 1) throw new Error("Cannot delete the only reality.");
        if (profile.activeRealityId === realityId) throw new Error("Cannot delete active reality. Switch to another first.");

        profile.realities = profile.realities.filter(r => r.id !== realityId);

        // Also clean up any children pointing to this parent? 
        // For now, simpler to just set their parentId to null or keep as is (orphan).
        // Let's set parentId to null for any orphans
        profile.realities.forEach(r => {
            if (r.parentId === realityId) r.parentId = null;
        });

        this.saveProfile(profile);
    }

    static getTemplates() {
        return [
            {
                id: 'fullstack',
                name: 'Full Stack Developer',
                description: 'Master frontend and backend technologies to build complete web applications.',
                role: 'Full Stack Developer',
                skills: [
                    { name: 'JavaScript', category: 'technical', proficiency: 60 },
                    { name: 'React', category: 'technical', proficiency: 50 },
                    { name: 'Node.js', category: 'technical', proficiency: 40 },
                    { name: 'SQL', category: 'technical', proficiency: 30 }
                ]
            },
            {
                id: 'datascience',
                name: 'Data Scientist',
                description: 'Analyze complex data to drive business decisions using ML and statistics.',
                role: 'Data Scientist',
                skills: [
                    { name: 'Python', category: 'technical', proficiency: 60 },
                    { name: 'Statistics', category: 'technical', proficiency: 50 },
                    { name: 'Machine Learning', category: 'technical', proficiency: 30 },
                    { name: 'SQL', category: 'technical', proficiency: 40 }
                ]
            },
            {
                id: 'productmanager',
                name: 'Product Manager',
                description: 'Lead product vision, strategy, and execution.',
                role: 'Product Manager',
                skills: [
                    { name: 'Communication', category: 'soft', proficiency: 70 },
                    { name: 'User Research', category: 'domain', proficiency: 50 },
                    { name: 'Agile', category: 'domain', proficiency: 60 },
                    { name: 'Analytics', category: 'technical', proficiency: 30 }
                ]
            }
        ];
    }

    static addTemplate(templateId: string): void {
        const template = this.getTemplates().find(t => t.id === templateId);
        if (!template) throw new Error("Template not found");

        const profile = this.getProfile();

        const newReality: CareerReality = {
            id: crypto.randomUUID(),
            parentId: null,
            name: template.name,
            description: template.description,
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString(),
            targetRoles: [template.role],
            learningResources: [], // Legacy
            roadmap: [],
            history: [],
            skills: template.skills.map((s, i) => ({ ...s, id: `skill-${i}-${Date.now()}` } as Skill)), // unique Ids
            milestones: [],
            metrics: {
                weeklyHours: 0,
                projectedMonths: 0,
                employabilityScore: 0,
                salaryRange: [0, 0]
            },
            attributes: {
                learningStyle: 'Mixed',
                interviewFocus: [],
                companyType: []
            },
            resumeData: {
                personalInfo: {
                    fullName: profile.name,
                    email: profile.email,
                    phone: "",
                    location: "",
                    summary: `Aspiring ${template.role}`,
                    links: []
                },
                sections: []
            }
        };

        profile.realities.push(newReality);
        this.saveProfile(profile);
    }
}
