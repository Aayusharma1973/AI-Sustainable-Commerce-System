import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const hf = new HfInference(process.env.HF_API_KEY);

export const generateAIResponse = async (prompt) => {

  try {

    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.error("HF error:", error);
    throw error;

  }
};