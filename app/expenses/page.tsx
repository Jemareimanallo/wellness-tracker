"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PhilippinePeso,
  Plus,
  Trash2,
  TrendingUp,
  ShoppingBag,
  Coffee,
  Utensils,
  Car,
  Home,
  Heart,
  MoreHorizontal,
} from "lucide-react";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  timestamp: number;
}

const categories = [
  { name: "Food", icon: Utensils, color: "orange" },
  { name: "Transport", icon: Car, color: "blue" },
  { name: "Shopping", icon: ShoppingBag, color: "pink" },
  { name: "Coffee", icon: Coffee, color: "amber" },
  { name: "Bills", icon: Home, color: "purple" },
  { name: "Health", icon: Heart, color: "red" },
  { name: "Other", icon: MoreHorizontal, color: "gray" },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(1000);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load expenses from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedExpenses = localStorage.getItem("expenses");
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }

      const savedBudget = localStorage.getItem("budget");
      if (savedBudget) {
        setBudget(parseFloat(savedBudget));
      }

      setIsLoaded(true);
    }
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const addExpense = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description: description || category,
      date: new Date().toISOString().split("T")[0],
      timestamp: Date.now(),
    };

    setExpenses([newExpense, ...expenses]);
    setAmount("");
    setDescription("");
    setShowForm(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const getTodayTotal = () => {
    const today = new Date().toISOString().split("T")[0];
    return expenses
      .filter((e) => e.date === today)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getWeekTotal = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return expenses
      .filter((e) => new Date(e.date) >= weekAgo)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getMonthTotal = () => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    return expenses
      .filter((e) => e.date.startsWith(thisMonth))
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getCategoryBreakdown = () => {
    const breakdown: { [key: string]: number } = {};
    const today = new Date().toISOString().split("T")[0];

    expenses
      .filter((e) => e.date === today)
      .forEach((expense) => {
        breakdown[expense.category] =
          (breakdown[expense.category] || 0) + expense.amount;
      });

    return breakdown;
  };

  const todayTotal = getTodayTotal();
  const weekTotal = getWeekTotal();
  const monthTotal = getMonthTotal();
  const categoryBreakdown = getCategoryBreakdown();
  const budgetProgress = (monthTotal / budget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-amber-800 text-xl">
            Monitor your spending and stay on budget
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-amber-700">Today</p>
                <p className="text-3xl font-bold text-emerald-700">
                  ₱{todayTotal.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-amber-700">This Week</p>
                <p className="text-3xl font-bold text-sky-700">
                  ₱{weekTotal.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-amber-700">This Month</p>
                <p className="text-3xl font-bold text-purple-700">
                  ₱{monthTotal.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/95">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-amber-700">Budget Left</p>
                <p className="text-3xl font-bold text-orange-700">
                  ₱{(budget - monthTotal).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Progress */}
        <Card className="border-0 shadow-xl bg-white/95">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-amber-900">
                    Monthly Budget
                  </h3>
                  <p className="text-amber-700">
                    ₱{monthTotal.toFixed(2)} / ₱{budget.toFixed(2)}
                  </p>
                </div>
                <Badge
                  className={`px-6 py-3 text-lg ${
                    budgetProgress > 100
                      ? "bg-red-100 text-red-700"
                      : budgetProgress > 80
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {budgetProgress.toFixed(0)}%
                </Badge>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    budgetProgress > 100
                      ? "bg-gradient-to-r from-red-500 to-red-600"
                      : budgetProgress > 80
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "bg-gradient-to-r from-emerald-500 to-green-600"
                  }`}
                  style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Expense Button */}
        {!showForm && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-8 text-xl rounded-2xl shadow-xl"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add New Expense
          </Button>
        )}

        {/* Add Expense Form */}
        {showForm && (
          <Card className="border-0 shadow-xl bg-white/95">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-900">
                Add New Expense
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={addExpense}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Amount (₱)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-6 py-4 rounded-xl border-2 border-amber-200 focus:border-emerald-500 focus:outline-none text-lg"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setCategory(cat.name);
                            }}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              category === cat.name
                                ? `border-${cat.color}-500 bg-${cat.color}-50`
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 mx-auto mb-2 ${
                                category === cat.name
                                  ? `text-${cat.color}-600`
                                  : "text-gray-400"
                              }`}
                            />
                            <p
                              className={`text-xs font-semibold ${
                                category === cat.name
                                  ? `text-${cat.color}-700`
                                  : "text-gray-600"
                              }`}
                            >
                              {cat.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What did you buy?"
                      className="w-full px-6 py-4 rounded-xl border-2 border-amber-200 focus:border-emerald-500 focus:outline-none text-lg"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForm(false);
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 py-6 text-lg rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-6 text-lg rounded-xl"
                    >
                      Add Expense
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <Card className="border-0 shadow-xl bg-white/95">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-900">
                Today's Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown).map(([cat, amount]) => {
                  const categoryData = categories.find((c) => c.name === cat);
                  const Icon = categoryData?.icon || MoreHorizontal;
                  const percentage = (amount / todayTotal) * 100;

                  return (
                    <div
                      key={cat}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${categoryData?.color}-400 to-${categoryData?.color}-500 flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-amber-900">{cat}</p>
                          <p className="text-sm text-amber-700">
                            {percentage.toFixed(0)}% of today
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-amber-900">
                        ₱{amount.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Expenses */}
        <Card className="border-0 shadow-xl bg-white/95">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-900">
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <PhilippinePeso className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No expenses yet</p>
                <p className="text-gray-400">Start tracking your spending!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {expenses.slice(0, 10).map((expense) => {
                  const categoryData = categories.find(
                    (c) => c.name === expense.category
                  );
                  const Icon = categoryData?.icon || MoreHorizontal;

                  return (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${categoryData?.color}-400 to-${categoryData?.color}-500 flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-amber-900">
                            {expense.description}
                          </p>
                          <p className="text-sm text-amber-700">
                            {new Date(expense.date).toLocaleDateString()} •{" "}
                            {expense.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-2xl font-bold text-amber-900">
                          ₱{expense.amount.toFixed(2)}
                        </p>
                        <Button
                          type="button"
                          onClick={() => deleteExpense(expense.id)}
                          className="bg-red-100 text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
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
