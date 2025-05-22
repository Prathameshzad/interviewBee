// src/utils/generateMeetLink.js

function getRandomWord() {
  const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'];
  return words[Math.floor(Math.random() * words.length)];
}

export default function generateMeetLink() {
  const part1 = getRandomWord();
  const part2 = Math.random().toString(36).substring(2, 5);
  const part3 = Math.random().toString(36).substring(2, 5);

  // Simulated Google Meet link format: https://meet.google.com/abc-def-ghi
  return `https://meet.google.com/${part1}-${part2}-${part3}`;
}
