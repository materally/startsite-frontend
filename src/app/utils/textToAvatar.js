export function textToAvatar(text, charCount) {
  return text
    .split(" ")
    .slice(0, charCount)
    .map((str) => (str ? str[0].toUpperCase() : ""))
    .join("");
}
