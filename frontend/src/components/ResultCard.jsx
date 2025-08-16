import { CheckCircle, AlertTriangle } from "lucide-react";

export default function ResultCard({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <span>{result.error}</span>
      </div>
    );
  }

  if (!result.crops || result.crops.length === 0) {
    return (
      <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-600" />
        <span>No crops found for the given inputs.</span>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🌱 Results for <span className="text-green-700">{result.season}</span> season 
        ({result.soil_type} soil)
      </h2>
      <ul className="space-y-2">
        {result.crops.map((crop, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 p-2 bg-green-50 rounded-lg shadow-sm"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-800">{crop}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
