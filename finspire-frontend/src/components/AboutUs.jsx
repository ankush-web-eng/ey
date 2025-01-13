import React, { useState } from 'react';
import {
    User,
    Phone,
    Briefcase,
    GraduationCap,
    Mail,
    ChevronDown
} from 'lucide-react';

const defaultImage = "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png";

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
        image: '/ankush.JPG',
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

const AboutUsPage = () => {
    const [activeSection, setActiveSection] = useState('keshav');

    const SectionHeader = ({
        title,
        icon: Icon,
        section
    }) => (
        <div
            onClick={() => setActiveSection(section)}
            className={`cursor-pointer flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${activeSection === section
                    ? 'bg-yellow-50 text-emerald-700'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
        >
            <div className="flex items-center">
                <Icon className="mr-3" size={24} />
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <ChevronDown
                className={`transform transition-transform ${activeSection === section ? 'rotate-180 text-emerald-500' : 'text-gray-500'
                    }`}
                size={24}
            />
        </div>
    );

    const MemberDetail = ({ member }) => (
        <div className="space-y-6">
            <div className="flex flex-col items-center mb-8">
                <div className="w-48 h-48 rounded-full bg-gray-200 mb-4">
                    <img
                        src={member.image || defaultImage}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                <span className="text-emerald-600 font-semibold">{member.role}</span>
            </div>

            <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <GraduationCap className="text-emerald-500 mr-3" size={24} />
                    <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-medium">{member.college}</p>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Phone className="text-emerald-500 mr-3" size={24} />
                    <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{member.contact}</p>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Briefcase className="text-emerald-500 mr-3" size={24} />
                    <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium">{member.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Meet Our Team
                    </h1>
                </div>

                <div className="grid md:grid-cols-3 gap-0">
                    {/* Sidebar Navigation */}
                    <div className="bg-gray-50 border-r border-gray-200 p-4 space-y-4">
                        <SectionHeader
                            title="Keshav Agrawal"
                            icon={User}
                            section="keshav"
                        />
                        <SectionHeader
                            title="Ankush"
                            icon={User}
                            section="ankush"
                        />
                        <SectionHeader
                            title="Harsh Gautam"
                            icon={User}
                            section="harsh"
                        />
                        <SectionHeader
                            title="Duanshi Chawla"
                            icon={User}
                            section="duanshi"
                        />
                        <SectionHeader
                            title="Saloni Bansal"
                            icon={User}
                            section="saloni"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 p-6">
                        {activeSection === 'keshav' && <MemberDetail member={teamMembers[0]} />}
                        {activeSection === 'ankush' && <MemberDetail member={teamMembers[1]} />}
                        {activeSection === 'harsh' && <MemberDetail member={teamMembers[2]} />}
                        {activeSection === 'duanshi' && <MemberDetail member={teamMembers[3]} />}
                        {activeSection === 'saloni' && <MemberDetail member={teamMembers[4]} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;