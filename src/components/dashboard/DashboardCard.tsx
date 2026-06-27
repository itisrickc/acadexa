type Props = {
  subject: string;
  time: string;
};

export default function DashboardCard({
  subject,
  time,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center hover:scale-[1.02] transition">
      <div>
        <h2 className="font-bold text-lg">
          {subject}
        </h2>

        <p className="text-slate-500">
          Today's Session
        </p>
      </div>

      <span className="text-blue-600 font-semibold">
        {time}
      </span>
    </div>
  );
}