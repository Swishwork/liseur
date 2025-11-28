import { UserState, UserProgress, curriculum } from '../data/curriculum';

const STORAGE_KEY = 'liseur-learning-journey';
const STORAGE_VERSION = '1.0';

export interface StorageData {
  version: string;
  userState: UserState;
}

const defaultUserState: UserState = {
  progress: {
    currentLevelId: 1,
    completedLevels: [],
    totalBlendsCompleted: 0,
    levelProgress: {},
    lastPlayedDate: new Date().toISOString()
  },
  settings: {
    soundEnabled: true,
    encouragementEnabled: true
  }
};

export function saveProgress(userState: UserState): boolean {
  try {
    const data: StorageData = {
      version: STORAGE_VERSION,
      userState: {
        ...userState,
        progress: {
          ...userState.progress,
          lastPlayedDate: new Date().toISOString()
        }
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save progress:', error);
    return false;
  }
}

export function loadProgress(): UserState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultUserState;
    }

    const data: StorageData = JSON.parse(stored);
    
    // Version check for future migrations
    if (data.version !== STORAGE_VERSION) {
      console.log('Storage version mismatch, resetting to defaults');
      return defaultUserState;
    }

    // Validate data integrity
    if (!isValidUserState(data.userState)) {
      console.warn('Invalid stored data, resetting to defaults');
      return defaultUserState;
    }

    return data.userState;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return defaultUserState;
  }
}

export function resetProgress(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to reset progress:', error);
    return false;
  }
}

export function updateLevelProgress(
  userState: UserState,
  levelId: number,
  blendsCompleted: number
): UserState {
  const updatedState = {
    ...userState,
    progress: {
      ...userState.progress,
      totalBlendsCompleted: userState.progress.totalBlendsCompleted + 1,
      levelProgress: {
        ...userState.progress.levelProgress,
        [levelId]: {
          blendsCompleted,
          lastPlayed: new Date().toISOString()
        }
      }
    }
  };
  
  return updatedState;
}

export function completeLevel(
  userState: UserState,
  levelId: number
): UserState {
  const completedLevels = userState.progress.completedLevels.includes(levelId)
    ? userState.progress.completedLevels
    : [...userState.progress.completedLevels, levelId];

  const nextLevelId = Math.min(levelId + 1, curriculum.length);
  
  return {
    ...userState,
    progress: {
      ...userState.progress,
      completedLevels,
      currentLevelId: nextLevelId
    }
  };
}

export function isLevelUnlocked(userProgress: UserProgress, levelId: number): boolean {
  // Level 1 is always unlocked
  if (levelId === 1) return true;
  
  // Other levels require completion of the previous level
  return userProgress.completedLevels.includes(levelId - 1);
}

export function getLevelProgress(userProgress: UserProgress, levelId: number): number {
  const level = curriculum.find(l => l.id === levelId);
  if (!level) return 0;
  
  const progress = userProgress.levelProgress[levelId];
  if (!progress) return 0;
  
  return Math.min(100, Math.round((progress.blendsCompleted / level.requiredSuccesses) * 100));
}

export function isLevelComplete(userProgress: UserProgress, levelId: number): boolean {
  return userProgress.completedLevels.includes(levelId);
}

function isValidUserState(data: any): data is UserState {
  return (
    data &&
    typeof data === 'object' &&
    data.progress &&
    typeof data.progress.currentLevelId === 'number' &&
    Array.isArray(data.progress.completedLevels) &&
    typeof data.progress.totalBlendsCompleted === 'number' &&
    typeof data.progress.levelProgress === 'object' &&
    data.settings &&
    typeof data.settings.soundEnabled === 'boolean' &&
    typeof data.settings.encouragementEnabled === 'boolean'
  );
}

export function getTotalPracticeTime(userProgress: UserProgress): string {
  const totalBlends = userProgress.totalBlendsCompleted;
  // Estimate ~10 seconds per blend
  const estimatedSeconds = totalBlends * 10;
  const minutes = Math.floor(estimatedSeconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  return `${minutes}m`;
}

export function getRecentActivity(userProgress: UserProgress): string[] {
  const activities: string[] = [];
  
  // Sort level progress by last played date
  const recentLevels = Object.entries(userProgress.levelProgress)
    .filter(([_, progress]) => progress.lastPlayed)
    .sort((a, b) => {
      const dateA = new Date(a[1].lastPlayed!).getTime();
      const dateB = new Date(b[1].lastPlayed!).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);
  
  recentLevels.forEach(([levelId, progress]) => {
    const level = curriculum.find(l => l.id === parseInt(levelId));
    if (level) {
      const date = new Date(progress.lastPlayed!);
      const dateStr = date.toLocaleDateString();
      activities.push(`Practiced "${level.name}" on ${dateStr}`);
    }
  });
  
  return activities;
}