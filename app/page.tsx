"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Droplets,
  Dumbbell,
  Moon,
  PhilippinePeso,
  Heart,
  Activity,
  Sparkles,
  TrendingUp,
  Globe,
  Leaf,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [habits, setHabits] = useState({ water: 0, exercise: 0, sleep: 0 });
  const [todayExpenses, setTodayExpenses] = useState(0);
  const [hasJournalEntry, setHasJournalEntry] = useState(false);

  useEffect(() => {
    // Load habits data
    const today = new Date().toISOString().split("T")[0];
    const savedHabits = localStorage.getItem(`habits-${today}`);
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }

    // Load expenses data
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      const expenses = JSON.parse(savedExpenses);
      const todayTotal = expenses
        .filter((e: any) => e.date === today)
        .reduce((sum: number, e: any) => sum + e.amount, 0);
      setTodayExpenses(todayTotal);
    }

    // Load journal data
    const savedJournal = localStorage.getItem("journal-entries");
    if (savedJournal) {
      const entries = JSON.parse(savedJournal);
      const todayEntry = entries.find((e: any) => e.date === today);
      setHasJournalEntry(!!todayEntry);
    }
  }, []);

  const getHabitProgress = () => {
    const total = 8 + 30 + 8; // water + exercise + sleep goals
    const current = habits.water + habits.exercise + habits.sleep;
    return Math.round((current / total) * 100);
  };

  const habitProgress = getHabitProgress();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-emerald-300/15 to-teal-300/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 py-16">
          <div className="inline-block mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center shadow-2xl">
              <Leaf className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-amber-900 via-orange-800 to-rose-900 bg-clip-text text-transparent leading-tight">
              Your Wellness Journey
            </h1>
            <div className="flex justify-center gap-2">
              <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              <div className="h-1.5 w-20 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
              <div className="h-1.5 w-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
            </div>
          </div>

          <p className="text-amber-900/80 text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Nurture your mind, body, and wallet in one beautiful space
          </p>

          <div className="flex justify-center gap-4 flex-wrap mt-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 text-base shadow-2xl border-0">
              <Globe className="w-5 h-5 mr-2" />
              SDG 3: Good Health
            </Badge>
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 text-base shadow-2xl border-0">
              <Heart className="w-5 h-5 mr-2" />
              Self-Care
            </Badge>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 text-base shadow-2xl border-0">
              <TrendingUp className="w-5 h-5 mr-2" />
              Daily Growth
            </Badge>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Habits Card */}
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500"></div>

            <CardHeader className="pb-6 relative pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center gap-2 bg-sky-100/80 px-5 py-2.5 rounded-full border border-sky-200">
                  <Zap className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-bold text-sky-700">
                    {habitProgress}% Complete
                  </span>
                </div>
              </div>
              <CardTitle className="text-3xl text-amber-900 font-bold mb-2">
                Today's Habits
              </CardTitle>
              <CardDescription className="text-base text-amber-700/80">
                Track your daily wellness goals
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 relative pb-8">
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50/80 to-blue-50/80 border border-sky-200/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-xl">
                        <Droplets className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-amber-900 text-lg block">
                          Water Intake
                        </span>
                        <span className="text-sm text-amber-600/80">
                          Goal: 8 glasses
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-3xl text-sky-700">
                      {habits.water}
                    </span>
                  </div>
                  <Progress
                    value={(habits.water / 8) * 100}
                    className="h-2.5 bg-sky-200/50"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50/80 to-red-50/80 border border-orange-200/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-xl">
                        <Dumbbell className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-amber-900 text-lg block">
                          Exercise
                        </span>
                        <span className="text-sm text-amber-600/80">
                          Goal: 30 minutes
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-3xl text-orange-700">
                      {habits.exercise}
                    </span>
                  </div>
                  <Progress
                    value={(habits.exercise / 30) * 100}
                    className="h-2.5 bg-orange-200/50"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border border-purple-200/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-xl">
                        <Moon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-amber-900 text-lg block">
                          Sleep
                        </span>
                        <span className="text-sm text-amber-600/80">
                          Goal: 8 hours
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-3xl text-purple-700">
                      {habits.sleep}
                    </span>
                  </div>
                  <Progress
                    value={(habits.sleep / 8) * 100}
                    className="h-2.5 bg-purple-200/50"
                  />
                </div>
              </div>

              <Link href="/habits" className="block mt-8">
                <Button className="w-full bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-600 text-white shadow-2xl text-lg py-8 rounded-2xl font-semibold border-0">
                  View Details <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>

            <CardHeader className="pb-6 relative pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 flex items-center justify-center shadow-2xl">
                  <PhilippinePeso className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center gap-2 bg-emerald-100/80 px-5 py-2.5 rounded-full border border-emerald-200">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-700">
                    {todayExpenses === 0 ? "Perfect!" : "Tracking"}
                  </span>
                </div>
              </div>
              <CardTitle className="text-3xl text-amber-900 font-bold mb-2">
                Today's Expenses
              </CardTitle>
              <CardDescription className="text-base text-amber-700/80">
                Monitor your daily spending
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 relative pb-8">
              <div className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-green-50/80 to-teal-50/80 border border-emerald-200/50 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative">
                  <div className="text-7xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-5">
                    ₱{todayExpenses.toFixed(2)}
                  </div>
                  <p className="text-amber-800 font-semibold text-xl mb-8">
                    Total spent today
                  </p>
                  {todayExpenses === 0 && (
                    <div className="inline-flex items-center gap-3 text-base text-emerald-900 bg-white/90 backdrop-blur px-7 py-3.5 rounded-full border border-emerald-300/50 shadow-xl">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold">Perfect saving streak!</span>
                    </div>
                  )}
                </div>
              </div>

              <Link href="/expenses" className="block">
                <Button className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white shadow-2xl text-lg py-8 rounded-2xl font-semibold border-0">
                  Manage Expenses <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Journal Card */}
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500"></div>

            <CardHeader className="pb-6 relative pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-2xl">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center gap-2 bg-rose-100/80 px-5 py-2.5 rounded-full border border-rose-200">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span className="text-sm font-bold text-rose-700">
                    {hasJournalEntry ? "Done!" : "Start Now"}
                  </span>
                </div>
              </div>
              <CardTitle className="text-3xl text-amber-900 font-bold mb-2">
                Mood & Energy
              </CardTitle>
              <CardDescription className="text-base text-amber-700/80">
                Check in with yourself daily
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 relative pb-8">
              <div className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-rose-50/80 via-pink-50/80 to-purple-50/80 border border-rose-200/50 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-rose-400/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-400/10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Heart className="w-14 h-14 text-white animate-pulse" />
                  </div>
                  <p className="text-amber-900 font-bold text-xl mb-4">
                    {hasJournalEntry ? "Entry recorded!" : "No entry yet"}
                  </p>
                  <p className="text-amber-700/80 text-base">
                    {hasJournalEntry
                      ? "View your journal entry"
                      : "Start your wellness journey today"}
                  </p>
                </div>
              </div>

              <Link href="/journal" className="block">
                <Button className="w-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white shadow-2xl text-lg py-8 rounded-2xl font-semibold border-0">
                  Open Journal <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* SDG Connection */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>

          <CardHeader className="pb-8 relative pt-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 flex items-center justify-center shadow-2xl">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl text-amber-900 font-bold">
                Connection to UN SDGs
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-10 relative pb-10">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-green-50/80 to-teal-50/80 border border-emerald-300/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full -mr-24 -mt-24"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-400/10 rounded-full -ml-20 -mb-20"></div>
              <div className="relative">
                <h3 className="font-bold text-3xl mb-6 text-emerald-900 flex items-center gap-4">
                  <span className="text-6xl">🎯</span>
                  SDG 3: Good Health and Well-being
                </h3>
                <p className="text-amber-900/90 leading-relaxed text-lg font-medium">
                  This application promotes healthy routines, financial
                  awareness, and emotional well-being through daily organization
                  and self-monitoring. By tracking your habits, expenses, and
                  mood, you're taking active steps toward a healthier, more
                  balanced life.
                </p>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Badge className="px-8 py-4 text-base bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl border-0">
                <Activity className="w-5 h-5 mr-2" />
                Health Tracking
              </Badge>
              <Badge className="px-8 py-4 text-base bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xl border-0">
                <PhilippinePeso className="w-5 h-5 mr-2" />
                Financial Wellness
              </Badge>
              <Badge className="px-8 py-4 text-base bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl border-0">
                <Heart className="w-5 h-5 mr-2" />
                Mental Health
              </Badge>
              <Badge className="px-8 py-4 text-base bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl border-0">
                <Sparkles className="w-5 h-5 mr-2" />
                Self-Care
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
