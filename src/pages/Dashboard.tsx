import React from 'react';
import { useStore } from '../store';
import { Award, Users, Timer, Trophy } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Welcome! You are logged in.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export function Dashboard() {
  const { projects, judges, scores } = useStore();

  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: Trophy,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Judges',
      value: judges.length,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Evaluations Complete',
      value: scores.length,
      icon: Award,
      color: 'bg-purple-500',
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon
                      className={`h-6 w-6 text-white p-1 rounded-md ${stat.color}`}
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <p className="text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}