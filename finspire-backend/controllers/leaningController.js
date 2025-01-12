const MovieFinanceService = require('../services/movieFinanceService');

exports.getFinancialLearningPlan = async (req, res) => {
  try {
    // Validate required fields
    const requiredPreferences = [
      'movieGenres',
      'characterTypes',
      'sceneTypes',
      'narrativeStyles',
      'financialTopics'
    ];

    const formData = req.body;
    
    // Check if learning preferences exist and are arrays
    if (!formData.learningPreferences) {
      return res.status(400).json({ 
        error: 'Missing learning preferences' 
      });
    }

    for (const pref of requiredPreferences) {
      if (!Array.isArray(formData.learningPreferences[pref])) {
        return res.status(400).json({ 
          error: `Invalid ${pref} format. Expected an array.` 
        });
      }
    }

    // Check for required basic fields
    if (!formData.learningType || !formData.selection) {
      return res.status(400).json({ 
        error: 'Learning type and selection are required' 
      });
    }

    const advice = await MovieFinanceService.generateFinancialLearningPlan(formData);
    
    res.json(advice);
  } catch (error) {
    console.error('Financial Learning Plan Error:', error);
    res.status(500).json({
      error: 'Failed to generate financial learning plan',
      details: error.message
    });
  }
};