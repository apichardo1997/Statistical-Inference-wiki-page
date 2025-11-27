import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Legend
} from 'recharts';

// Generate synthetic data: y = sin(x) + noise
const generateData = () => {
  const data = [];
  for (let x = 0; x <= 6.3; x += 0.7) { // Sparse points
    const y = Math.sin(x) + (Math.random() - 0.5) * 0.5;
    data.push({ x, y });
  }
  return data;
};

// Simple polynomial regression simulator (mocked for demo visuals)
const generateCurves = (points: { x: number; y: number }[]) => {
  const curves = [];
  for (let x = 0; x <= 6.3; x += 0.1) {
    const trueY = Math.sin(x);
    // Underfit: Straight horizontal line (mean)
    const underfitY = 0.2; 
    // Good fit: Close to sin(x)
    const goodFitY = Math.sin(x);
    // Overfit: Connects dots erratically (simulated)
    // We mix the true sine with high freq noise that passes near points
    const overfitY = Math.sin(x) + Math.cos(5 * x) * 0.2; 

    curves.push({
      x,
      trueY,
      underfitY,
      goodFitY,
      overfitY
    });
  }
  return curves;
};

const OverfittingDemo: React.FC = () => {
  const points = useMemo(() => generateData(), []);
  const curves = useMemo(() => generateCurves(points), [points]);

  return (
    <div className="my-8 p-6 bg-white rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Demo: The Concept of Overfitting</h3>
      <p className="text-sm text-gray-600 mb-6">
        Visualizing how model complexity affects fit. The <span className="text-red-500 font-bold">Red</span> dots are noisy observations.
        The lines represent different polynomial degrees.
      </p>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="x" type="number" domain={[0, 6.5]} hide />
            <YAxis domain={[-1.5, 1.5]} hide />
            <Tooltip />
            <Legend />
            
            {/* The Observations */}
            <Scatter name="Observations" data={points} fill="#ef4444" shape="circle" />

            {/* Models */}
            <Line 
              data={curves} 
              dataKey="underfitY" 
              name="Degree 0 (Underfit)" 
              stroke="#94a3b8" 
              strokeWidth={2} 
              dot={false} 
              type="monotone"
            />
             <Line 
              data={curves} 
              dataKey="goodFitY" 
              name="Degree 3 (Good Fit)" 
              stroke="#0ea5e9" 
              strokeWidth={3} 
              dot={false} 
              type="monotone"
            />
             <Line 
              data={curves} 
              dataKey="overfitY" 
              name="Degree 9 (Overfit)" 
              stroke="#8b5cf6" 
              strokeWidth={1} 
              dot={false} 
              strokeDasharray="5 5"
              type="natural"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-xs text-center text-gray-500">
        Note: "Overfit" curve is stylized for demonstration. Real polynomial degree 9 would oscillate wildly between points.
      </div>
    </div>
  );
};

export default OverfittingDemo;
