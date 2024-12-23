import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))
    
    const systemPrompt = `You are a helpful AI assistant powered by Mixtral-8x7B. Provide detailed, accurate, and complete responses.`
    
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${prompt} [/INST]`,
      parameters: {
        max_new_tokens: 2000, // Increased token limit for more complete responses
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15
      }
    })

    // Clean up the response by removing the system prompt and instruction tags
    let cleanResponse = response.generated_text
      .replace(systemPrompt, '')
      .replace('<s>[INST]', '')
      .replace('[/INST]', '')
      .replace('User:', '')
      .trim()

    return new Response(
      JSON.stringify({ response: cleanResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})