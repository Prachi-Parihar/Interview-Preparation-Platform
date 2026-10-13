import { StateGraph } from "@langchain/langgraph";
import { RoadmapState } from "./roadmapState.js";
import roadmapAgent from "../agents/roadmapAgent.js";
import resourceAgent from "../agents/resourceAgent.js";



const graph = new StateGraph(RoadmapState)
.addNode("roadmapAgent" , roadmapAgent)
.addNode("resourceAgent" ,resourceAgent)
.addEdge("__start__","roadmapAgent")
.addEdge("roadmapAgent","resourceAgent")
.addEdge("resourceAgent", "__end__")
.compile()

export default graph