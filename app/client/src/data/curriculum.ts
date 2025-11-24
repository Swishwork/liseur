export interface Level {
  id: number;
  name: string;
  description: string;
  introMessage: string;
  consonants: string[];
  vowels: string[];
  requiredSuccesses: number;
  unlocked: boolean;
  completed: boolean;
  color: string;
  icon?: string;
}

export interface UserProgress {
  currentLevelId: number;
  completedLevels: number[];
  totalBlendsCompleted: number;
  levelProgress: {
    [levelId: number]: {
      blendsCompleted: number;
      lastPlayed?: string;
    };
  };
  lastPlayedDate: string;
}

export interface UserState {
  progress: UserProgress;
  settings: {
    soundEnabled: boolean;
    encouragementEnabled: boolean;
  };
}

export const curriculum: Level[] = [
  {
    id: 1,
    name: "Garden of Vowels",
    description: "Start your journey by mastering the beautiful French vowels",
    introMessage: "Welcome to the Garden of Vowels! Here you'll discover the musical sounds of French vowels. Take your time and enjoy each sound!",
    consonants: [],
    vowels: ["a", "e", "i", "o", "u"],
    requiredSuccesses: 10,
    unlocked: true,
    completed: false,
    color: "#90EE90",
    icon: "🌱"
  },
  {
    id: 2,
    name: "Stone Path",
    description: "Add simple consonants to create your first real syllables",
    introMessage: "Great work in the garden! Now let's walk the Stone Path and combine consonants with the vowels you've mastered.",
    consonants: ["m", "p", "b", "t", "d"],
    vowels: ["a", "e", "i", "o", "u"],
    requiredSuccesses: 15,
    unlocked: false,
    completed: false,
    color: "#FFB347",
    icon: "🪨"
  },
  {
    id: 3,
    name: "Whispering Woods",
    description: "Explore softer sounds that flow like whispers through trees",
    introMessage: "Listen carefully... The Whispering Woods are full of gentle sounds. Let's discover the soft consonants of French!",
    consonants: ["f", "s", "v", "z", "l", "n"],
    vowels: ["a", "e", "i", "o", "u", "é", "è"],
    requiredSuccesses: 20,
    unlocked: false,
    completed: false,
    color: "#8FBC8F",
    icon: "🌲"
  },
  {
    id: 4,
    name: "Rolling Hills",
    description: "Master the rolling R and harder consonant combinations",
    introMessage: "You're doing wonderfully! The Rolling Hills will help you master the French R and more complex sounds.",
    consonants: ["r", "g", "k", "j", "c", "q"],
    vowels: ["a", "e", "i", "o", "u", "é", "è", "ê"],
    requiredSuccesses: 25,
    unlocked: false,
    completed: false,
    color: "#87CEEB",
    icon: "⛰️"
  },
  {
    id: 5,
    name: "Crystal Cave",
    description: "Complete your journey with complex blends and special sounds",
    introMessage: "You've come so far! The Crystal Cave holds the final treasures: complex blends and special French sounds. You're almost a reading champion!",
    consonants: ["ch", "gn", "ph", "qu", "x", "w", "y"],
    vowels: ["a", "e", "i", "o", "u", "é", "è", "ê", "à", "ù", "ou", "eu", "au", "eau", "ai", "ei", "oi"],
    requiredSuccesses: 30,
    unlocked: false,
    completed: false,
    color: "#DDA0DD",
    icon: "💎"
  }
];

export const encouragingMessages = [
  "Magnifique! You're doing great!",
  "Keep going! You're getting stronger!",
  "Wonderful work! Each blend makes you better!",
  "You're a natural! Keep it up!",
  "Bravo! That was perfect!",
  "Excellent! You're learning so fast!",
  "Amazing progress! You should be proud!",
  "You're doing wonderfully!",
  "Fantastic! Your reading is getting smoother!",
  "Great job! You're becoming a reading star!",
  "Super! Each try makes you stronger!",
  "You're incredible! Keep going!",
  "Brilliant work! You're mastering French!",
  "Formidable! You're on fire!",
  "Spectacular! Your hard work is showing!"
];

export const celebrationMessages = {
  1: {
    title: "Garden of Vowels Complete!",
    message: "You've mastered all the vowels! The Stone Path awaits your next adventure.",
    nextLevelPreview: "Next up: Simple consonants like M, P, and B!"
  },
  2: {
    title: "Stone Path Conquered!",
    message: "Amazing! You can now blend consonants with vowels. Ready for the Whispering Woods?",
    nextLevelPreview: "Next up: Soft flowing sounds like F, S, and L!"
  },
  3: {
    title: "Whispering Woods Explored!",
    message: "Wonderful! The soft sounds are yours. The Rolling Hills call to you!",
    nextLevelPreview: "Next up: The rolling R and harder sounds!"
  },
  4: {
    title: "Rolling Hills Mastered!",
    message: "Incredible progress! You've conquered the rolling R. One final challenge awaits!",
    nextLevelPreview: "Final level: Complex blends and special French sounds!"
  },
  5: {
    title: "Crystal Cave Champion!",
    message: "🎉 CONGRATULATIONS! You've completed the entire learning journey! You're now a French reading champion!",
    nextLevelPreview: "You can practice any level whenever you want!"
  }
};

export function getRandomEncouragingMessage(): string {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
}

export function getLevelById(id: number): Level | undefined {
  return curriculum.find(level => level.id === id);
}

export function getNextLevel(currentLevelId: number): Level | undefined {
  return curriculum.find(level => level.id === currentLevelId + 1);
}

export function calculateOverallProgress(userProgress: UserProgress): number {
  const completedLevels = userProgress.completedLevels.length;
  const totalLevels = curriculum.length;
  return Math.round((completedLevels / totalLevels) * 100);
}