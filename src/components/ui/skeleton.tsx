export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-4 w-72" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="layer-card">
            <div className="layer-card-body">
              <div className="flex items-center gap-4">
                <div className="skeleton h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <div className="skeleton h-6 w-16" />
                  <div className="skeleton h-3 w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="layer-card">
        <div className="layer-card-body">
          <div className="skeleton h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="layer-card">
      <div className="layer-card-body p-0">
        <div className="divide-y divide-[var(--coollabs-fill)]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-4 w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
