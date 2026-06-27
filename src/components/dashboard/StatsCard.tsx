type Props = {
  title: string;
  value: string;
  color: string;
};

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
      <p className="text-slate-500">{title}</p>

      <h2
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}