import { END, START, StateGraph } from "@langchain/langgraph";
import interviewState from "./state.js";
import { feedbackNode, interviewNode, summaryNode } from "./nodes.js";
import { interviewAgent } from "../agents/interviewAgent.js";
import { feedbackAgent } from "../agents/feedbackAgent.js";
import { summaryAgent } from "../agents/summaryAgent.js";

function router(state){
    switch (state.action){
        case "start":
            return "interviewAgent";
        
        case "feedback":
            return "feedbackAgent";

        default:
            return END;
    }
}

function feedbackRouter(state) {
    if(state.completed) {
        return "summaryAgent";
    }

    return END;
}


const graph = new StateGraph(interviewState)
.addNode("interviewAgent", interviewNode)
.addNode("feedbackAgent", feedbackNode)
.addNode("summaryAgent", summaryNode)

.addConditionalEdges(
    START,
    router,
    {
        interviewAgent: "interviewAgent",
        feedbackAgent: "feedbackAgent"
    }
)
.addEdge(
    "interviewAgent",
    END
)
.addConditionalEdges(
    "feedbackAgent",
    feedbackRouter,
    {
        summaryAgent: "summaryAgent",
        [END]: END
    }
)
.addEdge(
    "summaryAgent",
    END
)
.compile()

export default graph