import React, { useMemo } from 'react';
import { 
  Flame,
  Clock3,
  Target,
  CheckCircle2,
  BookOpenCheck,
  ListChecks,
  BookMarked,
  Sparkles,
  MapPin,
  ArrowRight,
  NotebookPen,
  ClipboardList,
  ChevronRight
} from 'lucide-react';

interface StudyDashboardProps {
  onNavigate?: (id: string) => void;
}

const todayDay = 1; // simple configurable knob

const dayEntries = [
  { day: 1, title: 'Prereqs: probability refresh', actions: ['Expectation/variance rules', 'CLT/LLN intuition', 'Start glossary'], sectionId: '0.3' },
  { day: 2, title: 'Prereqs: distribution kit', actions: ['Normal/t/chi-square/F', 'Bernoulli/Binomial, Poisson', 'Quantiles + moments'], sectionId: '0.3' },
  { day: 3, title: 'Estimators & likelihoods', actions: ['Score/Hessian reps', 'Bias/variance/MSE', 'Solve one MLE by hand'], sectionId: '4.1' },
  { day: 4, title: 'Estimators drills', actions: ['Consistency vs asymptotic normal', 'Regularity checks', 'Code a simple MLE'], sectionId: '4.1' },
  { day: 5, title: 'Sufficiency & info', actions: ['Factorization theorem', 'Exponential family shape', 'Fisher info example'], sectionId: '4.1' },
  { day: 6, title: 'Confidence intervals', actions: ['Wald vs score vs LR', 'Bootstrap percentile/basic', 'Note assumptions'], sectionId: '4.2' },
  { day: 7, title: 'CIs + mistakes review', actions: ['Coverage intuition', 'Delta method tie-in', 'Review mistakes log'], sectionId: '4.2' },
  { day: 8, title: 'Hypothesis tests', actions: ['Neyman–Pearson', 'LR/Wald/score regions', 'Power curve sketch'], sectionId: '4.3' },
  { day: 9, title: 'Power + multiple testing', actions: ['Type I/II knobs', 'Bonferroni vs FDR idea', 'One power calc'], sectionId: '4.3' },
  { day: 10, title: 'Asymptotics toolkit', actions: ['Slutsky, Delta method', 'Asymptotic normality of MLE', 'Sandwich SE idea'], sectionId: '4.4' },
  { day: 11, title: 'Regression fit & bias/variance', actions: ['Overfitting intuition', 'Bias-variance trade-off', 'Cross-validation idea'], sectionId: '1.1' },
  { day: 12, title: 'GLMs & predictive accuracy', actions: ['GLM structure', 'Logistic/Poisson links', 'K-fold vs LOOCV'], sectionId: '1.2' },
  { day: 13, title: 'Penalization', actions: ['L0/AIC/BIC/EBIC', 'LASSO vs Ridge', 'Model selection consistency'], sectionId: '2.1' },
  { day: 14, title: 'Bayesian regression', actions: ['Priors & shrinkage', 'BMA basics', 'Spike-and-slab intuition'], sectionId: '3.1' },
  { day: 15, title: 'Exam playbook & mock', actions: ['Strategy + timing', 'Formula/pitfall sheet', 'Timed mock'], sectionId: '6.1' }
];

const tracks = [
  { title: 'Foundations', desc: 'Prereqs and regression fit basics before diving into inference.', progress: 30, sectionId: '1.1' },
  { title: 'Core Inference Toolkit', desc: 'Estimators, CIs, tests, and asymptotics for the exam core.', progress: 10, sectionId: '4.1' },
  { title: 'Exam Playbook', desc: 'Timing, formula/pitfall sheet, and mistakes review habits.', progress: 0, sectionId: '6.1' }
];

const StudyDashboard: React.FC<StudyDashboardProps> = ({ onNavigate }) => {
  const todayEntry = useMemo(() => dayEntries.find(d => d.day === todayDay) ?? dayEntries[0], []);

  const getStatus = (day: number) => {
    if (day < todayDay) return { label: 'done', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
    if (day === todayDay) return { label: 'today', color: 'text-brand-700 bg-brand-50 border-brand-100' };
    return { label: 'up next', color: 'text-gray-600 bg-gray-50 border-gray-100' };
  };

  const handleNavigate = (id: string) => {
    if (onNavigate) onNavigate(id);
  };

  return (
    <section className="space-y-8">
      {/* Hero */}
      <div className="p-6 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-brand-700 font-semibold mb-1">Stat Inference Sprint</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Stat Inference Sprint</h1>
          <p className="text-base text-gray-700 mt-2">15-day self-study hub</p>
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-brand-600" />
            Today is Day {todayEntry.day} of 15
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="px-3 py-2 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-gray-900">Keep a streak</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="font-semibold text-gray-900">1 concept · 2 problems</span>
          </div>
        </div>
      </div>

      {/* Today’s Focus */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-brand-700" />
            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Today’s focus</p>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Day {todayEntry.day}: {todayEntry.title}</h3>
          <ul className="space-y-1 text-sm text-gray-700 mb-4">
            {todayEntry.actions.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-brand-600 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleNavigate(todayEntry.sectionId)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold shadow hover:bg-brand-700 transition"
            >
              Go to lesson
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavigate('6.4')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:border-brand-200 hover:text-brand-700 transition"
            >
              Open practice
              <NotebookPen className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-brand-700" />
            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Quick checklist</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
            <span>Skim the concept page first; write a 3-sentence summary.</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
            <span>Do at least 2 practice problems; tag them by topic.</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
            <span>Log one mistake (assumption → error → fix) for review.</span>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-700" />
          <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Tracks</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tracks.map((track) => (
            <div key={track.title} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">{track.title}</h4>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">{track.progress}%</span>
              </div>
              <p className="text-sm text-gray-700">{track.desc}</p>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600" style={{ width: `${track.progress}%` }} />
              </div>
              <button
                onClick={() => handleNavigate(track.sectionId)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 15-Day Map + Practice/Mistakes */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-brand-700" />
            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">15-day map</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto custom-scroll">
            {dayEntries.map((entry) => {
              const status = getStatus(entry.day);
              return (
                <button
                  key={entry.day}
                  onClick={() => handleNavigate(entry.sectionId)}
                  className="w-full text-left p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand-200 hover:bg-white transition shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Day {entry.day}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{entry.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <NotebookPen className="w-5 h-5 text-brand-700" />
              <p className="text-sm font-semibold text-gray-900">Problem Bank</p>
            </div>
            <p className="text-sm text-gray-700 mb-3">Tag problems by topic and status; add start hints and post-mortems.</p>
            <button
              onClick={() => handleNavigate('6.4')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
            >
              Open Problem Bank
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList className="w-5 h-5 text-amber-600" />
              <p className="text-sm font-semibold text-gray-900">Mistakes Log</p>
            </div>
            <p className="text-sm text-gray-700 mb-3">Assumption → error → fix. Revisit on Days 7, 11, 15.</p>
            <button
              onClick={() => handleNavigate('6.3')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
            >
              Open Mistakes Log
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyDashboard;
