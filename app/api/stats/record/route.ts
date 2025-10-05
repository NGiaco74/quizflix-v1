import { NextRequest, NextResponse } from 'next/server';
import { recordSearch } from '@/lib/search-stats-server';

/**
 * Endpoint pour enregistrer une recherche côté serveur
 * Appelé par le client après chaque recherche
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, found } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    if (typeof found !== 'boolean') {
      return NextResponse.json(
        { error: 'Found must be a boolean' },
        { status: 400 }
      );
    }

    // Enregistrer la recherche
    recordSearch(query, found);

    return NextResponse.json(
      { success: true, message: 'Search recorded' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error recording search:', error);
    return NextResponse.json(
      { error: 'Failed to record search' },
      { status: 500 }
    );
  }
}

// Support CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
