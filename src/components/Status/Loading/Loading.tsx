export default function Loading() {
  return (
    <div className="text-center">
      <div className="my-4 flex justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
      <p>ロード中</p>
    </div>
  );
}
