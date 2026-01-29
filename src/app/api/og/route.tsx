import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';





export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl || {};

        // ?title=<title>
        const hasTitle = searchParams?.has('title');
        const title = hasTitle
            ? searchParams?.get('title')?.slice(0, 100)
            : 'Dev4Fun Blog';

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
                        backgroundColor: '#030711', // Card background color
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Logo / Brand */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 40,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 32,
                                fontWeight: 700,
                                color: '#8b5cf6', // Primary color (Violet)
                                background: '#1e293b',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                border: '1px solid #334155',
                            }}
                        >
                            Dev4Fun
                        </div>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '0 60px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 64,
                                fontWeight: 900,
                                background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                lineHeight: 1.2,
                                margin: 0,
                                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* Footer Decoration */}
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            bottom: 40,
                            fontSize: 20,
                            color: '#94a3b8',
                            gap: 20,
                        }}
                    >
                        <span>Programming</span>
                        <span style={{ color: '#475569' }}>•</span>
                        <span>Technology</span>
                        <span style={{ color: '#475569' }}>•</span>
                        <span>Career</span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch {

        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
