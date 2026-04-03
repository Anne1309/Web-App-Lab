'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { bloodInventory as initialInventory } from '@/lib/mock-data';
import { BloodInventory } from '@/lib/types';
import { 
  Package, 
  Plus, 
  Minus,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<BloodInventory[]>(initialInventory);
  const [adjustments, setAdjustments] = useState<Record<string, string>>({});

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const lowStockCount = inventory.filter(item => item.units < 15).length;
  const criticalCount = inventory.filter(item => item.units < 10).length;

  const handleAdjustment = (id: string, type: 'add' | 'subtract') => {
    const amount = parseInt(adjustments[id] || '0');
    if (isNaN(amount) || amount <= 0) return;

    setInventory(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newUnits = type === 'add' 
            ? item.units + amount 
            : Math.max(0, item.units - amount);
          return { ...item, units: newUnits, lastUpdated: new Date() };
        }
        return item;
      })
    );

    setAdjustments(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Blood Inventory</h1>
        <p className="text-muted-foreground">Manage blood stock levels</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Stock</p>
                <p className="text-3xl font-bold text-foreground">{totalUnits}</p>
                <p className="text-xs text-muted-foreground">units available</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Types</p>
                <p className="text-3xl font-bold text-chart-5">{lowStockCount}</p>
                <p className="text-xs text-muted-foreground">below 15 units</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-5/10">
                <TrendingDown className="h-6 w-6 text-chart-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Stock</p>
                <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
                <p className="text-xs text-muted-foreground">below 10 units</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {inventory.map((item) => {
          const isCritical = item.units < 10;
          const isLow = item.units < 15 && !isCritical;

          return (
            <Card 
              key={item.id}
              className={
                isCritical ? 'border-destructive' : 
                isLow ? 'border-chart-5' : ''
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.bloodType}
                  </div>
                  {isCritical && (
                    <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      Critical
                    </span>
                  )}
                  {isLow && !isCritical && (
                    <span className="flex items-center gap-1 text-xs font-medium text-chart-5">
                      <TrendingDown className="h-3 w-3" />
                      Low
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className={`text-4xl font-bold ${
                    isCritical ? 'text-destructive' : 
                    isLow ? 'text-chart-5' : 
                    'text-foreground'
                  }`}>
                    {item.units}
                  </p>
                  <p className="text-sm text-muted-foreground">units available</p>
                </div>

                {/* Stock Level Bar */}
                <div className="mb-4">
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        isCritical ? 'bg-destructive' : 
                        isLow ? 'bg-chart-5' : 
                        'bg-chart-4'
                      }`}
                      style={{ width: `${Math.min(100, (item.units / 100) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Adjustment Controls */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`adjust-${item.id}`} className="text-xs">
                    Adjust Stock
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id={`adjust-${item.id}`}
                      type="number"
                      min="1"
                      placeholder="Units"
                      value={adjustments[item.id] || ''}
                      onChange={(e) => setAdjustments(prev => ({ 
                        ...prev, 
                        [item.id]: e.target.value 
                      }))}
                      className="text-center"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAdjustment(item.id, 'subtract')}
                      disabled={!adjustments[item.id]}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAdjustment(item.id, 'add')}
                      disabled={!adjustments[item.id]}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
