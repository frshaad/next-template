import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Icon with gradient background */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="bg-primary/10 absolute inset-0 rounded-full blur-3xl" />
            <div className="bg-card border-border relative rounded-full border-2 p-6">
              <Loader2
                className="text-muted-foreground h-16 w-16 animate-spin"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight text-balance">
            Loading
          </h2>
          <p className="text-muted-foreground mx-auto max-w-sm leading-relaxed text-balance">
            Please wait while we fetch your content...
          </p>
        </div>
      </div>
    </div>
  );
}
