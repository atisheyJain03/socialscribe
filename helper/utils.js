const { jsonrepair } = require("jsonrepair");

function removeTrailingCharacters(jsonString) {
  let lastIndex = jsonString.length - 1;

  // Find the index of the last }
  while (lastIndex >= 0 && jsonString[lastIndex] !== "}") {
    lastIndex--;
  }

  // If } is found, remove characters after it
  if (lastIndex >= 0) {
    return jsonString.substring(0, lastIndex + 1);
  } else {
    // No } found, return original string
    return jsonString;
  }
}

function trimTextWithHashtags(text) {
  const hashtagsRegex = /#[^\s#]+/g;
  const hashtags = text.match(hashtagsRegex) || [];
  let textWithoutHashtags = text.replace(hashtagsRegex, "");

  // Calculate available space for text considering the hashtags
  const availableSpace = 207 - hashtags.join(" ").length;

  // Trim text to fit the available space
  let trimmedText = textWithoutHashtags.slice(0, availableSpace);

  // If the trimmed text ends with a space, remove it
  while (trimmedText.endsWith(" ")) {
    trimmedText = trimmedText.slice(0, -1);
  }

  // Add "..." if the text was trimmed
  if (textWithoutHashtags.length > trimmedText.length) {
    trimmedText += "...";
  }

  // Append hashtags back to the trimmed text
  return trimmedText + " " + hashtags.join(" ");
}

function repairJson(jsonString) {
  try {
    const repairedJson = jsonrepair(removeTrailingCharacters(jsonString));
    return repairedJson;
  } catch (error) {
    console.error("Error repairing JSON:", error);
    return null;
  }
}

// Example usage:
// const brokenJsonString = '{"name": "John", "age": 30]};'; // Missing closing bracket
// const repairedJson = repairJson(brokenJsonString);
// console.log("Repaired JSON:", repairedJson);

// Function to draw text with word wrapping
function drawTextWithWordWrap(ctx, text, x, y, maxWidth, lineHeight) {
  // .split("").join(String.fromCharCode(8202))
  const words = text.split(" ");
  let line = "";
  let testLine;
  let metrics;
  let testWidth;

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + " ";
    metrics = ctx.measureText(testLine);
    testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

module.exports = {
  trimTextWithHashtags,
  repairJson,
  drawTextWithWordWrap,
  getRandomElement,
};
