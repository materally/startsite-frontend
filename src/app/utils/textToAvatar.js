export function textToAvatar(text, charCount = 1) {
  return text
    .replace("(", "")
    .split(" ")
    .slice(0, charCount)
    .map((str) => (str ? str[0].toUpperCase() : ""))
    .join("");
}
