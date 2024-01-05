
import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from "openai";

const videoId = 'cNjIUSDnb9k';
const apiKey = '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';


YoutubeTranscript.fetchTranscript(videoId)
  .then(transcript => {
    const textArray = transcript.map(entry => entry.text);

    
    const openai = new OpenAI({
      apiKey: apiKey,
    });

  
    return openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "Summarize content you are provided with for a second-grade student."
        },
        {
          "role": "user",
          "content": textArray.join(' ') 
        }
      ],
      temperature: 0.7,
      max_tokens: 290,
      top_p: 1,
    });
  })
  .then(response => {
    const summarizedContent = response.choices[0].message.content;


    console.log(summarizedContent);
    
  })
  .catch(error => {
    console.error('Error fetching transcript or using OpenAI:', error);
  });