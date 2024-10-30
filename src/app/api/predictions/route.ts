import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const { prompt } = await request.json();

  const prediction = await replicate.predictions.create({
    version: "091495765fa5ef2725a175a57b276ec30dc9d39c22d30410f2ede68a3eab66b3",
    input: {
      prompt,
      hf_lora: "ElemarJR/elemarjr-lora",
      lora_scale: 0.8,
      num_outputs: 1,
      aspect_ratio: "16:9",
      output_format: "webp",
      guidance_scale: 3.5,
      output_quality: 80,
      prompt_strength: 0.8,
      num_inference_steps: 28
    }
  });

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
} 