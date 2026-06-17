import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { requireOwner } from '@/lib/auth/session';
import { AuthError } from '@/lib/errors';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/posts/[id]'>) {
  const params = await ctx.params;

  try {
    const _session = await requireOwner(params.id);
    // ...
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    throw error;
  }
}
