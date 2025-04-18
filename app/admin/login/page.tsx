"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [appearing, setAppearing] = useState(false);

  const { login, isAuthenticated } = useAuth();

  // Add animation effect when component mounts
  useEffect(() => {
    // Short delay to trigger animation
    setTimeout(() => {
      setAppearing(true);
    }, 50);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);

      if (!success) {
        throw new Error('Invalid email or password');
      }

      router.push('/admin');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className={cn(
        "w-full max-w-md transition-all duration-500 transform",
        appearing ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <div className="bg-card p-8 rounded-lg border shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
            <p className="text-sm">Use the following credentials to log in:</p>
            <p className="text-sm font-medium mt-1">Email: admin@example.com</p>
            <p className="text-sm font-medium">Password: admin123</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}