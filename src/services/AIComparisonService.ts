import { CareerReality, RealityId } from '@/types/career';

export interface AIAnalysisResult {
    compatibilityScore: number;
    summary: string;
    recommendation: string;
    keyDifferentiator: string;
    isLoading?: boolean;
}

export class AIComparisonService {
    /**
     * Simulates an AI analysis of two career realities.
     * In a real app, this would call an LLM API.
     */
    static async analyzeComparison(realityA: CareerReality, realityB: CareerReality): Promise<AIAnalysisResult> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // safer access to metrics/attributes
        const metricsA = realityA.metrics || { weeklyHours: 0 };
        const metricsB = realityB.metrics || { weeklyHours: 0 };
        const attrA = realityA.attributes || { interviewFocus: [], companyType: [] };
        const attrB = realityB.attributes || { interviewFocus: [], companyType: [] };

        // 1. Skill Analysis
        const skillsA = new Set(realityA.skills.map(s => s.name));
        const skillsB = new Set(realityB.skills.map(s => s.name));

        let sharedSkills = 0;
        skillsA.forEach(s => { if (skillsB.has(s)) sharedSkills++; });

        const totalUniqueSkills = (skillsA.size + skillsB.size) - (sharedSkills * 2);
        const jaccardIndex = sharedSkills / (skillsA.size + skillsB.size - sharedSkills || 1); // 0 to 1

        // 2. Metric Analysis
        const timeDiff = Math.abs(metricsA.weeklyHours - metricsB.weeklyHours);
        const isTimeConflict = (metricsA.weeklyHours + metricsB.weeklyHours) > 60;

        // 3. Attribute Analysis
        const focusA = attrA.interviewFocus || [];
        const focusB = attrB.interviewFocus || [];
        const differentFocus = focusA.some(f => !focusB.includes(f)) || focusB.some(f => !focusA.includes(f));

        // START SCORING
        let score = Math.round(jaccardIndex * 100);
        // Penalize for time difference and conflicts
        if (isTimeConflict) score -= 30;
        if (differentFocus) score -= 15;
        score = Math.max(0, Math.min(100, score));


        // GENERATE TEXT
        let summary = `Comparing "${realityA.name}" and "${realityB.name}" shows a ${score > 70 ? 'high' : score > 40 ? 'moderate' : 'low'} degree of alignment. `;

        if (totalUniqueSkills > 4) {
            summary += `The technical requirements are vastly different, with ${totalUniqueSkills} unique skills between them. `;
        } else {
            summary += `The core skill sets are quite similar. `;
        }

        if (isTimeConflict) {
            summary += `Warning: The combined time commitment is unsustainable. `;
        }

        let recommendation = "";
        if (score > 80) {
            recommendation = "Great synergy! You can easily toggle between these paths or merge them into a strong hybrid profile.";
        } else if (score > 50) {
            recommendation = "These paths have some overlap but require distinct preparation methods. Consider sequencing them (one after another) rather than parallel tracking.";
        } else {
            recommendation = "These realities are fundamentally different. It is recommended to fork completely and treat them as separate career modes to avoid context switching fatigue.";
        }

        const keyDifferentiator = timeDiff > 10
            ? `Time Commitment: "${realityA.name}" requires ${metricsA.weeklyHours}h vs "${realityB.name}" at ${metricsB.weeklyHours}h.`
            : `Focus: "${realityA.name}" prioritizes ${focusA[0] || 'general skills'} while "${realityB.name}" targets ${focusB[0] || 'general skills'}.`;

        return {
            compatibilityScore: score,
            summary,
            keyDifferentiator,
            recommendation
        };
    }
}
