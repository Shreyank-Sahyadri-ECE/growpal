import { useState } from "react";
import PlannerForm from "./components/PlannerForm";
import ResultCard from "./components/ResultCard";
import { Sprout } from "lucide-react"; // icon for logo

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8">
        {/* Logo + Title */}
        <div className="flex items-center justify-center mb-6">
          <Sprout className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">GrowPal</h1>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Pick a season and soil type to get <br />
          <span className="font-semibold text-green-700">smart crop recommendations 🌱</span>
        </p>

        {/* Form */}
        <PlannerForm onResult={setResult} />

        {/* Result */}
        <ResultCard result={result} />

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-8">
          🌾 Powered by FastAPI + React • Made with ❤️
        </p>
      </div>
    </div>
  );
}
