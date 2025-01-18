import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds initial delay
const HF_TOKEN = Deno.env.get("HUGGING_FACE_ACCESS_TOKEN");

async function retryWithExponentialBackoff(fn: () => Promise<any>, retries: number = MAX_RETRIES): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      
      if (i === retries - 1) {
        throw error; // Last attempt failed
      }
      
      // Exponential backoff
      const delay = RETRY_DELAY * Math.pow(2, i);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Received chat request');

    // Validate Hugging Face token
    if (!HF_TOKEN) {
      console.error('HUGGING_FACE_ACCESS_TOKEN is not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Hugging Face token not configured',
          details: 'Please configure HUGGING_FACE_ACCESS_TOKEN in Supabase secrets'
        }),
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    }

    let prompt;
    try {
      const body = await req.json();
      prompt = body.prompt;
      if (!prompt || typeof prompt !== 'string') {
        throw new Error('Invalid prompt format');
      }
      console.log('Processing prompt:', prompt.substring(0, 100) + '...');
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { 
          status: 400,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    }

    console.log('Initializing Hugging Face client...');
    const hf = new HfInference(HF_TOKEN);
    
    const systemPrompt = `You are a helpful AI assistant powered by Mixtral-8x7B. Provide clear, concise, and accurate responses.
Your responses should be well-structured and easy to understand. When providing code examples, ensure they are practical and well-documented.`;
    
    try {
      console.log('Sending request to Hugging Face...');
      const response = await retryWithExponentialBackoff(async () => {
        const result = await hf.textGeneration({
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 1024, // Increased token limit for more detailed responses
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.15,
            return_full_text: false,
            wait_for_model: true
          }
        });
        
        if (!result || !result.generated_text) {
          throw new Error('Invalid response format from Hugging Face');
        }
        
        return result;
      });

      console.log('Response received:', JSON.stringify(response).substring(0, 200) + '...');

      let cleanResponse = response.generated_text
        .trim()
        .replace(/^Assistant: /, '')
        .replace(/^assistant: /, '');

      console.log('Cleaned response length:', cleanResponse.length);

      return new Response(
        JSON.stringify({ response: cleanResponse }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to get response from Hugging Face',
          details: error.message
        }),
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    }
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  }
});