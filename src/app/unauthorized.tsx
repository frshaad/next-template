'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function UnauthorizedPage() {
  const pathname = usePathname();

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Icon with gradient background */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="bg-primary/10 absolute inset-0 rounded-full blur-3xl" />
            <div className="bg-card border-border relative rounded-full border-2 p-6">
              <ShieldX
                className="text-muted-foreground h-16 w-16"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-balance">
              401
            </h1>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight text-balance">
              Authentication Required
            </h2>
          </div>

          <p className="text-muted-foreground mx-auto max-w-sm leading-relaxed text-balance">
            You need to sign in to access this resource. Please log in with your
            credentials to continue.
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="space-y-3">
            <Link href={{ pathname: '/login', query: { redirect: pathname } }}>
              <Button className="w-full" size="lg">
                <LogIn className="mr-2 size-4" />
                Sign In
              </Button>
            </Link>
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
