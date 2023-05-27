export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Home</h1>
      <div className="my-10">
        <a
          href="/account"
          className="text-blue-600 decoration-blue-500 hover:underline"
        >
          アカウント管理
        </a>
      </div>
    </div>
  );
}
