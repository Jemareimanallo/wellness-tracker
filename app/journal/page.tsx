"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Smile,
  Meh,
  Frown,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  energy: string;
  notes: string;
  tags: string[];
  timestamp: number;
}

const moods = [
  { name: "Great", icon: Smile, color: "emerald", emoji: "😊" },
  { name: "Good", icon: Smile, color: "green", emoji: "🙂" },
  { name: "Okay", icon: Meh, color: "yellow", emoji: "😐" },
  { name: "Low", icon: Frown, color: "orange", emoji: "😔" },
  { name: "Bad", icon: Frown, color: "red", emoji: "😢" },
];

const energyLevels = [
  { name: "High", icon: BatteryFull, color: "emerald", value: 100 },
  { name: "Good", icon: BatteryFull, color: "green", value: 75 },
  { name: "Medium", icon: BatteryMedium, color: "yellow", value: 50 },
  { name: "Low", icon: BatteryLow, color: "orange", value: 25 },
  { name: "Empty", icon: Battery, color: "red", value: 0 },
];

const quickTags = [
  "Work",
  "Exercise",
  "Social",
  "Family",
  "Relaxation",
  "Study",
  "Health",
  "Creative",
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form state
  const [mood, setMood] = useState("Good");
  const [energy, setEnergy] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Load entries from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEntries = localStorage.getItem("journal-entries");
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      setIsLoaded(true);
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("journal-entries", JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const addEntry = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!mood || !energy) return;

    const newEntry: JournalEntry = {
      id: editingId || Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      mood,
      energy,
      notes: notes.trim(),
      tags: selectedTags,
      timestamp: Date.now(),
    };

    if (editingId) {
      setEntries(entries.map((e) => (e.id === editingId ? newEntry : e)));
      setEditingId(null);
    } else {
      setEntries([newEntry, ...entries]);
    }

    resetForm();
  };

  const resetForm = () => {
    setMood("Good");
    setEnergy("Medium");
    setNotes("");
    setSelectedTags([]);
    setShowForm(false);
    setEditingId(null);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const editEntry = (entry: JournalEntry) => {
    setMood(entry.mood);
    setEnergy(entry.energy);
    setNotes(entry.notes);
    setSelectedTags(entry.tags);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getMoodStats = () => {
    const stats: { [key: string]: number } = {};
    entries.forEach((entry) => {
      stats[entry.mood] = (stats[entry.mood] || 0) + 1;
    });
    return stats;
  };

  const todayEntry = entries.find(
    (e) => e.date === new Date().toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-rose-800 via-pink-700 to-purple-700 bg-clip-text text-transparent">
            Mood & Energy Journal
          </h1>
          <p className="text-amber-800 text-xl">
            Track your daily mood and energy levels
          </p>
        </div>

        {/* Today's Status */}
        {todayEntry && !showForm && (
          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">
                    {moods.find((m) => m.name === todayEntry.mood)?.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-900">
                      Today's Check-in
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="px-4 py-2 bg-rose-100 text-rose-700">
                        Mood: {todayEntry.mood}
                      </Badge>
                      <Badge className="px-4 py-2 bg-purple-100 text-purple-700">
                        Energy: {todayEntry.energy}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => editEntry(todayEntry)}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-6 rounded-xl"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Entry Button */}
        {!showForm && !todayEntry && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-8 text-xl rounded-2xl shadow-xl"
          >
            <Plus className="w-6 h-6 mr-2" />
            Create Today's Entry
          </Button>
        )}

        {/* Entry Form */}
        {showForm && (
          <Card className="border-0 shadow-xl bg-white/95">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-900">
                {editingId ? "Edit Entry" : "New Journal Entry"}
              </CardTitle>
              <p className="text-amber-700">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={addEntry}>
                {/* Mood Selection */}
                <div>
                  <label className="block text-lg font-semibold text-amber-900 mb-4">
                    How are you feeling?
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {moods.map((m) => (
                      <button
                        key={m.name}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setMood(m.name);
                        }}
                        className={`p-6 rounded-2xl border-2 transition-all ${
                          mood === m.name
                            ? `border-${m.color}-500 bg-${m.color}-50`
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="text-4xl mb-2">{m.emoji}</div>
                        <p
                          className={`text-sm font-semibold ${
                            mood === m.name
                              ? `text-${m.color}-700`
                              : "text-gray-600"
                          }`}
                        >
                          {m.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Energy Selection */}
                <div>
                  <label className="block text-lg font-semibold text-amber-900 mb-4">
                    What's your energy level?
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {energyLevels.map((e) => {
                      const Icon = e.icon;
                      return (
                        <button
                          key={e.name}
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            setEnergy(e.name);
                          }}
                          className={`p-6 rounded-2xl border-2 transition-all ${
                            energy === e.name
                              ? `border-${e.color}-500 bg-${e.color}-50`
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <Icon
                            className={`w-10 h-10 mx-auto mb-2 ${
                              energy === e.name
                                ? `text-${e.color}-600`
                                : "text-gray-400"
                            }`}
                          />
                          <p
                            className={`text-sm font-semibold ${
                              energy === e.name
                                ? `text-${e.color}-700`
                                : "text-gray-600"
                            }`}
                          >
                            {e.name}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-lg font-semibold text-amber-900 mb-4">
                    Add tags (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleTag(tag);
                        }}
                        className={`px-6 py-3 rounded-full border-2 transition-all ${
                          selectedTags.includes(tag)
                            ? "border-purple-500 bg-purple-100 text-purple-700"
                            : "border-gray-200 bg-white text-gray-600"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-lg font-semibold text-amber-900 mb-4">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How was your day? What happened?"
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl border-2 border-amber-200 focus:border-rose-500 focus:outline-none text-lg resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      resetForm();
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-6 text-lg rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-6 text-lg rounded-xl"
                  >
                    {editingId ? "Update Entry" : "Save Entry"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Mood Statistics */}
        {entries.length > 0 && (
          <Card className="border-0 shadow-xl bg-white/95">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-900">
                Mood Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(getMoodStats()).map(([moodName, count]) => {
                  const moodData = moods.find((m) => m.name === moodName);
                  const percentage = (count / entries.length) * 100;

                  return (
                    <div key={moodName} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{moodData?.emoji}</span>
                          <span className="font-semibold text-amber-900">
                            {moodName}
                          </span>
                        </div>
                        <span className="text-amber-700">
                          {count} times ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${moodData?.color}-400 to-${moodData?.color}-600`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Past Entries */}
        <Card className="border-0 shadow-xl bg-white/95">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-900">
              Past Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No entries yet</p>
                <p className="text-gray-400">Start journaling today!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => {
                  const moodData = moods.find((m) => m.name === entry.mood);
                  const energyData = energyLevels.find(
                    (e) => e.name === entry.energy
                  );
                  const EnergyIcon = energyData?.icon || Battery;

                  return (
                    <div
                      key={entry.id}
                      className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border border-rose-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{moodData?.emoji}</div>
                          <div>
                            <p className="font-bold text-amber-900 text-lg">
                              {new Date(entry.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className="px-3 py-1 bg-rose-100 text-rose-700 text-sm">
                                {entry.mood}
                              </Badge>
                              <Badge className="px-3 py-1 bg-purple-100 text-purple-700 text-sm flex items-center gap-1">
                                <EnergyIcon className="w-3 h-3" />
                                {entry.energy}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => editEntry(entry)}
                            className="bg-blue-100 text-blue-600 p-2 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => deleteEntry(entry.id)}
                            className="bg-red-100 text-red-600 p-2 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/60 rounded-full text-sm text-purple-700 border border-purple-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.notes && (
                        <p className="text-amber-800 leading-relaxed">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
