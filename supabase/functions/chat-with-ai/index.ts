import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Received chat request');
    
    // Check if HUGGING_FACE_ACCESS_TOKEN is set
    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!hfToken) {
      console.error('HUGGING_FACE_ACCESS_TOKEN is not set');
      throw new Error('Hugging Face token is not configured');
    }

    // Parse request body
    let prompt;
    try {
      const body = await req.json();
      prompt = body.prompt;
      console.log('Received prompt:', prompt);
    } catch (e) {
      console.error('Failed to parse request body:', e);
      throw new Error('Invalid request body');
    }

    if (!prompt) {
      console.error('No prompt provided');
      throw new Error('No prompt provided');
    }

    // Initialize Hugging Face client
    console.log('Initializing Hugging Face client...');
    const hf = new HfInference(hfToken);
    
    const systemPrompt = `You are a helpful AI assistant powered by Mixtral-8x7B. Provide detailed, accurate, and complete responses.`;
    
    console.log('Sending request to Hugging Face...');
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${prompt} [/INST]`,
      parameters: {
        max_new_tokens: 1000, // Reduced from 2000 to prevent timeouts
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15,
        return_full_text: false
      }
    });

    console.log('Raw response from Hugging Face:', response);

    if (!response || !response.generated_text) {
      console.error('Invalid response from Hugging Face:', response);
      throw new Error('Invalid response from AI model');
    }

    // Clean up the response
    let cleanResponse = response.generated_text
      .replace(systemPrompt, '')
      .replace('<s>[INST]', '')
      .replace('[/INST]', '')
      .replace('User:', '')
      .trim();

    console.log('Clean response:', cleanResponse);

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
    console.error('Error in chat-with-ai function:', error);
    
    // Return a more detailed error response
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