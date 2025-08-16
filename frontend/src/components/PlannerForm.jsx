import { useState, useEffect } from "react";
import { Sun, CloudRain, Snowflake, Loader2 } from "lucide-react"; // 👈 add Loader2

export default function PlannerForm({ onResult }) {
  const [season, setSeason] = useState("Summer");
  const [soilType, setSoilType] = useState("Loamy");
  const [autoSeason, setAutoSeason] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 NEW

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=12.91&longitude=74.85&current_weather=true"
        );
        const data = await res.json();
        const temp = data.current_weather.temperature;

        let detected = "Monsoon";
        if (temp > 25) detected = "Summer";
        else if (temp < 15) detected = "Winter";

        setSeason(detected);
        setAutoSeason(detected);
      } catch {
        const savedSeason = localStorage.getItem("season");
        if (savedSeason) setSeason(savedSeason);
      }

      const savedSoil = localStorage.getItem("soilType");
      if (savedSoil) setSoilType(savedSoil);
    }
    fetchWeather();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem("season", season);
    localStorage.setItem("soilType", soilType);

    setLoading(true); // 👈 start loader

    try {
      const res = await fetch("http://127.0.0.1:8000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ season, soil_type: soilType }),
      });
      if (!res.ok) throw new Error("Failed to fetch recommendations");

      const data = await res.json();
      onResult(data);
    } catch (err) {
      onResult({ error: err.message });
    } finally {
      setLoading(false); // 👈 stop loader
    }
  };

  const seasonIcon =
    autoSeason === "Summer" ? Sun : autoSeason === "Winter" ? Snowflake : CloudRain;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Season</label>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option>Summer</option>
          <option>Winter</option>
          <option>Monsoon</option>
        </select>

        {autoSeason && season === autoSeason && (
          <p className="flex items-center gap-1 text-xs italic text-gray-500 mt-1">
            {seasonIcon && <seasonIcon className="w-4 h-4 text-green-600" />}
            Auto-detected from today’s weather:{" "}
            <span className="font-semibold text-green-600">{autoSeason}</span>
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Soil Type</label>
        <select
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option>Loamy</option>
          <option>Sandy</option>
          <option>Clay</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        disabled={loading} // 👈 prevent multiple clicks
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Fetching...
          </>
        ) : (
          "Get Recommendations"
        )}
      </button>
    </form>
  );
}
