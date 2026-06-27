type Props = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function AIInput({
  value,
  loading,
  onChange,
  onSend,
}: Props) {
  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          disabled={loading}
          placeholder="Ask ACADEXA AI..."
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}