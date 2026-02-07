import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-4">
              <span className="text-foreground">Career</span>
              <span className="text-primary">Multiverse</span>
            </h3>
            <p className="text-muted-foreground mb-6 italic">
              "You don't choose one future. You explore many."
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-3">
              {["Dashboard", "Timeline", "Profile", "Resources", "Community"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {["Career Guides", "Interview Prep", "Skill Roadmaps", "Success Stories", "API Docs"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-destructive animate-pulse" /> by{" "}
            <span className="text-foreground font-medium">Yash Barjatya</span>,{" "}
            <span className="text-foreground font-medium">Bhagyasree Roy</span>, and{" "}
            <span className="text-foreground font-medium">Ananya Santosh</span>
          </p>
          <p className="text-muted-foreground text-sm">
            © 2024 Career Multiverse. All realities reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
