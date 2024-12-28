import React from 'react';

interface AdminContentProps {
  children: React.ReactNode;
}

export const AdminContent: React.FC<AdminContentProps> = ({ children }) => {
  return (
    <main className="p-6">
      {children}
    </main>
  );
};