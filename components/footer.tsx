import Link from 'next/link';
import { Droplet, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Droplet className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">LifeFlow</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Connecting donors with those in need. Every drop counts in saving lives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Search Blood
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Request Blood
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">Blood Donation</li>
              <li className="text-sm text-muted-foreground">Blood Testing</li>
              <li className="text-sm text-muted-foreground">Emergency Services</li>
              <li className="text-sm text-muted-foreground">Mobile Blood Drives</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                1-800-LIFEFLOW
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contact@lifeflow.org
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                123 Healthcare Drive, Medical City, MC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LifeFlow Blood Bank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
