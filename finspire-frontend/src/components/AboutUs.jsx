import { useState } from 'react';
import { CreditCard, Wallet, History, Settings, Users } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Keshav Agrawal',
    college: 'GLA University, Mathura',
    contact: '+91 6396 055 926',
    role: 'AI Developer',
  },
  {
    name: 'Ankush',
    college: 'GLA University, Mathura',
    contact: '+91 73001 69695',
    role: 'Backend Developer',
  },
  {
    name: 'Harsh Gautam',
    college: 'GLA University, Mathura',
    contact: '+91 79065 04145',
    role: 'Machine Learning',
  },
  {
    name: 'Duanshi Chawla',
    college: 'GLA University, Mathura',
    contact: '+91 70889 71430',
    role: 'Frontend Developer',
  },
  {
    name: 'Saloni Bansal',
    college: 'GLA University, Mathura',
    contact: '+91 81710 55262',
    role: 'Frontend Developer',
  },
];

function AboutUs() {
  const [activeSection, setActiveSection] = useState('team');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center">
          <h1 className="text-3xl font-bold text-white">Financial Advisory Platform</h1>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-3 gap-0">
          {/* Sidebar Navigation */}
          <div className="bg-gray-50 border-r border-gray-200 p-4 space-y-4">
            <button onClick={() => handleSectionChange('purchase')} className="block p-4 text-left hover:bg-gray-100">
            </button>
            <button onClick={() => handleSectionChange('payment')} className="block p-4 text-left hover:bg-gray-100">
              <CreditCard className="inline-block mr-2" /> Payment Preferences
            </button>
            <button onClick={() => handleSectionChange('financial')} className="block p-4 text-left hover:bg-gray-100">
              <Wallet className="inline-block mr-2" /> Financial Info
            </button>
            <button onClick={() => handleSectionChange('history')} className="block p-4 text-left hover:bg-gray-100">
              <History className="inline-block mr-2" /> History
            </button>
            <button onClick={() => handleSectionChange('team')} className="block p-4 text-left hover:bg-gray-100">
              <Users className="inline-block mr-2" /> Team Members
            </button>
            <button onClick={() => handleSectionChange('settings')} className="block p-4 text-left hover:bg-gray-100">
              <Settings className="inline-block mr-2" /> Settings
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 p-6">
            {/* Team Members Section */}
            {activeSection === 'team' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Team Members</h2>
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-sm text-gray-500">{member.college}</p>
                      <p className="text-sm text-gray-500">{member.contact}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Placeholder for other sections */}
            {activeSection !== 'team' && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>Select a section from the sidebar to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
