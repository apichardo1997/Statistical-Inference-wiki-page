import React, { useMemo, useState } from 'react';
import { 
  Flame, 
  Clock3, 
  Target, 
  CheckCircle2, 
  BookOpenCheck, 
  ListChecks, 
  Lightbulb, 
  BookMarked, 
  ArrowLeftCircle, 
  ArrowRightCircle,
  Sparkles
} from 'lucide-react';

const dayPlan = [
  {
    label: 'Days 1-2',
    focus: 'Prereq refresh + glossary',
    goals: [
      'Expectation/variance rules, CLT + Slutsky intuition, Delta method',
      'Normal, t, chi-square, F; Bernoulli/Binomial, Poisson cheat sheet',
      'Set up a glossary and 1-page prereq sheet'
    ],
    practice: 'Simulate draws, compute likelihoods by hand and in code.'
  },
  {
    label: 'Days 3-4',
    focus: 'Estimators + likelihood basics',
    goals: [
      'Bias/variance/MSE; consistency vs asymptotic normality',
      'Method of moments vs MLE; regularity conditions',
      'Score/Hessian practice on a simple model'
    ],
    practice: 'Derive the MLE for Bernoulli/Binomial/Poisson and check numerically.'
  },
  {
    label: 'Days 5-6',
    focus: 'Sufficiency + information',
    goals: [
      'Factorization theorem and minimal sufficiency examples',
      'Exponential family structure; natural/canonical links',
      'Fisher information and Cramér–Rao lower bound'
    ],
    practice: 'Work one proof walkthrough and one numeric example for Fisher info.'
  },
  {
    label: 'Days 7-8',
    focus: 'Confidence intervals',
    goals: [
      'Wald, score, likelihood-ratio intervals; pivots vs asymptotics',
      'Bootstrap percentile/basic intervals; coverage intuition',
      'Connection to Delta method and variance stabilizing transforms'
    ],
    practice: 'Implement a quick bootstrap CI and compare to an asymptotic CI.'
  },
  {
    label: 'Days 9-10',
    focus: 'Hypothesis tests + power',
    goals: [
      'Neyman–Pearson, likelihood-ratio/Wald/score tests',
      'Type I/II error, power curves, sample size knobs',
      'p-values vs evidence; multiple testing heuristics (FDR idea)'
    ],
    practice: 'Compute power for a simple z/t test; sketch rejection regions.'
  },
  {
    label: 'Days 11-12',
    focus: 'Asymptotics toolkit',
    goals: [
      'Delta method and Slutsky in worked examples',
      'Asymptotic normality of MLE; sandwich variance idea',
      'What breaks: weak instruments, near-nonidentifiability'
    ],
    practice: 'Redo a CI/test using the Delta method to see the approximation.'
  },
  {
    label: 'Days 13-14',
    focus: 'Past finals + mistakes log',
    goals: [
      'Do timed blocks of past-final problems by topic',
      'Maintain a mistakes log (assumption → error → fix)',
      'Build the exam playbook outline from your logs'
    ],
    practice: 'Two 60–75 minute timed blocks with immediate post-mortem.'
  },
  {
    label: 'Day 15',
    focus: 'Mock exam + light review',
    goals: [
      'Full timed mock using a past final',
      'Tighten formula sheet and pitfalls list',
      'Short spaced review of weak spots'
    ],
    practice: 'One full mock + 30 minutes of flash review only.'
  }
];

const prereqs = [
  'Probability: expectation/variance rules, independence, CLT/LLN intuition, convergence types',
  'Distributions: Normal, t, chi-square, F, Bernoulli/Binomial, Poisson; how to get quantiles and moments',
  'Calculus/linear algebra: Taylor expansions near the MLE, gradients/Hessians, matrix inverses/determinants',
  'Regression basics: interpreting coefficients, residual diagnostics, variance of estimates',
  'Coding: simulate data, maximize a log-likelihood, run a bootstrap quickly'
];

const quickActions = [
  { title: 'Add a problem to the bank', detail: 'Paste from lecture/final; tag topic + status.' },
  { title: 'Log a mistake', detail: 'What you assumed, what was wrong, how to catch it next time.' },
  { title: 'Set today’s drill', detail: '1 concept + 1 worked example + 2 problems minimum.' }
];

