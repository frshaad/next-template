'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorComponent({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div className="from-background via-muted/20 to-muted/40 flex min-h-screen items-center justify-center bg-linear-to-br">
      <div className="max-w-md space-y-6 p-8 text-center">
        {/* Animated Error Icon */}
        <div className="relative">
          <div className="border-destructive/20 bg-destructive/10 dark:bg-destructive/20 mx-auto flex h-24 w-24 items-center justify-center rounded-full border">
            <AlertTriangle className="text-destructive h-12 w-12 animate-pulse" />
          </div>

          {/* Floating particles effect */}
          <div className="bg-destructive/60 absolute -top-2 -right-2 h-3 w-3 animate-bounce rounded-full" />
          <div
            className="bg-destructive/40 absolute -bottom-1 -left-3 h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className="bg-destructive/50 absolute top-1 -left-4 h-1.5 w-1.5 animate-bounce rounded-full"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* Error Content */}
        <div className="space-y-3">
          <h1 className="text-foreground text-3xl font-bold">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified and we&apos;re working on it.
          </p>

          {/* Error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="border-border bg-muted mt-4 rounded-lg border p-3 text-left">
              <summary className="text-foreground cursor-pointer text-sm font-medium">
                Error Details
              </summary>
              <pre className="text-muted-foreground mt-2 overflow-auto text-xs">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            className="flex items-center gap-2"
            onClick={reset}
            variant="destructive"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            className="flex items-center gap-2"
            onClick={() => router.back()}
            variant="outline"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
