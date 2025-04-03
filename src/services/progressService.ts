import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface UserProgress {
  moduleProgress: {
    [moduleId: string]: number;
  };
  completedSections: {
    [moduleId: string]: boolean[];
  };
}

export const saveProgress = async (userId: string, moduleId: string, progress: number, completedSections: boolean[]) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProgress;
    await setDoc(userRef, {
      ...userData,
      moduleProgress: {
        ...userData.moduleProgress,
        [moduleId]: progress
      },
      completedSections: {
        ...userData.completedSections,
        [moduleId]: completedSections
      }
    });
  } else {
    await setDoc(userRef, {
      moduleProgress: {
        [moduleId]: progress
      },
      completedSections: {
        [moduleId]: completedSections
      }
    });
  }
};

export const getProgress = async (userId: string): Promise<UserProgress | null> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserProgress;
  }

  return null;
}; 