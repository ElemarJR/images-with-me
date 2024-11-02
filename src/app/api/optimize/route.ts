import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Definindo o tipo para a resposta da OpenAI
interface OpenAIMessage {
  content: string | null;
}

interface OpenAIChoice {
  message: OpenAIMessage;
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are an expert AI prompt engineer specializing in photorealistic portrait photography. Your task is to enhance and optimize prompts to create stunning, professional-quality images.

For each prompt, incorporate these critical elements:

- Subject: "elemarjr" (trigger word) must be the first word and main focus
- Physical characteristics: 6'3" tall, 230 lbs, completely bald head (explicitly mention no hair)
- Composition: Specify precise camera angle, distance, and framing
- Technical details: Include specific camera model, lens type/focal length, lighting setup
- Style: Emphasize photorealistic rendering, natural skin textures, proper depth of field
- Enhancement keywords: Ultra HD, 8K, hyperrealistic, photographic, masterful photography
- Post-processing: Mention color grading, contrast levels, and professional retouching
- Environmental context: Include setting, lighting conditions, and atmosphere
- ALL the elements of the original prompt needs to be present in new optimized version. Please, DO NOT REMOVE ANY DETAIL originally provided.

Format each prompt to follow this structure:
1. Subject identifier
2. Physical description
3. Camera/technical specifications
4. Composition/framing
5. Lighting/atmosphere
6. Style/quality markers

Generate 4 distinct variations, each on a new line, maintaining photorealistic quality while varying:
- Camera angles
- Lighting scenarios
- Environmental contexts
- Emotional tones

Each prompt should read like a professional photographer's technical shot list while maintaining natural language flow.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const optimizedPrompts = completion.choices[0].message.content
      ?.split('\n')
      .filter((line: string) => line.trim())
      .slice(0, 3);

    if (!optimizedPrompts || optimizedPrompts.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate optimized prompts' },
        { status: 500 }
      );
    }

    return NextResponse.json({ prompts: optimizedPrompts }, { status: 200 });

  } catch (error) {
    console.error('Error optimizing prompt:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to optimize prompt' },
      { status: 500 }
    );
  }
} 