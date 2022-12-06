export const EXAMPLES = {
  // Calculator example
  Calculator: `
  The application will be a simple calculator app, with section across the top to show the current input and output, and a grid of numbers, and some basic math operations. Also include an equals button for completing the operation. When users click the equals button, the app should display the result of the operation. The app should use minimal and functional Tailwind styling.
  `,

  // Text adventure game
  "Text Adventure Game": `
    The application should be a multiple choice text-adventure game of Lord of the Rings: The Fellowship of the Ring. You will present a short description of the scene, and then 4 options that the user can take to progress the story.

    The game starts in bag end, with Gandalf coming to see Frodo and Bilbo. The game recounts the story of the fellowship of the ring, and includes dialogue in the style of Tolkien.`,

  // Search engine
  "Search Engine": `
    The application is a search engine similar to Google, with a text input (with name attribute "query") and a submit button, wrapped in a form element. When the user types something in, display results related to their query — with a title, description and URL. It should look like Google. Use Tailwind styling.
  `,

  // Pokedex
  Pokedex: `
    The application should be a simulation of a Pokedex, with a form for typing in a Pokemon name. When a name has been entered, a text description of that pokemon should appear as a paragraph, along with an image. A small table of stats about that Pokemon should also appear, such as it's type and favourite attack. Use Tailwind for styling.
  `,

  // Tic tac toe example
  "Tic-Tac-Toe": `
    The application will be a tic-tac-toe game, where there is a grid of buttons, which will contain 0 or X. The app should be initialized with a blank slate.  Each button should have a 'name' attribute to with it's grid coordinates.

    Whenever the user clicks a button, take your turn.
  `,
};

export const MECHANICS_DESCRIPTION = `
I want you to simulate a React application, using Tailwind for styling.

[APP_DESCRIPTION]

I will type user actions such as “User clicked button A” and you will reply with the updated JSX code. I want you to only reply with the output JSX inside one unique code block, and nothing else. Do not write explanations. Do not type actions unless I instruct you to do so. Do not include event handlers, or any JavaScript expressions other than pure JSX. Use 'name' attributes for inputs. Do not include component functions, or any other code other than the JSX output.

Present the JSX now.
`;

export function cleanPrompt(promptText: string) {
  return promptText.replace(/\n\ +/g, "\n").trim();
}
