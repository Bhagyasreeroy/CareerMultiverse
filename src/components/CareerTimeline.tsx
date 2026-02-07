import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Code, Database, LineChart, Briefcase, Rocket, 
  ChevronRight, GitFork, Clock, DollarSign, Zap
} from "lucide-react";

export interface CareerNode {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  skills: string[];
  timeToMastery: string;
  salaryRange: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  parentId?: string;
  children: string[];
  x: number;
  y: number;
}

const careerNodes: CareerNode[] = [
  {
    id: "root",
    title: "Your Journey",
    description: "The beginning of infinite possibilities",
    icon: Rocket,
    color: "hsl(186, 100%, 50%)",
    glowColor: "primary",
    skills: ["Problem Solving", "Learning Mindset"],
    timeToMastery: "Ongoing",
    salaryRange: "Starting Point",
    difficulty: "Easy",
    children: ["software", "data", "product"],
    x: 50,
    y: 15,
  },
  {
    id: "software",
    title: "Software Developer",
    description: "Build the future with code",
    icon: Code,
    color: "hsl(270, 100%, 65%)",
    glowColor: "secondary",
    skills: ["JavaScript", "React", "Node.js", "System Design"],
    timeToMastery: "2-3 years",
    salaryRange: "$80K - $200K",
    difficulty: "Medium",
    parentId: "root",
    children: ["fullstack", "architect"],
    x: 20,
    y: 40,
  },
  {
    id: "data",
    title: "Data Analyst",
    description: "Turn data into insights",
    icon: Database,
    color: "hsl(150, 100%, 45%)",
    glowColor: "success",
    skills: ["Python", "SQL", "Statistics", "Visualization"],
    timeToMastery: "1-2 years",
    salaryRange: "$70K - $150K",
    difficulty: "Medium",
    parentId: "root",
    children: ["scientist", "engineer"],
    x: 50,
    y: 40,
  },
  {
    id: "product",
    title: "Product Manager",
    description: "Shape products that matter",
    icon: Briefcase,
    color: "hsl(38, 100%, 55%)",
    glowColor: "warning",
    skills: ["Strategy", "Communication", "Analytics", "UX"],
    timeToMastery: "3-4 years",
    salaryRange: "$100K - $250K",
    difficulty: "Hard",
    parentId: "root",
    children: ["founder"],
    x: 80,
    y: 40,
  },
  {
    id: "fullstack",
    title: "Fullstack Engineer",
    description: "Master both worlds",
    icon: Code,
    color: "hsl(270, 100%, 65%)",
    glowColor: "secondary",
    skills: ["Frontend", "Backend", "DevOps", "Databases"],
    timeToMastery: "3-4 years",
    salaryRange: "$100K - $220K",
    difficulty: "Hard",
    parentId: "software",
    children: [],
    x: 10,
    y: 65,
  },
  {
    id: "architect",
    title: "Solution Architect",
    description: "Design systems at scale",
    icon: LineChart,
    color: "hsl(270, 100%, 65%)",
    glowColor: "secondary",
    skills: ["System Design", "Cloud", "Leadership"],
    timeToMastery: "5+ years",
    salaryRange: "$150K - $300K",
    difficulty: "Expert",
    parentId: "software",
    children: [],
    x: 30,
    y: 65,
  },
  {
    id: "scientist",
    title: "Data Scientist",
    description: "AI and machine learning",
    icon: Database,
    color: "hsl(150, 100%, 45%)",
    glowColor: "success",
    skills: ["ML", "Deep Learning", "Python", "Math"],
    timeToMastery: "3-4 years",
    salaryRange: "$120K - $250K",
    difficulty: "Expert",
    parentId: "data",
    children: [],
    x: 42,
    y: 65,
  },
  {
    id: "engineer",
    title: "Data Engineer",
    description: "Build data infrastructure",
    icon: Database,
    color: "hsl(150, 100%, 45%)",
    glowColor: "success",
    skills: ["Spark", "Airflow", "ETL", "Cloud"],
    timeToMastery: "2-3 years",
    salaryRange: "$110K - $200K",
    difficulty: "Hard",
    parentId: "data",
    children: [],
    x: 58,
    y: 65,
  },
  {
    id: "founder",
    title: "Startup Founder",
    description: "Build your own venture",
    icon: Rocket,
    color: "hsl(330, 100%, 60%)",
    glowColor: "accent",
    skills: ["Leadership", "Fundraising", "Vision", "Execution"],
    timeToMastery: "5+ years",
    salaryRange: "Unlimited",
    difficulty: "Expert",
    parentId: "product",
    children: [],
    x: 85,
    y: 65,
  },
];

const difficultyColors = {
  Easy: "text-success",
  Medium: "text-warning",
  Hard: "text-secondary",
  Expert: "text-destructive",
};

export const CareerTimeline = () => {
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<CareerNode | null>(null);

  // Draw connections between nodes
  const renderConnections = () => {
    return careerNodes.map((node) => {
      if (!node.parentId) return null;
      const parent = careerNodes.find((n) => n.id === node.parentId);
      if (!parent) return null;

      return (
        <motion.line
          key={`${parent.id}-${node.id}`}
          x1={`${parent.x}%`}
          y1={`${parent.y + 5}%`}
          x2={`${node.x}%`}
          y2={`${node.y - 5}%`}
          stroke={node.color}
          strokeWidth="2"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      );
    });
  };

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Your Career </span>
            <span className="text-glow-secondary bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Multiverse
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover over any path to explore. Click to fork and create your own reality.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <div className="relative h-[600px] w-full">
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {renderConnections()}
          </svg>

          {/* Nodes */}
          {careerNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
            >
              {/* Node circle */}
              <motion.div
                className="relative flex items-center justify-center w-16 h-16 rounded-full border-2"
                style={{
                  borderColor: node.color,
                  backgroundColor: `${node.color}20`,
                  boxShadow: `0 0 20px ${node.color}40, 0 0 40px ${node.color}20`,
                }}
                whileHover={{ scale: 1.2 }}
                animate={hoveredNode?.id === node.id ? { scale: 1.2 } : { scale: 1 }}
              >
                <node.icon className="w-7 h-7" style={{ color: node.color }} />
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ borderColor: node.color }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Node label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <span className="text-sm font-medium text-foreground">{node.title}</span>
              </div>

              {/* Fork indicator */}
              {node.children.length > 0 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                  <GitFork className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Hover tooltip */}
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-50 pointer-events-none"
              style={{
                left: `${hoveredNode.x}%`,
                top: `${hoveredNode.y + 15}%`,
                transform: "translateX(-50%)",
              }}
            >
              <GlassCard className="p-4 w-72" glow glowColor={hoveredNode.glowColor as any}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: hoveredNode.color }}>
                  {hoveredNode.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{hoveredNode.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Skills:</span>
                    <span className="text-foreground">{hoveredNode.skills.slice(0, 2).join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Time:</span>
                    <span className="text-foreground">{hoveredNode.timeToMastery}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="text-foreground">{hoveredNode.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className={difficultyColors[hoveredNode.difficulty]}>{hoveredNode.difficulty}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Click to explore</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
