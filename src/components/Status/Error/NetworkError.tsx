export default function Error({ retry }: { retry: () => void }) {
  return (
    <div>
      <p>通信エラーが発生しました。</p>
      <button
        type="button"
        onClick={retry}
        className="my-4 rounded-md bg-blue-500 p-3 text-white"
      >
        リトライ
      </button>
    </div>
  );
}
