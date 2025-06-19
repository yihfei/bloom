import Link from 'next/link';

export default function AboutPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h1 className="text-4xl font-bold text-amber-600 mb-6">About <Link
          href="/"
          className="border-b-2 border-amber-600 hover:border-amber-800 hover:text-amber-800 transition"
        >
          Bloom
        </Link></h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
          Bloom is your ultimate companion for tracking your coffee brewing journey. Made by coffee enthusiasts, for coffee enthusiasts.
        </p>
        <div className="flex flex-col items-center space-y-4">
        
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
            <ul className="text-gray-600 mt-2 max-w-xl list-disc list-inside">
              <li>Keep stock of your coffee beans, grinders and brewing equipment</li>
              <li>Analyze your brewing data with a dedicated dashboard.</li>
              <li>Track your brews with detailed notes.</li>

              
            </ul>
          </div>
        </div>
      </div>
    );
  }