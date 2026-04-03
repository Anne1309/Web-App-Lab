import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Search, Clock, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              <Heart className="h-4 w-4" />
              Save Lives Today
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl text-balance">
              Every Drop of Blood Can
              <span className="text-primary"> Save a Life</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Join our community of life-savers. Whether you need blood or want to donate, 
              LifeFlow connects you with the right resources instantly.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/request">Request Blood</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/search">Search Blood</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={<Users className="h-6 w-6" />}
              value="10,000+"
              label="Active Donors"
            />
            <StatCard
              icon={<Heart className="h-6 w-6" />}
              value="25,000+"
              label="Lives Saved"
            />
            <StatCard
              icon={<Clock className="h-6 w-6" />}
              value="24/7"
              label="Emergency Support"
            />
            <StatCard
              icon={<Search className="h-6 w-6" />}
              value="8"
              label="Blood Types Available"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md border-t-2 border-t-primary">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
