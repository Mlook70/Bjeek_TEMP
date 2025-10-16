import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the backend URL from environment variables (server-side only)
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    
    // Parse the incoming request body
    const body = await request.json();
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/investor-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the response with the same status code
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'حدث خطأ في الاتصال بالخادم',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for health check
export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'Investment form API proxy is running' 
  });
}

