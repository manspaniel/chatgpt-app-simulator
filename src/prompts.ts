export const EXAMPLES = {
  "Tic-Tac-Toe": `
    The application will be a tic-tac-toe game, where there is a grid of buttons, which will contain 0 or X. The app should be initialized with a blank slate. Whenever the user clicks a button, the AI will take a turn and the board will update.
  `,
  Calculator: `The application is a search engine similar to Google, with a text input (with name attribute "query") and a submit button, wrapped in a form element. When the user types something in, display results related to their query — with a title, description and URL. It should look like Google. Use Tailwind styling.
  `,
  "Text Adventure Game": `The application should be a multiple choice text-adventure game of Lord of the Rings: The Fellowship of the Ring. You will present a short description of the scene, and then 4 options that the user can take to progress the story.

  The game starts in bag end, with Gandalf coming to see Frodo and Bilbo. The game recounts the story of the fellowship of the ring, and includes dialogue in the style of Tolkien.`,
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
