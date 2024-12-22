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
    
    // Enhanced system prompt for more complete responses
    const systemPrompt = `You are a helpful AI assistant powered by Mixtral-8x7B. 
    Please provide detailed, accurate, and complete responses to user queries. 
    Make sure to:
    - Address all parts of the question
    - Provide relevant examples when appropriate
    - Explain complex concepts clearly
    - Be concise but thorough`
    
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${prompt} [/INST]`,
      parameters: {
        max_new_tokens: 1000, // Increased token limit for more complete responses
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15
      }
    })

    console.log('Generated response:', response.generated_text)

    return new Response(
      JSON.stringify({ response: response.generated_text }),
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