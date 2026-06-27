import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-12 py-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-600">
            ACADEXA
          </h1>
          <p className="text-slate-500 text-sm">
            Study Smarter. Achieve More.
          </p>
        </div>

        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link href="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#">Schedule</a>
          <a href="#">Exams</a>
          <a href="#">Progress</a>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-slate-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-12 py-20">
        <div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            Your All-in-One Study Companion
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight">
            Study Smarter.
            <br />
            <span className="text-blue-600">
              Achieve More.
            </span>
          </h1>

          <p className="text-slate-600 mt-6 text-lg">
            Acadexa helps students plan,
            learn and grow through smart
            scheduling, exam tracking and
            performance monitoring.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl"
            >
              Get Started
            </Link>

            <button className="border px-8 py-4 rounded-xl">
              Explore Features
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl p-12 shadow-lg">
          <div className="bg-white rounded-2xl p-6 shadow mb-4">
            📅 Study Schedule
          </div>

          <div className="bg-white rounded-2xl p-6 shadow mb-4">
            📝 Upcoming Exams
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            📈 Progress Tracking
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-12 pb-20">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border">
            <h3 className="font-bold">
              Smart Scheduler
            </h3>
            <p className="text-slate-500 mt-2">
              Plan your study routine.
            </p>
          </div>

          <div className="p-6 rounded-2xl border">
            <h3 className="font-bold">
              Organized Learning
            </h3>
            <p className="text-slate-500 mt-2">
              Keep notes organized.
            </p>
          </div>

          <div className="p-6 rounded-2xl border">
            <h3 className="font-bold">
              Exam Management
            </h3>
            <p className="text-slate-500 mt-2">
              Track upcoming exams.
            </p>
          </div>

          <div className="p-6 rounded-2xl border">
            <h3 className="font-bold">
              Progress Tracking
            </h3>
            <p className="text-slate-500 mt-2">
              Monitor performance.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}