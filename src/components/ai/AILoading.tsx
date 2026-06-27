export default function AILoading() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow">
        🤖
      </div>

      <div className="rounded-2xl bg-gray-100 px-5 py-4 shadow">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}