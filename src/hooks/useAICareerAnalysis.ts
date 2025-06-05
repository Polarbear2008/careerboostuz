
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AICareerAnalysis {
  careerMatches: Array<{
    title: string;
    matchScore: number;
    demand: string;
    salaryRange: string;
    requiredSkills: string[];
    reasoning: string;
  }>;
  skillsAnalysis: {
    strengths: string[];
    improvements: string[];
    marketAlignment: number;
  };
  learningPath: Array<{
    skill: string;
    priority: string;
    estimatedTime: string;
    resources: string[];
  }>;
}

export const useAICareerAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AICareerAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeCareer = async (
    skills: string[], 
    ratings: Record<string, number>, 
    preferences?: any,
    provider: 'openai' | 'gemini' = 'openai'
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Requesting AI career analysis...', { skills, ratings, preferences, provider });

      const { data, error: functionError } = await supabase.functions.invoke('ai-career-analysis', {
        body: {
          skills,
          ratings,
          preferences,
          provider
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      console.log('AI analysis received:', data.analysis);
      setAnalysis(data.analysis);
      return data.analysis;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze career data';
      console.error('Career analysis error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    analysis,
    error,
    analyzeCareer
  };
};
