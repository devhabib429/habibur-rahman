import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryWithDelay(fn: () => Promise<any>, retries: number = MAX_RETRIES): Promise<any> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${MAX_RETRIES - retries + 1} attempt`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryWithDelay(fn, retries - 1);
    }
    throw error;
  }
}

serve(async (req) => {
  // This is critical - handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Received chat request');
    
    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!hfToken) {
      console.error('HUGGING_FACE_ACCESS_TOKEN is not set');
      throw new Error('Hugging Face token is not configured');
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
      throw new Error('Invalid request format');
    }

    console.log('Initializing Hugging Face client...');
    const hf = new HfInference(hfToken);
    
    const systemPrompt = `You are a helpful AI assistant powered by Mixtral-8x7B. Provide clear and concise responses.`;
    
    try {
      console.log('Sending request to Hugging Face...');
      const response = await retryWithDelay(async () => {
        const result = await hf.textGeneration({
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 512,
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
      throw new Error(`Failed to get response from Hugging Face: ${error.message}`);
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