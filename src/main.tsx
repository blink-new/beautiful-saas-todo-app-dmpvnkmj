
import { ClerkProvider } from "@clerk/clerk-react"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

const CLERK_PUBLISHABLE_KEY = "your_clerk_key" // Replace with your Clerk publishable key

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
)