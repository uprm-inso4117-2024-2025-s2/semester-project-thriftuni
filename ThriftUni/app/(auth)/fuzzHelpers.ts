// app/auth/fuzzHelpers.ts

export const fuzzStrings = [
    "'; DROP TABLE users;--",
    "<script>alert('XSS')</script>",
    "null",
    "undefined",
    "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥",
    "💥💥💥💥💥",
    "a".repeat(1000), // Super long string
    "\\' OR '1'='1",
    "\0\0\0", // Null characters
    "☺☻♥♦♣♠•◘○", // Random unicode
    "\"\"\"\"",
    "' OR ''='",
    "🤯🤯🤯🤯🤯",
  ];
  