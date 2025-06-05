
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skills, ratings, preferences, provider = 'openai' } = await req.json();
    
    console.log('AI Career Analysis Request:', { skills, ratings, preferences, provider });

    // Get API keys from environment
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    const geminiKey = Deno.env.get('GEMINI_API_KEY');

    if (!openaiKey && !geminiKey) {
      throw new Error('No AI API keys configured');
    }

    // Prepare user data for analysis
    const userProfile = {
      skills: skills.map((skill: string, index: number) => ({
        name: skill,
        proficiency: ratings[`${skill}-${index}`] || 0
      })),
      preferences: preferences || {},
      totalSkills: skills.length,
      averageProficiency: Object.values(ratings).reduce((a: number, b: number) => a + b, 0) / Object.keys(ratings).length
    };

    const prompt = `
    You are an expert career counselor. Analyze this user's profile and provide career recommendations:

    Skills & Proficiency (0-100 scale):
    ${userProfile.skills.map(s => `- ${s.name}: ${s.proficiency}%`).join('\n')}

    Career Preferences:
    - Interested Areas: ${preferences?.careerAreas?.join(', ') || 'Not specified'}
    - Time Commitment: ${preferences?.timeCommitment || 'Not specified'} hours/week
    - Job Type: ${preferences?.jobType || 'Not specified'}

    Please provide a JSON response with:
    1. Top 5 career matches with realistic match scores (0-100)
    2. Skills analysis with strengths and areas for improvement
    3. Learning recommendations based on current market trends
    4. Salary estimates and job market demand

    Format as valid JSON:
    {
      "careerMatches": [
        {
          "title": "Job Title",
          "matchScore": 85,
          "demand": "High|Medium|Low",
          "salaryRange": "$X - $Y",
          "requiredSkills": ["skill1", "skill2"],
          "reasoning": "Why this matches their profile"
        }
      ],
      "skillsAnalysis": {
        "strengths": ["skill1", "skill2"],
        "improvements": ["skill3", "skill4"],
        "marketAlignment": 75
      },
      "learningPath": [
        {
          "skill": "Skill Name",
          "priority": "High|Medium|Low",
          "estimatedTime": "X weeks",
          "resources": ["resource1", "resource2"]
        }
      ]
    }
    `;

    let aiResponse;

    if (provider === 'gemini' && geminiKey) {
      // Use Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
      });

      const data = await response.json();
      aiResponse = data.candidates[0].content.parts[0].text;
    } else if (openaiKey) {
      // Use OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert career counselor that provides detailed, accurate career guidance based on skills and preferences. Always respond with valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }),
      });

      const data = await response.json();
      aiResponse = data.choices[0].message.content;
    } else {
      throw new Error('No valid API key available');
    }

    // Parse AI response
    let analysis;
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = aiResponse.match(/```json\n(.*?)\n```/s) || aiResponse.match(/\{.*\}/s);
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : aiResponse;
      analysis = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to structured response
      analysis = {
        careerMatches: [
          {
            title: "Data Analyst",
            matchScore: 85,
            demand: "High",
            salaryRange: "$60,000 - $90,000",
            requiredSkills: skills.slice(0, 3),
            reasoning: "Based on your technical skills and analytical mindset"
          }
        ],
        skillsAnalysis: {
          strengths: skills.slice(0, 2),
          improvements: ["Communication", "Leadership"],
          marketAlignment: 75
        },
        learningPath: [
          {
            skill: "Advanced Analytics",
            priority: "High",
            estimatedTime: "6-8 weeks",
            resources: ["Online courses", "Practice projects"]
          }
        ]
      };
    }

    console.log('AI Analysis Result:', analysis);

    return new Response(JSON.stringify({
      success: true,
      analysis,
      provider: provider === 'gemini' && geminiKey ? 'gemini' : 'openai'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI career analysis:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
