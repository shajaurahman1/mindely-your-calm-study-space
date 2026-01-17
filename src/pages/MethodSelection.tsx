import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import StudyMethodCard from "@/components/StudyMethodCard";
import { studyMethods } from "@/data/studyMethods";
import logo from "@/assets/mindely-logo.png";

const MethodSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 px-6 py-8 md:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <img 
              src={logo} 
              alt="Mindely" 
              className="h-8 md:h-10 object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />
            
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </motion.header>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pick a study method that feels{" "}
            <span className="text-primary">right</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            You can change anytime. There's no wrong choice.
          </p>
        </motion.div>

        {/* Methods Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {studyMethods.map((method, index) => (
              <StudyMethodCard
                key={method.id}
                id={method.id}
                title={method.title}
                description={method.description}
                icon={method.icon}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Footer encouragement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground/60 text-sm mt-16"
        >
          Every study session is a step forward 🌱
        </motion.p>
      </div>
    </div>
  );
};

export default MethodSelection;
