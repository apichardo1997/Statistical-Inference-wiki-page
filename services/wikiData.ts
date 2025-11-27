import { Chapter } from '../types';

export const wikiContent: Chapter[] = [
  {
    id: '0',
    title: '0. Start Here',
    subSections: [
      {
        id: '0.1',
        title: '0.1 Study Dashboard',
        content: `
          Your hub for the 15-day sprint. Use the plan to pick today's focus, keep a simple mistakes log, and skim prereqs before diving into problems.
        `
      },
      {
        id: '0.2',
        title: '0.2 How to Use This Wiki',
        content: `
          - Start every session on the dashboard: pick today's focus and one practice set.
          - Skim the related concept page first; write a 3-sentence summary in your own words.
          - Do 1-2 worked examples before attempting a past-final problem.
          - Log every mistake (what you assumed, what was wrong, the fix); revisit the log on Days 7, 11, 15.
          - End with a 3-bullet recap (facts, pitfalls, one open question).
          
          **Daily minimum:** 1 concept, 1 worked example, 2 problems, 1 mistake logged.
        `
      },
      {
        id: '0.3',
        title: '0.3 Prereq Crash Course',
        content: `
          - Probability refresh: expectation/variance rules, covariance, CLT/LLN intuition, Slutsky, Delta method basics.
          - Distribution kit: Normal/t, chi-square/F, Bernoulli/Binomial, Poisson; how to get means/variances/quantiles.
          - Calculus/algebra: Taylor expansions around the MLE, gradients/Hessians, matrix identities (Woodbury, Schur complement).
          - Asymptotics vocabulary: convergence in probability vs distribution, consistency, rate n^{-1/2}.
          - R/Python comfort: simulate from distributions, estimate via maximum likelihood, bootstrap with resampling.
          
          Build a 1-page cheat sheet for these before Day 3; link it from the dashboard.
        `
      }
    ]
  },
  {
    id: '1',
    title: '1. Fundamentals of Regression',
    subSections: [
      {
        id: '1.1',
        title: '1.1 Overfitting',
        content: `
          A fundamental issue in this course is addressing challenges caused by working with models that have many parameters. 
          
          Consider a situation where we observe a single continuous outcome y and a single continuous covariate x. 
          Suppose the true model is unknown to us: y = sin(2πx) + ε, where ε ~ N(0, 0.2²).
          
          When fitting polynomials of degree d-1:
          - Degree 0 or 1: Misses the signal (Underfitting).
          - Degree 3: Provides a decent fit.
          - Degree 9: Provides perfect prediction for observed data but is "wigglier" than the truth (Overfitting).
          
          **Key Insight:** In-sample error (training error) can severely overestimate prediction accuracy. A complex model (high d) may have 0 residual standard deviation but high Mean Squared Prediction Error (MSPE) on test data.
        `,
        equations: [
            { label: 'True Model', formula: String.raw`y_i = \sin(2\pi x_i) + \epsilon_i` }
        ]
      },
      {
        id: '1.2',
        title: '1.2 Generalized Linear Models',
        content: `
          Generalized linear models (GLMs) extend linear regression to settings where the outcome is not Gaussian (e.g., binary, count data).
          
          A regression model is a GLM if:
          1. The distribution of y|x belongs to the exponential family (Gaussian, Bernoulli, Poisson, etc.).
          2. The dependence of y on x is a one-to-one function of the linear predictor.
          3. The variance is a function of the mean.
          
          **Common Examples:**
          - **Logistic Regression:** For binary outcomes. Uses the logit link function.
          - **Poisson Regression:** For count outcomes. Uses the log link function.
          
          An important property of GLMs is that the log-likelihood function is concave (provided the canonical link function is used), facilitating optimization.
        `,
         equations: [
            { label: 'GLM Structure', formula: String.raw`g(E(y_i|x_i)) = x_i^T\beta` },
            { label: 'Logistic Link', formula: String.raw`\log\!\left(\frac{\pi_i}{1-\pi_i}\right) = x_i^T\beta` }
        ]
      },
      {
        id: '1.3',
        title: '1.3 Bias-Variance Trade-off',
        content: `
          The mean squared prediction error (MSPE) can be decomposed into three terms:
          
          1. **Intrinsic Variance:** V(Y), noise we cannot control.
          2. **Variance of the estimator:** Increases with model complexity (more parameters).
          3. **Squared Bias:** Decreases with model complexity.
          
          **The Trade-off:** Simple models have high bias but low variance. Complex models have low bias but high variance. High-dimensional statistics aims to optimize this trade-off.
        `,
        equations: [
            { label: 'MSPE Decomposition', formula: String.raw`E[(Y - \hat{m})^2] = V(Y) + V(\hat{m}) + \text{Bias}^2(\hat{m})` }
        ]
      },
      {
        id: '1.4',
        title: '1.4 Estimating Predictive Accuracy',
        content: `
          To assess predictive accuracy without bias, we use out-of-sample estimates.
          
          **K-fold Cross-Validation (CV):**
          1. Divide n observations into K subsets.
          2. For each k, fit the model using all data except subset k.
          3. Predict for subset k and calculate error.
          
          **Leave-one-out CV (LOOCV):** A special case where K=n. It has higher computational cost but estimates error using n-1 observations.
        `
      }
    ]
  },
  {
    id: '2',
    title: '2. Penalized Likelihood',
    subSections: [
      {
        id: '2.1',
        title: '2.1 L0 Penalties',
        content: `
          Penalized likelihood adds a penalty term to the log-likelihood to discourage complex models.
          
          **L0 Penalty:** Penalizes based on the number of non-zero coefficients.
          It corresponds to the "Best Subset" problem. While ideal theoretically, it requires solving a discrete optimization problem which is computationally hard for large d.
          
          **Criteria:**
          - **AIC:** approx to LOOCV. Not model selection consistent.
          - **BIC:** approx to Bayesian model selection. Model selection consistent if d << sqrt(n).
          - **EBIC:** Extended BIC for high-dimensional settings (large d).
        `,
        equations: [
             { label: 'Optimization', formula: String.raw`\hat{\theta} = \arg\max \big[ \log p(y|\theta) - r(\theta) \big]` },
             { label: 'BIC', formula: String.raw`-2 \log p(y|\theta) + \log(n)\,|\beta|_0` }
        ]
      },
      {
        id: '2.2',
        title: '2.2 Convex Penalties (LASSO & Ridge)',
        content: `
          To avoid the computational burden of L0, we use convex penalties.
          
          **Ridge Regression (L2):** Adds a penalty on the squared magnitude of coefficients.
          - Strictly convex, unique solution.
          - Shrinks coefficients towards zero but does not set them exactly to zero.
          
          **LASSO (L1):** Adds a penalty on the absolute value of coefficients.
          - Can produce exact zeros (Variable Selection).
          - Solution is not always unique if d > n.
          - Corresponds to a double-exponential (Laplace) prior in Bayesian terms.
        `,
        equations: [
            { label: 'LASSO', formula: String.raw`- \log p(y|\theta) + \lambda |\beta|_1` },
            { label: 'Ridge', formula: String.raw`- \log p(y|\theta) + \lambda |\beta|_2^2` }
        ]
      },
      {
        id: '2.5',
        title: '2.5 Model Selection Consistency',
        content: `
          An estimator is model selection consistent if the probability of selecting the true model converges to 1 as n -> infinity.
          
          **LASSO Requirements:**
          1. Restriction on model size.
          2. Beta-min condition: Non-zero coefficients must be large enough to be detected.
          3. **Irrepresentability Condition:** The truly active variables must not be too highly correlated with the inactive ones. If this fails, LASSO may select false positives (poor support recovery).
        `
      }
    ]
  },
  {
    id: '3',
    title: '3. Bayesian Regression',
    subSections: [
      {
        id: '3.1',
        title: '3.1 Foundations',
        content: `
          Bayesian inference combines a likelihood p(y|θ) with a prior p(θ) to obtain a posterior p(θ|y).
          
          **Advantages:**
          - Can handle complex models via MCMC.
          - Naturally describes uncertainty.
          - Valid for non-frequentist questions.
          
          The posterior mode is analogous to penalized likelihood estimates.
        `,
        equations: [
            { label: 'Bayes Theorem', formula: String.raw`p(\theta|y) \propto p(y|\theta)p(\theta)` }
        ]
      },
      {
        id: '3.2',
        title: '3.2 Gaussian Regression Priors',
        content: `
          Common priors for Gaussian regression:
          
          - **Zellner's Prior:** A g-prior where the covariance is proportional to (X'X)^-1. Requires n >= d.
          - **Normal Shrinkage Prior:** Independent Normal priors on coefficients.
          
          The posterior mean under the Gaussian shrinkage prior coincides with the Ridge regression estimator.
        `
      },
      {
        id: '3.3',
        title: '3.3 Bayesian Model Averaging (BMA)',
        content: `
          Instead of selecting a single model, BMA averages predictions across all possible models, weighted by their posterior probabilities.
          
          BMA accounts for model selection uncertainty, often leading to better predictive performance than selecting a single "best" model.
          
          **Spike-and-Slab Prior:** A mixture prior where a coefficient is either exactly zero (spike) or follows a distribution (slab).
        `
      }
    ]
  },
  {
    id: '4',
    title: '4. Core Inference Toolkit',
    subSections: [
      {
        id: '4.1',
        title: '4.1 Estimators & Likelihoods',
        content: `
          **Estimator qualities:** unbiasedness, variance/MSE, consistency, asymptotic normality. MLEs are consistent (under regularity) and asymptotically efficient.
          
          **Likelihood playbook:**
          - Write the log-likelihood; drop constants not depending on parameters.
          - Take the score (first derivative) and set to zero for candidates.
          - Use the Hessian (second derivative) to check curvature.
          
          **Regularity:** smooth log-likelihood, identifiable parameters, information matrix finite.
        `,
        equations: [
          { label: 'Score Equation', formula: String.raw`\nabla_\theta \ell(\theta) = 0` },
          { label: 'Fisher Information', formula: String.raw`I(\theta) = -E\!\left[ \nabla_\theta^2 \ell(\theta) \right]` }
        ]
      },
      {
        id: '4.2',
        title: '4.2 Confidence Intervals',
        content: `
          **Exact intervals:** use a pivot (e.g., z/t/F/chi-square) with known sampling distribution.
          
          **Asymptotic intervals:** use asymptotic normality of an estimator; width depends on standard error and quantiles.
          
          **Likelihood-based:** likelihood-ratio, score, and Wald intervals are asymptotically equivalent; Wald can be poor at boundaries.
          
          **Bootstrap:** resample data, recompute estimator, take percentiles or basic/BCa corrections. Good when analytic SE is messy.
        `,
        equations: [
          { label: 'Asymptotic CI', formula: String.raw`\hat{\theta} \pm z_{1-\alpha/2} \cdot \widehat{\text{se}}(\hat{\theta})` },
          { label: 'LR Interval', formula: String.raw`2\big[\ell(\hat{\theta}) - \ell(\theta)\big] \leq \chi^2_{1-\alpha, df}` }
        ]
      },
      {
        id: '4.3',
        title: '4.3 Hypothesis Testing & Power',
        content: `
          **Neyman–Pearson:** most powerful test for simple H0 vs simple H1 uses the likelihood ratio. For composite hypotheses, we rely on LR/Wald/score tests.
          
          **Errors:** Type I (false positive) controlled by α; Type II controlled via power (1 - β). Higher power needs larger effect size, sample size, or variance reduction.
          
          **Multiple testing:** Bonferroni controls family-wise error; FDR approaches (Benjamini–Hochberg) control expected false discovery proportion.
          
          **Practice:** sketch rejection regions, compute power for a range of effect sizes, and state assumptions.
        `,
        equations: [
          { label: 'Likelihood Ratio', formula: String.raw`\Lambda(y) = \frac{\sup_{\theta \in \Theta_0} p(y|\theta)}{\sup_{\theta \in \Theta} p(y|\theta)}` }
        ]
      },
      {
        id: '4.4',
        title: '4.4 Asymptotics: Slutsky & Delta',
        content: `
          **Convergence flavors:** in probability (P), in distribution (D). Consistency is convergence in probability to the truth.
          
          **Slutsky:** if A_n ->p a and B_n ->d B, then A_n + B_n ->d a + B, A_n B_n ->d aB, and A_n^{-1} ->p a^{-1} if a ≠ 0.
          
          **Delta Method:** if sqrt(n)(T_n - θ) ->d Normal(0, σ²), then for smooth g, sqrt(n)(g(T_n) - g(θ)) ->d Normal(0, (g'(θ))² σ²).
          
          Use these to justify Wald intervals/tests and variance-stabilizing transforms.
        `
      }
    ]
  },
  {
    id: '5',
    title: '5. Generalized Additive Models',
    subSections: [
      {
        id: '5.0',
        title: '5.0 GAMs Overview',
        content: `
          Generalized Additive Models (GAMs) extend GLMs by allowing non-linear effects for covariates while maintaining additivity.
          
          y = f_1(x_1) + f_2(x_2) + ... + error
          
          The functions f_j are often estimated using **Splines** (e.g., cubic splines, B-splines).
          
          To prevent overfitting (wiggliness), a roughness penalty is added, often controlled by Generalized Cross-Validation (GCV).
        `,
        equations: [
            { label: 'GAM Structure', formula: String.raw`y_i = \sum f_j(x_{ij}) + \epsilon_i` }
        ]
      }
    ]
  },
  {
    id: '6',
    title: '6. Exam Playbook',
    subSections: [
      {
        id: '6.1',
        title: '6.1 Strategy & Timing',
        content: `
          - First 5 minutes: scan the exam, tag problems by topic/difficulty, and set a time budget per question.
          - Start with a "banker" problem you can finish to secure points and confidence.
          - Leave algebra-heavy steps for last; outline the logic first so you can earn method points.
          - Keep a running checklist of assumptions for each model (iid, normality, independence, large-sample, etc.).
          - If stuck: write down the likelihood, the statistic you would use, and the decision rule; partial credit beats blank space.
        `
      },
      {
        id: '6.2',
        title: '6.2 Formula & Pitfall Sheet',
        content: `
          - Estimation: score, Hessian, Fisher information, asymptotic variance of MLE.
          - Intervals: Wald vs score vs LR; when Wald fails (boundaries, skewed estimators).
          - Tests: rejection regions for z/t/chi-square/F; link each to assumptions.
          - Asymptotics: CLT, Slutsky, Delta method templates.
          - Pitfalls: forgetting Jacobians in transformations, misreading one-sided vs two-sided tests, mixing up parameter vs estimate symbols.
          
          Keep this to one page; rehearse rebuilding it from memory on Day 15.
        `
      },
      {
        id: '6.3',
        title: '6.3 Mistakes Log Template',
        content: `
          For each mistake, record:
          - **Assumption/Guess:** what you assumed.
          - **Error:** what was wrong or missing.
          - **Fix/Trigger:** what to check next time (unit/shape/limit sanity checks, draw the sampling distribution, verify conditions).
          
          Revisit the log on Days 7, 11, and 15; add the triggers to your playbook.
        `
      },
      {
        id: '6.4',
        title: '6.4 Problem Bank',
        content: `
          Collect practice items from lectures, finals, and textbook exercises.
          
          - Tag each problem by topic (e.g., MLE, CI, test, asymptotics), skill (derivation/computation/proof), and status (unseen/in-progress/solved).
          - Write a "start hint" before checking any solution; after solving, add a post-mortem with pitfalls and time taken.
          - Promote weak spots into the next day's focus and into the formula/pitfall sheet.
        `
      }
    ]
  }
];
