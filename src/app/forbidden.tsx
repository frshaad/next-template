'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ForbiddenPage() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Icon with gradient background */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="bg-destructive/10 absolute inset-0 rounded-full blur-3xl" />
            <div className="bg-card border-border relative rounded-full border-2 p-6">
              <ShieldAlert
                className="text-destructive h-16 w-16"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-balance">
              403
            </h1>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight text-balance">
              Access Forbidden
            </h2>
          </div>

          <p className="text-muted-foreground mx-auto max-w-sm leading-relaxed text-balance">
            You don&apost have permission to access this resource. Please
            contact your administrator if you believe this is an error.
          </p>
        </div>

        {/* Actions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="space-y-3">
            {isHome && (
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  <Home className="mr-2 size-4" />
                  Back to Home
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Footer text */}
        <p className="text-muted-foreground text-center text-sm">
          Error Code: <span className="font-mono">AUTH_403</span>
        </p>
      </div>
    </div>
  );
}
