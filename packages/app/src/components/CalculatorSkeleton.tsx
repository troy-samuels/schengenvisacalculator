'use client'

// Loading skeleton for calculator section
// Shows instant visual feedback while JavaScript loads

export default function CalculatorSkeleton() {
  return (
    <section id="calculator" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg w-3/4 md:w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-100 rounded-lg w-full md:w-2/3 mx-auto"></div>
        </div>

        {/* Calculator Card Skeleton */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border border-blue-100 p-6 md:p-8">
          {/* Progress Indicators Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-16 mt-2"></div>
              </div>
            ))}
          </div>

          {/* Trip Entry Skeleton */}
          <div className="space-y-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Country Selector Skeleton */}
                  <div className="h-12 bg-gray-200 rounded-lg"></div>

                  {/* Date Inputs Skeleton */}
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>

                  {/* Results Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="h-12 bg-gray-100 rounded-lg flex-1"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center animate-pulse">
            <div className="h-11 bg-blue-200 rounded-lg w-full sm:w-48"></div>
            <div className="flex gap-2">
              <div className="h-11 w-32 bg-gray-200 rounded-lg"></div>
              <div className="h-11 w-32 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-blue-600 font-dm-sans">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading calculator...</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-spin {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
