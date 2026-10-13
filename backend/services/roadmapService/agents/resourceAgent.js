import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import llm from "../config/llm.js";
import searchVideo from "../config/youtube.js";

const resourceAgent = async (state) => {
  try {
    const roadmap = state.roadmap;

    if (!roadmap?.modules || !Array.isArray(roadmap.modules)) {
      return state;
    }

    const moduleTitles = roadmap.modules
      .map((module) => module.title)
      .join("\n");

    const docsResponse = await llm.invoke([
      new SystemMessage(`
You are an expert software engineer.

For every module below, return the official documentation.

Rules:
1. Prefer official documentation.
2. If official documentation does not exist, return the best learning article.
3. Return ONLY valid JSON.
4. Do not explain anything.
5. Keep the same title.

Return format:
[
  {
    "title": "",
    "article": ""
  }
]
      `),
      new HumanMessage(`Modules:\n${moduleTitles}`),
    ]);

    let docs = [];

    try {
      const content =
        typeof docsResponse.content === "string"
          ? docsResponse.content
          : JSON.stringify(docsResponse.content);

      const cleanedContent = content
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsedDocs = JSON.parse(cleanedContent);

      if (Array.isArray(parsedDocs)) {
        docs = parsedDocs;
      }
    } catch (error) {
      console.error("Documentation JSON parsing error:", error.message);
    }

    const docsMap = new Map();

    docs.forEach((item) => {
      if (item.title && item.article) {
        docsMap.set(item.title.toLowerCase(), item.article);
      }
    });

    roadmap.modules = await Promise.all(
      roadmap.modules.map(async (module) => {
        let video = null;

        try {
          video = await searchVideo(module.title);
        } catch (error) {
          console.error(
            `Video search failed for ${module.title}:`,
            error.message
          );
        }

        return {
          ...module,
          youtube: video?.url || "",
          article: docsMap.get(module.title.toLowerCase()) || "",
        };
      })
    );

    return {
      ...state,
      roadmap,
    };
  } catch (error) {
    console.error("Resource Agent Error:", error.message);
    return state;
  }
};

export default resourceAgent;