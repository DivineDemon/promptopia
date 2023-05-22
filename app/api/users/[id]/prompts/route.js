import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/db";

// This Unused 'request' argument is necessary in order to use the '{ params }' argument or else it won't work.
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({
      creator: params.id
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500
    });
  }
};