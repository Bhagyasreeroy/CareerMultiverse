import { ResumeData, Skill } from '@/types/career';
import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
    data: ResumeData;
    skills: Skill[];
    template: 'professional' | 'modern';
    className?: string;
    id?: string;
}

export const ResumePreview = ({ data, skills, template, className, id }: ResumePreviewProps) => {
    // Shared Content
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);

    if (template === 'modern') {
        return (
            <div id={id} className={`w-full bg-white text-gray-900 p-8 min-h-[1056px] shadow-lg ${className} print:shadow-none print:w-full`}>
                <header className="border-b-4 border-indigo-600 pb-6 mb-6">
                    <h1 className="text-4xl font-bold text-indigo-900 mb-2">{data.personalInfo.fullName}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{data.personalInfo.email}</span>
                        <span>•</span>
                        <span>{data.personalInfo.phone}</span>
                        <span>•</span>
                        <span>{data.personalInfo.location}</span>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-indigo-600">
                        {data.personalInfo.links.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="hover:underline">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-8">
                        {/* Summary */}
                        <section>
                            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">Profile</h3>
                            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
                        </section>

                        {/* Main Sections (Experience, Projects) */}
                        {data.sections.filter(s => s.type !== 'education').map(section => (
                            <section key={section.id}>
                                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{section.title}</h3>
                                <div className="space-y-4">
                                    {section.items.map(item => (
                                        <div key={item.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                                <span className="text-sm text-gray-500">{item.dateRange}</span>
                                            </div>
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-indigo-700 font-medium">{item.subtitle}</span>
                                                {item.location && <span className="text-xs text-gray-500 italic">{item.location}</span>}
                                            </div>
                                            <p className="text-sm text-gray-700 whitespace-pre-line">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="col-span-1 space-y-8 bg-gray-50 p-4 rounded-lg h-full">
                        {/* Education (Sidebar) */}
                        {data.sections.filter(s => s.type === 'education').map(section => (
                            <section key={section.id}>
                                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{section.title}</h3>
                                <div className="space-y-4">
                                    {section.items.map(item => (
                                        <div key={item.id}>
                                            <h4 className="font-bold text-gray-900 text-sm">{item.subtitle}</h4>
                                            <p className="text-sm text-indigo-700">{item.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.dateRange}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}

                        {/* Skills Sidebar */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Skills</h3>
                            <div className="space-y-4">
                                {Object.entries(groupedSkills).map(([cat, skillNames]) => (
                                    <div key={cat}>
                                        <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">{cat}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skillNames.map((name, i) => (
                                                <Badge key={i} variant="secondary" className="bg-white border-gray-200 text-gray-700 text-xs font-normal">
                                                    {name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    // Professional Template (Classic)
    return (
        <div id={id} className={`w-full bg-white text-black p-10 min-h-[1056px] ${className}`}>
            <header className="text-center mb-6">
                <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">{data.personalInfo.fullName}</h1>
                <div className="text-sm flex justify-center gap-2 text-gray-700">
                    <span>{data.personalInfo.email}</span> |
                    <span>{data.personalInfo.phone}</span> |
                    <span>{data.personalInfo.location}</span>
                </div>
                <div className="flex justify-center gap-4 mt-1 text-sm text-blue-800">
                    {data.personalInfo.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="underline">
                            {link.label}
                        </a>
                    ))}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                <section>
                    <h3 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">Professional Summary</h3>
                    <p className="text-sm leading-snug">{data.personalInfo.summary}</p>
                </section>

                {/* Skills */}
                <section>
                    <h3 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">Technical Skills</h3>
                    <div className="text-sm grid grid-cols-1 gap-2">
                        {Object.entries(groupedSkills).map(([cat, skillNames]) => (
                            <div key={cat} className="flex">
                                <span className="font-semibold w-32 capitalize">{cat}:</span>
                                <span>{skillNames.join(', ')}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* All Sections */}
                {data.sections.map(section => (
                    <section key={section.id}>
                        <h3 className="text-sm font-bold uppercase border-b border-black pb-1 mb-3">{section.title}</h3>
                        <div className="space-y-3">
                            {section.items.map(item => (
                                <div key={item.id}>
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>{item.title}</span>
                                        <span>{item.dateRange}</span>
                                    </div>
                                    <div className="flex justify-between text-sm italic mb-1">
                                        <span>{item.subtitle}</span>
                                        <span>{item.location}</span>
                                    </div>
                                    <p className="text-sm whitespace-pre-line">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
