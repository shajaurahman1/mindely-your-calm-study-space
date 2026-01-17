import { 
  Timer, 
  Clock, 
  CalendarDays, 
  Brain, 
  Lightbulb, 
  BookOpen, 
  Layers, 
  GitBranch, 
  FileText, 
  Repeat 
} from "lucide-react";

export interface StudyMethod {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  howItWorks: string[];
  bestFor: string[];
  icon: typeof Timer;
  hasTimer: boolean;
  focusMinutes?: number;
  breakMinutes?: number;
}

export const studyMethods: StudyMethod[] = [
  {
    id: "pomodoro",
    title: "Pomodoro Technique",
    description: "Focus in 25-minute bursts with short breaks between.",
    fullDescription: "The Pomodoro Technique helps you break work into focused intervals, making large tasks less overwhelming. Work for 25 minutes, then reward yourself with a 5-minute break.",
    howItWorks: [
      "Set timer for 25 minutes of focused work",
      "Work on one task without distractions",
      "Take a 5-minute break when the timer rings",
      "After 4 pomodoros, take a longer 15-30 minute break"
    ],
    bestFor: ["Beginners", "Long study days", "Low motivation days"],
    icon: Timer,
    hasTimer: true,
    focusMinutes: 25,
    breakMinutes: 5
  },
  {
    id: "flowtime",
    title: "Flowtime",
    description: "Work in natural flow states without fixed intervals.",
    fullDescription: "Flowtime lets you work in your natural rhythm. Unlike Pomodoro, you decide when to take breaks based on how you feel, preserving your flow state.",
    howItWorks: [
      "Start working on your task",
      "Note when you started",
      "Take a break when you naturally feel tired",
      "Rest for 1/5 of the time you worked"
    ],
    bestFor: ["Creative work", "Deep thinking", "Those who dislike rigid schedules"],
    icon: Clock,
    hasTimer: true,
    focusMinutes: 45,
    breakMinutes: 10
  },
  {
    id: "time-blocking",
    title: "Time Blocking",
    description: "Assign specific hours to specific tasks or subjects.",
    fullDescription: "Time blocking helps you plan your day by dedicating specific time slots to specific activities. It reduces decision fatigue and creates structure.",
    howItWorks: [
      "List all tasks you need to complete",
      "Estimate how long each task will take",
      "Assign each task to a specific time slot",
      "Protect your blocks from interruptions"
    ],
    bestFor: ["University students", "Competitive exam prep", "Long study days"],
    icon: CalendarDays,
    hasTimer: true,
    focusMinutes: 60,
    breakMinutes: 10
  },
  {
    id: "active-recall",
    title: "Active Recall",
    description: "Test yourself instead of passively re-reading notes.",
    fullDescription: "Active recall is one of the most effective learning techniques. Instead of just reading, you actively retrieve information from memory, which strengthens neural pathways.",
    howItWorks: [
      "Study a topic briefly",
      "Close your book or notes",
      "Write or say everything you remember",
      "Check what you missed and repeat"
    ],
    bestFor: ["Exams", "Definitions & formulas", "MCQ preparation"],
    icon: Brain,
    hasTimer: true,
    focusMinutes: 30,
    breakMinutes: 5
  },
  {
    id: "feynman",
    title: "Feynman Technique",
    description: "Teach concepts in simple words to truly understand them.",
    fullDescription: "Named after physicist Richard Feynman, this technique reveals gaps in your understanding. If you can't explain something simply, you don't understand it well enough.",
    howItWorks: [
      "Choose a concept to learn",
      "Explain it as if teaching a child",
      "Identify gaps in your explanation",
      "Go back, study more, and simplify again"
    ],
    bestFor: ["Concept-heavy subjects", "Physics & engineering", "Deep understanding"],
    icon: Lightbulb,
    hasTimer: false
  },
  {
    id: "sq3r",
    title: "SQ3R Method",
    description: "Survey, Question, Read, Recite, Review for deep reading.",
    fullDescription: "SQ3R is a structured reading strategy that turns passive reading into active learning. Each step builds comprehension and retention.",
    howItWorks: [
      "Survey: Skim headings, summaries, and images",
      "Question: Turn headings into questions",
      "Read: Read actively to answer your questions",
      "Recite: Summarize in your own words",
      "Review: Go over the material regularly"
    ],
    bestFor: ["Textbooks", "Theory subjects", "History, biology, law"],
    icon: BookOpen,
    hasTimer: true,
    focusMinutes: 45,
    breakMinutes: 10
  },
  {
    id: "leitner",
    title: "Leitner System",
    description: "Use flashcard boxes to optimize your review schedule.",
    fullDescription: "The Leitner System uses spaced repetition with physical or digital flashcards. Cards you know well are reviewed less often, while difficult ones appear more frequently.",
    howItWorks: [
      "Create flashcards for what you're learning",
      "Start all cards in Box 1",
      "Move correct answers to the next box",
      "Move wrong answers back to Box 1",
      "Review boxes at different intervals"
    ],
    bestFor: ["Vocabulary", "Definitions", "Facts & dates"],
    icon: Layers,
    hasTimer: false
  },
  {
    id: "mind-mapping",
    title: "Mind Mapping",
    description: "Visualize connections between ideas with branching diagrams.",
    fullDescription: "Mind mapping mirrors how your brain naturally connects ideas. Starting from a central concept, you branch out to related topics, creating a visual overview.",
    howItWorks: [
      "Write your main topic in the center",
      "Draw branches for main subtopics",
      "Add smaller branches for details",
      "Use colors, icons, and images",
      "Connect related ideas across branches"
    ],
    bestFor: ["Brainstorming", "Overview of topics", "Visual learners"],
    icon: GitBranch,
    hasTimer: false
  },
  {
    id: "cornell",
    title: "Cornell Note-Taking",
    description: "Structured notes with cues, notes, and summary sections.",
    fullDescription: "The Cornell method divides your page into sections for notes, cues, and summaries. This structure helps with active review and retention.",
    howItWorks: [
      "Divide your page into 3 sections",
      "Right column (largest): Take detailed notes",
      "Left column: Add questions & keywords later",
      "Bottom section: Write a brief summary",
      "Use the cue column to test yourself"
    ],
    bestFor: ["Lectures", "Reading notes", "Any subject"],
    icon: FileText,
    hasTimer: true,
    focusMinutes: 50,
    breakMinutes: 10
  },
  {
    id: "spaced-repetition",
    title: "Spaced Repetition",
    description: "Review material at increasing intervals over time.",
    fullDescription: "Spaced repetition fights the forgetting curve by reviewing information just as you're about to forget it. This builds strong long-term memory with minimal effort.",
    howItWorks: [
      "Learn new material",
      "Review after 1 day",
      "Review again after 3 days",
      "Then 1 week, 2 weeks, 1 month...",
      "Increase intervals for material you know well"
    ],
    bestFor: ["Exams", "Language learning", "Long-term retention"],
    icon: Repeat,
    hasTimer: true,
    focusMinutes: 20,
    breakMinutes: 5
  }
];
