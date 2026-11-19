import * as React from "react"
import { createRoot } from "react-dom/client"
import ParallelReality from "./ParallelReality"
import "./styles.css"

const container = document.getElementById("root")
if (!container) throw new Error("Missing application mount point")

createRoot(container).render(
  <React.StrictMode>
    <ParallelReality intro={true} initialSplit={44} />
  </React.StrictMode>
)
