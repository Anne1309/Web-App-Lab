import { UserPlus, Search, ClipboardCheck, Heart } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: 'Register',
    description: 'Create your account with basic details and blood type information.',
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Search',
    description: 'Find available blood types or locate nearby donors instantly.',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: 'Request',
    description: 'Submit a blood request with patient details and urgency level.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Save Lives',
    description: 'Connect with donors and receive the blood you need.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting blood has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-border lg:block" />
              )}
              
              {/* Step Number */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20">
                {step.icon}
              </div>
              
              {/* Number Badge */}
              <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                {index + 1}
              </div>
              
              <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
