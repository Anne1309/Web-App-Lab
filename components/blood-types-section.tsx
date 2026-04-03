'use client';

import { bloodInventory } from '@/lib/mock-data';
import { BloodType } from '@/lib/types';

const bloodTypeInfo: Record<BloodType, { canDonateTo: string; canReceiveFrom: string }> = {
  'A+': { canDonateTo: 'A+, AB+', canReceiveFrom: 'A+, A-, O+, O-' },
  'A-': { canDonateTo: 'A+, A-, AB+, AB-', canReceiveFrom: 'A-, O-' },
  'B+': { canDonateTo: 'B+, AB+', canReceiveFrom: 'B+, B-, O+, O-' },
  'B-': { canDonateTo: 'B+, B-, AB+, AB-', canReceiveFrom: 'B-, O-' },
  'AB+': { canDonateTo: 'AB+', canReceiveFrom: 'All Types' },
  'AB-': { canDonateTo: 'AB+, AB-', canReceiveFrom: 'A-, B-, AB-, O-' },
  'O+': { canDonateTo: 'A+, B+, AB+, O+', canReceiveFrom: 'O+, O-' },
  'O-': { canDonateTo: 'All Types', canReceiveFrom: 'O-' },
};

export function BloodTypesSection() {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Blood Inventory Status
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time availability of blood types in our bank. Critical levels marked in red.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bloodInventory.map((item) => (
            <BloodTypeCard
              key={item.id}
              bloodType={item.bloodType}
              units={item.units}
              info={bloodTypeInfo[item.bloodType]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BloodTypeCard({
  bloodType,
  units,
  info,
}: {
  bloodType: BloodType;
  units: number;
  info: { canDonateTo: string; canReceiveFrom: string };
}) {
  const isLow = units < 15;
  const isCritical = units < 10;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-md">
          {bloodType}
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold ${isCritical ? 'text-destructive' : isLow ? 'text-chart-5' : 'text-chart-4'}`}>
            {units}
          </p>
          <p className="text-sm text-muted-foreground">units</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Can donate to:</span>
          <span className="font-medium text-foreground">{info.canDonateTo}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Can receive from:</span>
          <span className="font-medium text-foreground">{info.canReceiveFrom}</span>
        </div>
      </div>

      {isCritical && (
        <div className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm font-medium text-destructive">
          Critical Level - Donors Needed
        </div>
      )}
      {isLow && !isCritical && (
        <div className="mt-4 rounded-lg bg-chart-5/10 px-3 py-2 text-center text-sm font-medium text-chart-5">
          Low Stock
        </div>
      )}
    </div>
  );
}
