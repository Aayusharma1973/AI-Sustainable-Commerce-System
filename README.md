AI Sustainable Commerce System
Overview
This project is a small AI-powered system built to support sustainable commerce workflows. The idea behind the project is to show how AI can assist businesses in organizing eco-friendly products, generating sustainable purchasing proposals, estimating environmental impact, and eventually supporting customers through an AI-powered WhatsApp bot.
The system is built using a simple React frontend, a Node.js/Express backend, and MongoDB for storing data. AI responses are generated using a language model through the HuggingFace API.
The project is divided into four modules, each solving a specific problem related to sustainable commerce.

Module 1 — AI Product Categorization
This module helps automatically categorize products based on their name and description.
Instead of manually assigning categories, the AI analyzes the product details and generates:
Primary category
Sub-category
SEO tags
Sustainability-related filters
For example, if the user enters a product like “Bamboo Toothbrush”, the AI can classify it under Personal Care → Oral Care and generate SEO tags such as eco-friendly toothbrush or biodegradable bamboo toothbrush.
This makes it easier for an e-commerce platform to organize products and improve search visibility.

Module 2 — AI B2B Proposal Generator
The second module focuses on helping businesses generate sustainable product bundles for bulk purchasing.
The user provides:
Budget
Purpose (for example: corporate gifting or event kits)
Based on these inputs, the AI suggests a set of sustainable products that fit within the provided budget. The response includes the product list, quantities, pricing, and a short sustainability impact summary.
For example, if a company has a ₹50,000 corporate gifting budget, the system might suggest items such as reusable bottles, bamboo notebooks, or eco-friendly tote bags.
This helps businesses quickly plan environmentally responsible product bundles.

Module 3 — AI Impact Reporting Generator
The third module estimates the environmental impact of a purchase.
The user enters product information including:
Product name
Quantity
Price
Using simple sustainability estimation logic, the system calculates:
Estimated plastic waste saved
Estimated carbon emissions avoided
A short explanation of local sourcing impact
A human-readable environmental impact statement
The goal of this module is to show how businesses can communicate sustainability metrics in a simple and understandable way.
For example, the system might generate a statement like:
“This purchase prevents approximately 1.5 kg of plastic waste and avoids 3.6 kg of carbon emissions while promoting sustainable consumption.”

Module 4: AI WhatsApp Support Bot (Architecture)
This module outlines an AI-powered customer support bot integrated with WhatsApp.
Features:
1. Answer order status queries using database data
2. Handle return policy questions
3. Escalate refund requests
4. Log AI conversations

Architecture

Customer (WhatsApp)
|
WhatsApp API (Twilio / Meta)
|
Webhook Server (Node.js)
|
AI Intent Detection
|
Backend Services
|
MongoDB Database


Tech Stack
Frontend
React
Vite
Axios

Backend
Node.js
Express.js

Database
MongoDB
Mongoose

AI Integration
HuggingFace Inference API
LLaMA language model

Running the Project
Backend
Navigate to the server folder and install dependencies:
cd server
npm install
npm start

Frontend
Start the React application.
cd server
npm install
npm start
