import { Chapter } from '../types';

export const wikiContent: Chapter[] = [
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
            { label: 'True Model', formula: 'y_i = \\sin(2\\pi x_i) + \\epsilon_i' }
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
            { label: 'GLM Structure', formula: 'g(E(y_i|x_i)) = x_i^T\\beta' },
            { label: 'Logistic Link', formula: '\\log(\\frac{\\pi_i}{1-\\pi_i}) = x_i^T\\beta' }
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
            { label: 'MSPE Decomposition', formula: 'E[(Y - \\hat{m})^2] = V(Y) + V(\\hat{m}) + Bias^2(\\hat{m})' }
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
             { label: 'Optimization', formula: '\\hat{\\theta} = \\arg\\max [ \\log p(y|\\theta) - r(\\theta) ]' },
             { label: 'BIC', formula: '-2 \\log p(y|\\theta) + \\log(n)|\\beta|_0' }
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
            { label: 'LASSO', formula: '- \\log p(y|\\theta) + \\lambda |\\beta|_1' },
            { label: 'Ridge', formula: '- \\log p(y|\\theta) + \\lambda |\\beta|_2^2' }
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
            { label: 'Bayes Theorem', formula: 'p(\\theta|y) \\propto p(y|\\theta)p(\\theta)' }
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
            { label: 'GAM Structure', formula: 'y_i = \\sum f_j(x_{ij}) + \\epsilon_i' }
        ]
      }
    ]
  }
];
