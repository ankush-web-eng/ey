import React, { useState } from 'react';
import {
    CreditCard,
    Wallet,
    BarChart,
    Zap,
    ChevronDown,
    Check,
    RefreshCw,
    History,
    Settings,
    Film,
    User,
    Play,
    BookOpen
} from 'lucide-react';
import axios from 'axios';

const MovieFinancePage = () => {
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState(null);
    const [activeSection, setActiveSection] = useState('details');
    const [formData, setFormData] = useState({
        learningType: 'movie',
        selection: '',
        location: '',
        learningPreferences: {
            movieGenres: [],
            characterTypes: [],
            sceneTypes: [],
            narrativeStyles: [],
            financialTopics: [],
            complexityLevel: ''
        },
        additionalInfo: {
            suggestions: ''
        },
        history: [],
        settings: {
            notifications: true,
            darkMode: false,
            language: 'en'
        }
    });

    const learningOptions = {
        movieGenres: [
            { id: 'drama', name: 'Drama', logo: '🎭' },
            { id: 'action', name: 'Action', logo: '💥' },
            { id: 'comedy', name: 'Comedy', logo: '😄' },
            { id: 'thriller', name: 'Thriller', logo: '🎬' },
            { id: 'documentary', name: 'Documentary', logo: '📹' }
        ],
        characterTypes: [
            { id: 'entrepreneur', name: 'Entrepreneur', logo: '💼' },
            { id: 'investor', name: 'Investor', logo: '📈' },
            { id: 'mentor', name: 'Mentor', logo: '🎯' },
            { id: 'innovator', name: 'Innovator', logo: '💡' },
            { id: 'strategist', name: 'Strategist', logo: '♟️' }
        ],
        sceneTypes: [
            { id: 'negotiation', name: 'Negotiation', logo: '🤝' },
            { id: 'planning', name: 'Planning', logo: '📋' },
            { id: 'crisis', name: 'Crisis', logo: '⚡' },
            { id: 'success', name: 'Success', logo: '🏆' },
            { id: 'failure', name: 'Failure', logo: '📉' }
        ],
        narrativeStyles: [
            { id: 'realistic', name: 'Realistic', logo: '🎯' },
            { id: 'inspirational', name: 'Inspirational', logo: '✨' },
            { id: 'educational', name: 'Educational', logo: '📚' },
            { id: 'analytical', name: 'Analytical', logo: '🔍' },
            { id: 'biographical', name: 'Biographical', logo: '📖' }
        ],
        financialTopics: [
            { id: 'investment', name: 'Investment', logo: '📈' },
            { id: 'budgeting', name: 'Budgeting', logo: '💰' },
            { id: 'trading', name: 'Trading', logo: '📊' },
            { id: 'taxation', name: 'Taxation', logo: '📝' },
            { id: 'insurance', name: 'Insurance', logo: '🛡️' }
        ]
    };

    const handleLearningOptionToggle = (category, optionId) => {
        setFormData(prev => ({
            ...prev,
            learningPreferences: {
                ...prev.learningPreferences,
                [category]: prev.learningPreferences[category].includes(optionId)
                    ? prev.learningPreferences[category].filter(id => id !== optionId)
                    : [...prev.learningPreferences[category], optionId]
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts.length > 1) {
            setFormData(prev => ({
                ...prev,
                [nameParts[0]]: {
                    ...prev[nameParts[0]],
                    [nameParts[1]]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const getAdvice = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://ey-fi8h.vercel.app/api/advice/financial-learning', formData);
            setAdvice(response.data);
        } catch (error) {
            console.error('Error fetching advice:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getAdvice();
    };

    const LearningOptionsSection = ({ category, options }) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <Film className="mr-2 text-emerald-500" size={20} />
                {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {options.map(option => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => handleLearningOptionToggle(category, option.id)}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group shadow-sm ${formData.learningPreferences[category].includes(option.id)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-200'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                    >
                        <span className="text-4xl mb-2 opacity-70 group-hover:opacity-100">{option.logo}</span>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">
                            {option.name}
                        </span>
                        {formData.learningPreferences[category].includes(option.id) && (
                            <Check className="absolute top-2 right-2 text-emerald-500" size={18} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Finance in your own way
                    </h1>
                </div>

                <div className="grid md:grid-cols-3 gap-0">
                    <div className="bg-gray-50 border-r border-gray-200 p-4 space-y-4">
                        <SectionHeader
                            title="Learning Details"
                            icon={BookOpen}
                            section="details"
                        />
                        <SectionHeader
                            title="Learning Preferences"
                            icon={Film}
                            section="preferences"
                        />
                        <SectionHeader
                            title="Additional Info"
                            icon={Wallet}
                            section="additional"
                        />
                        <SectionHeader
                            title="History"
                            icon={History}
                            section="history"
                        />
                        <SectionHeader
                            title="Settings"
                            icon={Settings}
                            section="settings"
                        />
                    </div>

                    <div className="md:col-span-2 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeSection === 'details' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Learning Type
                                        </label>
                                        <select
                                            name="learningType"
                                            value={formData.learningType}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        >
                                            <option value="movie">Movie</option>
                                            <option value="character">Character</option>
                                            <option value="scene">Scene</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {formData.learningType.charAt(0).toUpperCase() + formData.learningType.slice(1)} Details
                                        </label>
                                        <input
                                            type="text"
                                            name="selection"
                                            value={formData.selection}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                            placeholder={`Enter ${formData.learningType} details`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Enter location"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeSection === 'preferences' && (
                                <div className="space-y-6">
                                    <LearningOptionsSection
                                        category="movieGenres"
                                        options={learningOptions.movieGenres}
                                    />
                                    <LearningOptionsSection
                                        category="characterTypes"
                                        options={learningOptions.characterTypes}
                                    />
                                    <LearningOptionsSection
                                        category="sceneTypes"
                                        options={learningOptions.sceneTypes}
                                    />
                                    <LearningOptionsSection
                                        category="narrativeStyles"
                                        options={learningOptions.narrativeStyles}
                                    />
                                    <LearningOptionsSection
                                        category="financialTopics"
                                        options={learningOptions.financialTopics}
                                    />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                                            <BookOpen className="mr-2 text-emerald-500" size={20} />
                                            Complexity Level
                                        </h3>
                                        <select
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                            value={formData.learningPreferences.complexityLevel}
                                            onChange={(e) =>
                                                handleChange({
                                                    target: {
                                                        name: 'learningPreferences.complexityLevel',
                                                        value: e.target.value
                                                    }
                                                })
                                            }
                                        >
                                            <option value="">Select Complexity Level</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                            <option value="expert">Expert</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'additional' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Additional Suggestions or Add-ons
                                        </label>
                                        <textarea
                                            name="additionalInfo.suggestions"
                                            value={formData.additionalInfo.suggestions}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[150px]"
                                            placeholder="Enter any additional suggestions or requirements"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-bold tracking-wide hover:opacity-90 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <RefreshCw className="mr-2 animate-spin" size={20} />
                                                Analyzing Learning Path...
                                            </>
                                        ) : (
                                            'Get Personalized Learning Plan'
                                        )}
                                    </button>
                                </div>
                            )}

                            {activeSection === 'history' && (
                                <div className="space-y-4">
                                    <div className="bg-white p-6 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-semibold mb-4">Learning History</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium">The Wolf of Wall Street - Investment Basics</p>
                                                    <p className="text-sm text-gray-500">2024-03-15</p>
                                                </div>
                                                <span className="text-emerald-600 font-semibold">Completed</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium">Warren Buffett - Investment Philosophy</p>
                                                    <p className="text-sm text-gray-500">2024-03-10</p>
                                                </div>
                                                <span className="text-emerald-600 font-semibold">In Progress</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'settings' && (
                                <div className="space-y-4">
                                    <div className="bg-white p-6 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Notifications</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" checked={formData.settings.notifications}
                                                        onChange={() => setFormData(prev => ({
                                                            ...prev,
                                                            settings: { ...prev.settings, notifications: !prev.settings.notifications }
                                                        }))}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                                </label>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Dark Mode</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" checked={formData.settings.darkMode}
                                                        onChange={() => setFormData(prev => ({
                                                            ...prev,
                                                            settings: { ...prev.settings, darkMode: !prev.settings.darkMode }
                                                        }))}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {advice && (
                    <div className="p-6 bg-gray-50">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="space-y-6">
                                {/* Learning Strategy */}
                                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                                    <h3 className="text-lg font-semibold text-emerald-800 mb-3">Learning Strategy</h3>
                                    <div className="text-gray-700 space-y-2">
                                        <p><strong>Primary Method:</strong> {advice.advice?.optimizationStrategy?.primaryMethod?.platform}</p>
                                        {advice.advice?.optimizationStrategy?.primaryMethod?.details && (
                                            <p><strong>Details:</strong> {advice.advice?.optimizationStrategy?.primaryMethod?.details}</p>
                                        )}
                                        <p><strong>Secondary Method:</strong> {advice.advice?.optimizationStrategy?.secondaryMethod?.platform}</p>
                                        {advice.advice?.optimizationStrategy?.secondaryMethod?.advantages && (
                                            <div>
                                                <strong>Key Takeaways:</strong>
                                                <ul className="list-disc pl-5">
                                                    {advice.advice?.optimizationStrategy?.secondaryMethod?.advantages.map((advantage, index) => (
                                                        <li key={index}>{advantage}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Learning Goals */}
                                {advice.advice?.potentialSavings && (
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-3">Learning Goals</h3>
                                        <p className="text-gray-700 mb-2"><strong>Overall Goal:</strong> {advice.advice.potentialSavings.total}</p>
                                        <div className="text-gray-700">
                                            <strong>Milestones:</strong>
                                            <ul className="list-disc pl-5">
                                                {advice.advice.potentialSavings.breakdown.map((goal, index) => (
                                                    <li key={index}>{goal}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Action Steps */}
                                {advice.advice?.actionSteps && advice.advice.actionSteps.length > 0 && (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">Action Steps</h3>
                                        <ol className="list-decimal pl-5 text-gray-700">
                                            {advice.advice.actionSteps.map((step, index) => (
                                                <li key={index}>{step}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}

                                {/* Progress Assessment */}
                                {advice.advice?.riskAssessment && (
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                                        <h3 className="text-lg font-semibold text-purple-800 mb-3">Progress Assessment</h3>
                                        <div className="text-gray-700">
                                            <p className="mb-2"><strong>Learning Impact:</strong> {advice.advice.riskAssessment.creditScoreImpact}</p>
                                            <strong>Key Challenges:</strong>
                                            <ul className="list-disc pl-5">
                                                {advice.advice.riskAssessment.financialRisks.map((challenge, index) => (
                                                    <li key={index}>{challenge}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Additional Resources */}
                                {(advice.advice?.suggestions?.specificScenario || advice.advice?.contextualRecommendations?.specificScenario) && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                        <h3 className="text-lg font-semibold text-red-800 mb-3">Additional Resources</h3>
                                        <div className="text-gray-700">
                                            {advice.advice?.suggestions?.specificScenario && (
                                                <>
                                                    <strong>Recommended Materials:</strong>
                                                    <ul className="list-disc pl-5 mb-4">
                                                        {advice.advice.suggestions.specificScenario.map((suggestion, index) => (
                                                            <li key={index}>{suggestion}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}

                                            {advice.advice?.contextualRecommendations?.specificScenario && (
                                                <>
                                                    <strong>Further Learning:</strong>
                                                    <ul className="list-disc pl-5">
                                                        {advice.advice.contextualRecommendations.specificScenario.map((recommendation, index) => (
                                                            <li key={index}>{recommendation}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieFinancePage;