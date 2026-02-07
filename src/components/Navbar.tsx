import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Login", href: "/login" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                className="p-2 rounded-lg bg-primary/20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="font-display text-xl font-bold">
                <span className="text-foreground">Career</span>
                <span className="text-primary">Multiverse</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/signup">
                <NeonButton variant="primary" size="sm">
                  Get Started
                </NeonButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-6 pb-2 space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <NeonButton
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      Get Started
                    </NeonButton>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};
