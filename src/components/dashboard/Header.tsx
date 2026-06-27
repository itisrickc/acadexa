export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          👋 Good Morning, Ankit
        </h1>

        <p className="text-slate-500 mt-2">
          Let's make today productive.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          A
        </div>
      </div>
    </div>
  );
}