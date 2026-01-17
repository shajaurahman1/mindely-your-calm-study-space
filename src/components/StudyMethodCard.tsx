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

const StudyMethodCard = ({ id, title, description, icon: Icon, index }: StudyMethodCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/method/${id}`)}
      className="group cursor-pointer"
    >
      <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/30 glow-border hover:shadow-[0_0_30px_hsl(145_80%_42%/0.15)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyMethodCard;
