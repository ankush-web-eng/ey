const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class MovieFinanceService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateFinancialLearningPlan(formData) {
    const prompt = `
    You are a financial education expert specializing in movie-based learning experiences. 
    Create a personalized financial learning plan based on the following preferences:

    Learning Type: ${formData.learningType}
    Selection: ${formData.selection}
    Location: ${formData.location}
    
    Movie Genres: ${formData.learningPreferences.movieGenres.join(', ')}
    Character Types: ${formData.learningPreferences.characterTypes.join(', ')}
    Scene Types: ${formData.learningPreferences.sceneTypes.join(', ')}
    Narrative Styles: ${formData.learningPreferences.narrativeStyles.join(', ')}
    Financial Topics: ${formData.learningPreferences.financialTopics.join(', ')}
    Complexity Level: ${formData.learningPreferences.complexityLevel}
    
    Additional Suggestions: ${formData.additionalInfo.suggestions}

    Please provide a comprehensive learning plan in the following JSON structure:
    {
      "advice": {
        "optimizationStrategy": {
          "primaryMethod": {
            "platform": "string",
            "details": "string"
          },
          "secondaryMethod": {
            "platform": "string",
            "advantages": ["string"]
          }
        },
        "potentialSavings": {
          "total": "string",
          "breakdown": ["string"]
        },
        "actionSteps": ["string"],
        "riskAssessment": {
          "creditScoreImpact": "string",
          "financialRisks": ["string"]
        },
        "suggestions": {
          "specificScenario": ["string"]
        },
        "contextualRecommendations": {
          "specificScenario": ["string"]
        }
      }
    }

    Ensure the response:
    1. Matches the selected complexity level
    2. Incorporates the chosen movie genres and narrative styles
    3. Features relevant character types and scene types
    4. Addresses selected financial topics
    5. Provides actionable learning steps
    6. Includes specific movie scenes or examples
    7. Offers practical financial lessons from media content
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      return JSON.parse(response);
    } catch (error) {
      throw new Error(`Failed to generate learning plan: ${error.message}`);
    }
  }
}

module.exports = new MovieFinanceService();