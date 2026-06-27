export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-4 h-5 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mb-3 h-7 w-3/4 animate-pulse rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 flex gap-2">
                <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}