import { Award, Trophy, Star } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Achievements & Awards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border">
            <Award className="h-8 w-8 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Excellence in Sustainable Design</h2>
            <p className="text-muted-foreground mb-4">
              Green Building Council SA - 2023
            </p>
            <p className="text-sm text-muted-foreground">
              Awarded for innovative sustainable design solutions in urban development projects.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Trophy className="h-8 w-8 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Heritage Conservation Award</h2>
            <p className="text-muted-foreground mb-4">
              Cape Institute for Architecture - 2022
            </p>
            <p className="text-sm text-muted-foreground">
              Recognition for outstanding work in heritage building preservation.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Star className="h-8 w-8 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Urban Design Excellence</h2>
            <p className="text-muted-foreground mb-4">
              South African Institute of Architects - 2021
            </p>
            <p className="text-sm text-muted-foreground">
              Awarded for contribution to urban renewal and community development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}