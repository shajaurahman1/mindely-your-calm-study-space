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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Logo - sits directly on gradient, no container */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <img 
            src={logo} 
            alt="Mindely" 
            className="h-20 md:h-28 lg:h-36 mx-auto object-contain drop-shadow-[0_0_30px_hsl(145_80%_42%/0.5)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Let's start{" "}
          <span className="text-primary glow-text">learning</span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl text-muted-foreground mb-14 max-w-lg mx-auto leading-relaxed"
        >
          Choose how you want to study. No pressure. No tracking.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/methods")}
          className="px-12 py-5 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-700 ease-out animate-glow-pulse"
          style={{
            boxShadow: "0 8px 40px hsl(145 80% 42% / 0.45)",
          }}
        >
          Let's start learning
        </motion.button>

        {/* Subtle footer message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 text-sm text-muted-foreground/60"
        >
          Your calm study companion • No login required
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Landing;
