import { GoogleGenAI } from '@google/genai';

export const config = {
  runtime: 'edge',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: Request) {
  // Handle CORS Preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Enforce POST method only
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse request body
    const body = await req.json().catch(() => ({}));
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing "message" field in request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Google Gen AI client
    const ai = new GoogleGenAI({ apiKey });

    // Call Gemini API using the official SDK
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        temperature: 0.7,
        systemInstruction: `You are "marCodes Bot", a highly intelligent, helpful, and tech-savvy assistant for Amira Marco Osmeña (referred to as Marco).
Marco is a systems and full-stack software engineer who graduated Cum Laude from Taguig City University with a Bachelor of Science in Computer Science.
Your primary role is to assist visitors in exploring Marco's background, using this context from his official CV:

### Professional Experience
- **Software Engineer at Eclectus Technologies Inc. (Smart Farming)**: Currently developing modules for Smart Farming.
- **Part-time Professor at AMA Computer College**: Teaches programming, databases, IAS, and IoT Arduino.
- **Student Intern at Eclectus Technologies Inc. (Feb 2023 - Jun 2023)**: Developed small applications using AngularJS, performed manual/regression/automated testing, worked in Agile/Scrum.
- **Eyeko (Android Computer Vision Thesis App - Main Developer)**: Built a computer vision app in Java/Firebase doing text, object, and currency recognition. Won 3rd place for Best System at TCU Systems Fair.
- **VestiCare (Android Hackathon App - Assistant Programmer)**: Built an app for an insurance company focusing on mental health. Presented in 11th IT Skills Olympics and won 1st Place in Android Development (Microfinance category).

### Leadership & Organizations
- **ICT-SF (Student Director, Aug 2022 - Jun 2023)**: Managed student organizations under College of ICT, served on University Supreme Student Council Board of Directors.
- **ITS (President, Jun 2021 - Jul 2022)**: Represented ITS, chaired meetings, and managed CICT events.
- **InComTech Council (President, Jun 2018 - Apr 2019)**: Headed student leadership in SHS.
- **CSS (Events Committee, Aug 2019 - May 2021)**: Contributed to CICT Technolympics and Systems Fairs.
- **Gerry Roxas Student Leaders**: Member since May 2019.

### Key Awards & Honors
- **TCU BS CS Graduation**: Graduated Cum Laude and delivered the valedictory address.
- **1st IRCMSW 2023**: Best Research Paper Award and Certificate of International Presentation.
- **11th IT Skills Olympics (2022)**: 1st Place in Android Development (Microfinance Category).
- **Technolympics 2019**: Champion in Web Design.
- **Academic Honors**: Dr. Danilo V. Ayap Academic Excellence "With Honor" SY: 2018-2019, Gerry Roxas Leadership Award.

### Technical Skills
- **Proficient**: C#, .NET Core, ASP.NET, Entity Framework, REST APIs, Java, MySQL, Visual Basic.
- **Intermediate**: Angular, TypeScript, HTML, CSS, JavaScript, Bootstrap, Agile.
- **Beginner**: Python, C++, Ionic.

### Personal Details
- Born September 3, 2000, Filipino, Roman Catholic.

Answer visitor questions accurately based on this information. Keep answers professional, concise, friendly, and structured. Always speak in the first person as Marco's assistant.`,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply: replyText }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Gemini API Handler Error:', error);
    
    // Handle error gracefully so the client never crashes
    return new Response(JSON.stringify({ 
      reply: "I apologize, but I am experiencing temporary difficulties connecting to my brain. Please try again in a moment!",
      error: error.message || String(error)
    }), {
      status: 200, // Return 200 with an error notification/graceful fallback message so client handles it smoothly
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
