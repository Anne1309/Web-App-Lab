'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { Droplet, User, Shield, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(formData.email, formData.password, activeTab);
    
    if (success) {
      if (activeTab === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Droplet className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your LifeFlow account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'user' | 'admin')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="mt-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="user@lifeflow.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="mt-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In as User'
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Demo credentials: user@lifeflow.com / user123
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@lifeflow.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="mt-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In as Admin'
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Demo credentials: admin@lifeflow.com / admin123
                  </p>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
