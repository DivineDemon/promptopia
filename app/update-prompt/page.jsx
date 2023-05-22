"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return alert("Prompt Not Found!");
    } else {
      try {
        const response = await fetch(`/api/prompt/${promptId}`, {
          method: "PATCH",
          body: JSON.stringify({
            prompt: prompt.prompt,
            tag: prompt.tag,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPrompt({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  return (
    <Form
      type="Update"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePrompt;
