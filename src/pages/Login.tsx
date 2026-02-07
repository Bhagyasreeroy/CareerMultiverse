import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/ui/NeonButton";
import { Lock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast({ title: "Welcome back!", description: "Accessing your career multiverse..." });
            navigate("/dashboard");
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "Invalid credentials. Try demo: alex@example.com / password",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <GlassCard className="p-8 backdrop-blur-xl border-white/10" glow glowColor="primary">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl font-bold mb-2">
                            <span className="text-foreground">Career </span>
                            <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Multiverse
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Unlock your infinite potential.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="alex@example.com"
                                    className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
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
                                    placeholder="••••••••"
                                    className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <NeonButton className="w-full mt-6" size="lg" disabled={isLoading}>
                            {isLoading ? "Authenticating..." : "Enter the Multiverse"}
                        </NeonButton>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Initialize Profile
                        </Link>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default Login;
