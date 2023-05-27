export default function Account() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <a href="/" className="pointer-events-none">
          生徒
        </a>
      </div>
      <div>
        <a
          href="/account/teacher"
          className="text-blue-600 decoration-blue-500 hover:underline"
        >
          先生
        </a>
      </div>
    </div>
  );
}
