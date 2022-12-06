# 🤖 ChatGPT App Simulator 👨‍💻

## What is this?

ChatGPT has this seemingly magical ability to simulate environments both virtual and physical, based on a carefully worded prompt — programming languages, your own house, linux terminals, a popular book or movie. I think we can all agree, it's pretty wild!

After chatting with ChatGPT for a decent chunk of my weekend, I discovered it was also able to simulate UI-based applications, via HTML or JSX. This app gives that idea an interface, so that you can describe the functionality of a simple application and immediately see how it looks, as well as can click links and buttons and submit forms, and see the result.

It's obviously not super smart, but you can give it text directions if it does something wrong, or if you want to make some tweaks.

## How it works

The system is pretty much just a wrapper around ChatGPT, using the so-far-unreleased API. I initially used code from the [chatgpt](https://github.com/transitive-bullshit/chatgpt-api#readme) NPM package, however I wanted to run it in the browser, and that particular library relies on a bunch of Node.js modules — so I instead copied the code into this repo and made some changes to make it browser-compatible, and set up a Next.js API route which proxies through to the ChatGPT server.

The rest of the application is straightforward, however I added the sharable link functionality + backups, so you can bookmark your app and come back to it later.

When a message is received, the JSX is parsed and displayed in a div. The `button` and `form` elements are overridden, and `onSubmit` and `onClick` trigger text prompts, leading to an interactive application.

## Setting Up

I've deployed it to Railway [👉 here 👈](https://chatgpt-app-simulator-production.up.railway.app/), however I'm sure it's only a matter of time before OpenAI blocks the IP address of the server. I ran into issues deploying to Vercel, and without digging deeper my hunch is that the Vercel IP's are blocked by OpenAI.

You'll need to log into OpenAI's [ChatGPT](https://chat.openai.com/chat), and use the web inspector of your browser to get your session cookie. There's an explanation of how to do that in the app.

For best results, you can clone it and run it locally, as long as you have Node.js installed.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Writing a good prompt

I definitely haven't found the sweet spot yet, but do take a look at the examples. The 'Calculator' and 'Text Adventure Game' examples seem to work the best.

The system works by sending text prompts whenever users submit a form, or click a button. If the AI generates a form without a `<form>` element, you can tell it to "Wrap the form in a form element", so that form submissions work as expected. You should also make sure that the AI generates `name` attributes for any inputs. These conditions can be part of your prompt, or directions you give it as you go.

Tailwind is also installed via a CDN. If your app generates without styles, you can say something like "Add Tailwind classes for styling", as well as tell it to tweak styling.

## Reliability

It can be VERY slow, and anecdotally I've noticed that the longer your session lasts, the worse it gets — you may start to see nonsensical results after perfectly reasonable ones, or start to get truncated text — you can always ask it to "Remove all styling" if you're getting the latter. You may have noticed that even on ChatGPT, the response times seem to vary — this could be a combo of the type and lengths of prompts, as well as OpenAI's API scaling. Who knows! 🤷‍♂️

As mentioned earlier, for best results, clone this repo to your repository and run it locally, rather than using the live version.

## Tweaking

If you'd like to have a go at hacking the code, here's a couple of things you could tweak:

- `src/prompts.ts` — contains all the example prompts, as well as the main instruction prompts for generating JSX, called the `MECHANICS_DESCRIPTION` — if you come up with a better mechanics description, I'd love to see it!
- `src/components/app/AppDisplay.tsx` — contains the JSX component overrides, for buttons, form elements and links. You could add your own, or import a library, and tell ChatGPT to use those.