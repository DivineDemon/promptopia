import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/db";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt Not Found!", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to Fetch Prompt!", {
      status: 500,
    });
  };
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt Not Found!", {
        status: 404,
      });
    } else {
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
    }

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to Update Prompt!", {
      status: 500,
    });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findByIdAndRemove(params.id);

    if (!prompt) {
      return new Response("Prompt Not Found!", {
        status: 404,
      });
    }

    return new Response("Prompt Deleted Successfully!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to Delete Prompt!", {
      status: 500,
    });
  };
};