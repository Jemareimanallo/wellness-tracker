"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Dumbbell,
  Moon,
  Plus,
  Minus,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: any;
  current: number;
  goal: number;
  unit: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface DailyRecord {
  date: string;
  habits: {
    [key: string]: number;
  };
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "water",
      name: "Water Intake",
      icon: Droplets,
      current: 0,
      goal: 8,
      unit: "glasses",
      color: "sky-600",
      bgColor: "sky-50",
      borderColor: "sky-200",
    },
    {
      id: "exercise",
      name: "Exercise",
      icon: Dumbbell,
      current: 0,
      goal: 30,
      unit: "minutes",
      color: "orange-600",
      bgColor: "orange-50",
      borderColor: "orange-200",
    },
    {
      id: "sleep",
      name: "Sleep",
      icon: Moon,
      current: 0,
      goal: 8,
      unit: "hours",
      color: "purple-600",
      bgColor: "purple-50",
      borderColor: "purple-200",
    },
  ]);

  const [weeklyData, setWeeklyData] = useState<DailyRecord[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      const savedData = localStorage.getItem(`habits-${today}`);

      if (savedData) {
        const parsed = JSON.parse(savedData);
        setHabits((prev) =>
          prev.map((habit) => ({
            ...habit,
            current: parsed[habit.id] || 0,
          }))
        );
      }

      loadWeeklyData();
      calculateStreak();
      setIsLoaded(true);
    }
  }, []);

  // Save data whenever habits change (but only after initial load)
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      const habitData: { [key: string]: number } = {};
      habits.forEach((habit) => {
        habitData[habit.id] = habit.current;
      });
      localStorage.setItem(`habits-${today}`, JSON.stringify(habitData));

      // Recalculate streak and weekly data when habits change
      loadWeeklyData();
      calculateStreak();
    }
  }, [habits, isLoaded]);

  const loadWeeklyData = () => {
    if (typeof window === "undefined") return;

    const data: DailyRecord[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const savedData = localStorage.getItem(`habits-${dateStr}`);

      data.push({
        date: dateStr,
        habits: savedData ? JSON.parse(savedData) : {},
      });
    }
    setWeeklyData(data);
  };

  const calculateStreak = () => {
    if (typeof window === "undefined") return;

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const savedData = localStorage.getItem(`habits-${dateStr}`);

      if (savedData) {
        const data = JSON.parse(savedData);
        const allCompleted = Object.values(data).every(
          (val) => typeof val === "number" && val > 0
        );
        if (allCompleted) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    setCurrentStreak(streak);
  };

  const updateHabit = (id: string, delta: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              current: Math.max(0, Math.min(habit.goal, habit.current + delta)),
            }
          : habit
      )
    );
  };

  const getProgress = (current: number, goal: number) => {
    return Math.min(100, (current / goal) * 100);
  };

  const getTotalProgress = () => {
    const total = habits.reduce((sum, habit) => sum + habit.goal, 0);
    const current = habits.reduce((sum, habit) => sum + habit.current, 0);
    return Math.round((current / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-800 via-blue-700 to-cyan-700 bg-clip-text text-transparent">
            Daily Habit Tracker
          </h1>
          <p className="text-amber-800 text-xl">
            Track your daily habits and build consistency
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Today's Progress</p>
                  <p className="text-3xl font-bold text-amber-900">
                    {getTotalProgress()}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Current Streak</p>
                  <p className="text-3xl font-bold text-amber-900">
                    {currentStreak} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">This Week</p>
                  <p className="text-3xl font-bold text-amber-900">
                    {
                      weeklyData.filter((d) => Object.keys(d.habits).length > 0)
                        .length
                    }
                    /7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Habit Cards */}
        <div className="space-y-6">
          {habits.map((habit) => {
            const Icon = habit.icon;
            return (
              <Card
                key={habit.id}
                className="border-0 shadow-xl bg-white/95 overflow-hidden"
              >
                <div
                  className={`h-2 bg-gradient-to-r from-${habit.color} to-${habit.color}`}
                ></div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${habit.color} to-${habit.color} flex items-center justify-center shadow-xl`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-amber-900">
                          {habit.name}
                        </h3>
                        <p className="text-amber-700">
                          Goal: {habit.goal} {habit.unit}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`px-6 py-3 text-lg bg-${habit.bgColor} text-${habit.color} border-${habit.borderColor}`}
                    >
                      {habit.current} / {habit.goal}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <Progress
                      value={getProgress(habit.current, habit.goal)}
                      className={`h-4 bg-${habit.bgColor}`}
                    />

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateHabit(habit.id, -1);
                        }}
                        disabled={habit.current === 0}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-6 text-lg rounded-xl disabled:opacity-50"
                      >
                        <Minus className="w-5 h-5 mr-2" />
                        Decrease
                      </Button>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateHabit(habit.id, 1);
                        }}
                        disabled={habit.current >= habit.goal}
                        className={`flex-1 bg-gradient-to-r from-${habit.color} to-${habit.color} text-white py-6 text-lg rounded-xl disabled:opacity-50`}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Increase
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Overview */}
        <Card className="border-0 shadow-xl bg-white/95">
          <CardHeader>
            <CardTitle className="text-3xl text-amber-900">
              Weekly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day) => {
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const hasData = Object.keys(day.habits).length > 0;

                return (
                  <div
                    key={day.date}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
                  >
                    <p className="text-xs text-amber-700 mb-2">{dayName}</p>
                    <div
                      className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${
                        hasData
                          ? "bg-gradient-to-br from-emerald-400 to-green-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {hasData ? (
                        <span className="text-white text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
