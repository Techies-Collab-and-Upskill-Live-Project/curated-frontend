export default function WelcomeBack() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
      <p className="text-lg text-gray-700 mb-6">
        We're glad to see you again. Let's get you back on track!
      </p>
      <a
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Go to Dashboard
      </a>
    </div>
  );
}