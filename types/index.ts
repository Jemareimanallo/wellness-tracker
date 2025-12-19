export interface HabitEntry {
  id: string;
  date: string;
  waterIntake: number; // glasses
  exercise: number; // minutes
  sleep: number; // hours
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  notes: string;
  tags: string[];
}