const resourcePointers = [
  { label: 'Lecture notes & papers', note: 'Primary reference; annotate where each concept lives.' },
  { label: 'Past finals', note: 'Use on Days 13–15 for mocks; tag by topic in the Problem Bank.' },
  { label: 'Textbook chapters', note: 'Map to topics (e.g., C&B ch. 5–10) and link from concept pages.' }
];

const rituals = [
  'Before: pick the day focus and one practice block.',
  'During: write a 3-line concept summary before solving.',
  'After: log at least one mistake; add a pitfall to review on Days 7/11/15.'
];

const StudyDashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = dayPlan[activeIndex];

  const progress = useMemo(() => Math.round(((activeIndex + 1) / dayPlan.length) * 100), [activeIndex]);

  return (
    <section className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-gradient-to-br from-brand-50 via-white to-white border border-brand-100 rounded-xl shadow-sm flex items-center gap-3">
          <Flame className="w-5 h-5 text-brand-700" />
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-700 font-semibold">Sprint</p>
            <p className="text-lg font-semibold text-gray-900">15-day plan</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center gap-3">
          <Clock3 className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Today’s focus</p>
            <p className="text-lg font-semibold text-gray-900">{activePlan.focus}</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Progress</p>
            <p className="text-lg font-semibold text-gray-900">{progress}% of plan</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Minimum today</p>
            <p className="text-lg font-semibold text-gray-900">1 concept • 2 problems</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Active day</p>
              <h3 className="text-2xl font-bold text-gray-900">{activePlan.label}: {activePlan.focus}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition"
                aria-label="Previous day"
              >
                <ArrowLeftCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveIndex(Math.min(dayPlan.length - 1, activeIndex + 1))}
                className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition"
                aria-label="Next day"
              >
                <ArrowRightCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-brand-700" />
                <p className="text-sm font-semibold text-gray-900">Goals</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {activePlan.goals.map((goal, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-brand-600 mt-0.5">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpenCheck className="w-4 h-4 text-brand-700" />
                <p className="text-sm font-semibold text-gray-900">Practice</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{activePlan.practice}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 transition-all" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Move one step each session; revisit mistakes on Days 7, 11, and 15.</p>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h4 className="text-lg font-semibold text-gray-900">Quick actions</h4>
          </div>
          <ul className="space-y-3">
            {quickActions.map((item, idx) => (
              <li key={idx} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </li>
            ))}
          </ul>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Mistakes log</p>
              <p className="text-sm text-emerald-700">Capture: assumption → error → fix. Review on Days 7, 11, 15.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-5 h-5 text-brand-700" />
            <h4 className="text-lg font-semibold text-gray-900">Prereqs to skim first</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {prereqs.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-brand-600 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-brand-700" />
            <h4 className="text-lg font-semibold text-gray-900">Problem bank workflow</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-brand-600 mt-0.5">1.</span>
              <span>Tag every problem by topic and status (unseen/in-progress/solved).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-600 mt-0.5">2.</span>
              <span>Write a start hint before looking at solutions; add a post-mortem after.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-600 mt-0.5">3.</span>
              <span>Promote weak areas into the next day’s focus and into the playbook.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BookMarked className="w-5 h-5 text-brand-700" />
            <h4 className="text-lg font-semibold text-gray-900">Resources + rituals</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {resourcePointers.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-brand-600 mt-0.5">•</span>
                <span><span className="font-semibold text-gray-900">{item.label}:</span> {item.note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Session ritual</p>
            <ul className="space-y-1 text-sm text-gray-700">
              {rituals.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-brand-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-brand-700" />
          <h4 className="text-lg font-semibold text-gray-900">Full 15-day roadmap</h4>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {dayPlan.map((item, idx) => (
            <div key={idx} className={`p-3 rounded-lg border text-sm ${idx === activeIndex ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-white'}`}>
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{item.label}</p>
              <p className="text-sm font-semibold text-gray-900">{item.focus}</p>
              <p className="text-xs text-gray-600 mt-1">{item.practice}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyDashboard;
