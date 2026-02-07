import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/ui/NeonButton";
import { Lock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            toast({ title: "Welcome, explorer!", description: "Your profile has been initialized." });
            navigate("/dashboard");
        } catch (error) {
            toast({
                title: "Registration Failed",
                description: "Could not create account at this time.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <GlassCard className="p-8 backdrop-blur-xl border-white/10" glow glowColor="accent">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl font-bold mb-2">
                            <span className="text-foreground">Initialize </span>
                            <span className="text-glow bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                                Protocol
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Begin your journey across the multiverse.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="pl-10 bg-background/50 border-white/10 focus:border-accent/50"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="jane@example.com"
                                    className="pl-10 bg-background/50 border-white/10 focus:border-accent/50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="pl-10 bg-background/50 border-white/10 focus:border-accent/50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <NeonButton className="w-full mt-6" size="lg" disabled={isLoading} variant="secondary">
                            {isLoading ? "Initializing..." : "Create Account"}
                        </NeonButton>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have access?{" "}
                        <Link to="/login" className="text-accent hover:underline font-medium">
                            Login here
                        </Link>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default Signup;
