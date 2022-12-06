export const EXAMPLES = {
  "Tic-Tac-Toe": `
    The application will be a tic-tac-toe game, where there is a grid of buttons, which will contain 0 or X. The app should be initialized with a blank slate. Whenever the user clicks a button, the AI will take a turn and the board will update.
  `,
  Calculator: `The application will be a simple calculator app, with section across the top to show the current input and output, and a grid of numbers, and some basic math operations. Also include an equals button for completing the operation. When users click the equals button, the app should display the result of the operation.`,
  "Text Adventure Game": `The application should be a multiple choice text-adventure game of Lord of the Rings: The Fellowship of the Ring. You will present a short description of the scene, and then 4 options that the user can take to progress the story.`,
  "Search Engine": `The application is a search engine similar to Google, with a text input for searching and a submit button. When the user types something in, they'll get a list of results.`,
};

export const MECHANICS_DESCRIPTION = `
I want you to simulate a React application, using Tailwind for styling.

[APP_DESCRIPTION]

I will type user actions such as “User clicked button A” and you will reply with the updated JSX code. I want you to only reply with the output JSX inside one unique code block, and nothing else. Do not write explanations. Do not type actions unless I instruct you to do so. Do not include event handlers, or any JavaScript expressions other than pure JSX.

Present the JSX now.
`;

export function cleanPrompt(promptText: string) {
  return promptText.replace(/\n\ +/g, "\n").trim();
}
