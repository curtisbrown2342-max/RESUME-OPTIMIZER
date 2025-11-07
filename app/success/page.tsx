'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-gray-600 mb-2">
          Thank you for subscribing to ResumeAI Pro.
        </p>
        
        <p className="text-gray-600 mb-8">
          Your subscription is now active. You can start analyzing unlimited resumes.
        </p>

        {sessionId && (
          <p className="text-sm text-gray-500 mb-8">
            Session ID: {sessionId}
          </p>
        )}

        <div className="space-y-3">
          <Link href="/analyzer" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Analyzing Resumes
            </Button>
          </Link>
          
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Next Steps:</strong>
            <br />
            Check your email for a confirmation and receipt. You can manage your subscription in your account settings.
          </p>
        </div>
      </div>
    </div>
  );
}
