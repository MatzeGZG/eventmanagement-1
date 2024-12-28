import React from 'react';
import { Award, Star, TrendingUp, Users, Zap } from 'lucide-react';

export const OrganizerDescription: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Event Organizer
        </h2>
        <p className="text-gray-600 mb-8">
          Create and manage exceptional events while earning rewards and unlocking exclusive benefits. Our gamified platform helps you grow your event organizing skills and community impact.
        </p>

        <div className="space-y-8">
          {/* Levels Section */}
          <Section
            icon={<Award className="w-6 h-6 text-indigo-600" />}
            title="Organizer Levels"
            description="Progress through four distinct levels, each with its own set of benefits:"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LevelCard
                title="Host"
                xp="0-499 XP"
                benefits={['Access to standard tools', 'Basic event creation']}
              />
              <LevelCard
                title="Planner"
                xp="500-1,499 XP"
                benefits={['Analytics dashboard', 'Custom registration forms']}
              />
              <LevelCard
                title="Manager"
                xp="1,500-3,499 XP"
                benefits={['Priority visibility', 'Co-organizer tools']}
              />
              <LevelCard
                title="Leader"
                xp="3,500+ XP"
                benefits={['Free premium listings', 'VIP support access']}
              />
            </div>
          </Section>

          {/* Points System */}
          <Section
            icon={<Star className="w-6 h-6 text-indigo-600" />}
            title="Earning Points"
            description="Earn points through various activities and achievements:"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <PointCard
                title="Event Success"
                points={100}
                description="When your event achieves >80% attendance"
              />
              <PointCard
                title="5-Star Reviews"
                points={50}
                description="For each event with five 5-star reviews"
              />
              <PointCard
                title="Quick Response"
                points={20}
                description="Answer attendee queries within 24 hours"
              />
              <PointCard
                title="Event Series"
                points={200}
                description="Create a successful recurring event series"
              />
            </div>
          </Section>

          {/* Benefits Overview */}
          <Section
            icon={<Zap className="w-6 h-6 text-indigo-600" />}
            title="Premium Benefits"
            description="Unlock exclusive features and tools as you progress:"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <BenefitCard
                icon={<TrendingUp className="w-5 h-5" />}
                title="Analytics"
                description="Track attendance, engagement, and growth"
              />
              <BenefitCard
                icon={<Users className="w-5 h-5" />}
                title="Team Tools"
                description="Collaborate with co-organizers efficiently"
              />
              <BenefitCard
                icon={<Star className="w-5 h-5" />}
                title="Priority Features"
                description="Get boosted visibility and early access"
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {children}
  </div>
);

const LevelCard: React.FC<{
  title: string;
  xp: string;
  benefits: string[];
}> = ({ title, xp, benefits }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <h4 className="font-semibold text-gray-900">{title}</h4>
    <p className="text-sm text-indigo-600 mb-2">{xp}</p>
    <ul className="text-sm text-gray-600">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          {benefit}
        </li>
      ))}
    </ul>
  </div>
);

const PointCard: React.FC<{
  title: string;
  points: number;
  description: string;
}> = ({ title, points, description }) => (
  <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
    <div className="bg-indigo-100 text-indigo-600 font-semibold rounded-full px-3 py-1 text-sm">
      +{points}
    </div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <div className="text-indigo-600 mb-2">{icon}</div>
    <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);