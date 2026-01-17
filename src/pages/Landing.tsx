import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import logo from "@/assets/mindely-logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Logo - sits directly on gradient, no container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mb-12"
        >
          <img 
            src={logo} 
            alt="Mindely" 
            className="h-16 md:h-20 lg:h-24 mx-auto object-contain drop-shadow-[0_0_20px_hsl(145_80%_42%/0.4)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Let's start{" "}
          <span className="text-primary glow-text">learning</span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Choose how you want to study. No pressure. No tracking.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/methods")}
          className="px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 animate-glow-pulse"
          style={{
            boxShadow: "0 4px 30px hsl(145 80% 42% / 0.4)",
          }}
        >
          Let's start learning
        </motion.button>

        {/* Subtle footer message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="mt-16 text-sm text-muted-foreground/60"
        >
          Your calm study companion • No login required
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Landing;
