/**
 * PrepQ Dashboard — Mock Data
 *
 * All values here are static placeholders.
 * Replace with API responses when the backend is ready.
 */

export const user = {
  name: 'Kanika',
  initials: 'K',
}

export const currentGoal = {
  title: 'Google Internship',
  daysRemaining: 126,
  progressPercent: 72,
  biggestGap: 'DSA',
}

export const todaysPlan = {
  focus: 'DSA',
  subtitle: "Complete today's DSA target",
  tasks: [
    { id: 1, label: 'Easy \u2014 Arrays', done: true },
    { id: 2, label: 'Medium \u2014 Trees', done: false },
    { id: 3, label: 'Medium \u2014 Graphs', done: false },
  ],
}

export const weeklyStats = [
  {
    id: 'leetcode',
    label: 'LeetCode',
    value: 8,
    total: 10,
    unit: 'Problems this week',
    trend: '+20%',
    trendUp: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 3,
    total: 4,
    unit: 'Commits this week',
    trend: '+12%',
    trendUp: true,
  },
  {
    id: 'consistency',
    label: 'Consistency',
    value: 5,
    total: 7,
    unit: 'Active days',
    trend: '5-day streak',
    trendUp: true,
  },
  {
    id: 'goal',
    label: 'Goal',
    value: 72,
    total: 100,
    unit: 'Overall progress',
    trend: '+6%',
    trendUp: true,
  },
]

export const focusDrift = {
  detected: true,
  activityDrop: 32,
  message:
    'Your DSA activity has decreased by 32% this month while project activity has increased. Your current goal requires stronger DSA progress.',
}

export const aiInsight = {
  text: 'Your overall activity is improving, but Graphs remain your biggest DSA weakness. Focus on Graph problems this week rather than increasing your total problem count.',
}
