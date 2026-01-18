import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudyMethodCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const StudyMethodCard = ({ id, title, description, icon: Icon, index }: StudyMethodCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.03, 
        y: -6,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      whileTap={{ scale: 0.97, transition: { duration: 0.3 } }}
      onClick={() => navigate(`/method/${id}`)}
      className="group cursor-pointer"
    >
      <div className="glass-card rounded-2xl p-6 h-full transition-all duration-700 ease-out hover:border-primary/40 glow-border hover:shadow-[0_8px_40px_hsl(145_80%_42%/0.2)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-all duration-700 ease-out group-hover:scale-110">
            <Icon className="w-6 h-6 text-primary transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-all duration-700 ease-out">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 transition-all duration-700 ease-out">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyMethodCard;
