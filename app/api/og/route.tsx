import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Quizflix';
    const score = searchParams.get('score');
    const total = searchParams.get('total');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0b0b0d',
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(229, 9, 20, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: '#e50914',
                marginBottom: 40,
              }}
            >
              Quizflix
            </div>
            
            <div
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: 40,
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>

            {score && total && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '30px 60px',
                  borderRadius: 20,
                  border: '2px solid rgba(34, 211, 238, 0.3)',
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    fontWeight: 'bold',
                    color: '#22d3ee',
                  }}
                >
                  {score}/{total}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}


