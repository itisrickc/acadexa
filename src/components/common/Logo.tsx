import Link from "next/link";

type LogoProps = {
  size?: "sm" | "lg";
};

export default function Logo({ size = "lg" }: LogoProps) {
  return (
    <Link href="/" className="inline-block">
      <h1
        className={
          size === "lg"
            ? "text-4xl font-extrabold text-blue-600 tracking-tight"
            : "text-2xl font-extrabold text-blue-600 tracking-tight"
        }
      >
        ACADEXA
      </h1>

      <p className="text-sm text-slate-500">
        Study Smarter. Achieve More.
      </p>
    </Link>
  );
}