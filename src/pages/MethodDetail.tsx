import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Timer from "@/components/Timer";
import { studyMethods } from "@/data/studyMethods";
import logo from "@/assets/mindely-logo.png";

const MethodDetail = () => {
  const navigate = useNavigate();
  const { methodId } = useParams();
  
  const method = studyMethods.find((m) => m.id === methodId);

  if (!method) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Method not found</h1>
          <button
            onClick={() => navigate("/methods")}
            className="text-primary hover:underline"
          >
            Go back to methods
          </button>
        </div>
      </div>
    );
  }

  const Icon = method.icon;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 px-6 py-8 md:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/methods")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">All Methods</span>
            </button>
            
            <img 
              src={logo} 
              alt="Mindely" 
              className="h-8 md:h-10 object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />
            
            <div className="w-20" />
          </div>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          {/* Method Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {method.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {method.fullDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Timer Section */}
            {method.hasTimer && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Timer 
                  focusMinutes={method.focusMinutes} 
                  breakMinutes={method.breakMinutes}
                  showBreakToggle={method.id === "pomodoro" || method.id === "flowtime"}
                  label={method.title}
                />
              </motion.div>
            )}

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: method.hasTimer ? 20 : 0, y: method.hasTimer ? 0 : 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`space-y-6 ${!method.hasTimer ? "md:col-span-2 max-w-2xl mx-auto" : ""}`}
            >
              {/* How it works */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  How it works
                </h3>
                <ul className="space-y-3">
                  {method.howItWorks.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best for */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Best for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {method.bestFor.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground/60 text-sm">
              Remember: There's no rush. Learn at your own pace. You've got this! 💚
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MethodDetail;
