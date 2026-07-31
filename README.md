# Our Love Story Hunt

I want to create a mobile-first web app for a romantic anniversary scavenger hunt.

IMPORTANT:

Do NOT create the mini games yet. This prompt is only for the app foundation, overall styling, password screen, homepage, navigation, and save progress.

Overall Theme

The overall vibe should be:

• Soft pastel color palette only

• Cozy

• Warm

• Romantic

• Slightly mysterious

• Minimalist

• Elegant

• Modern

• Not childish

• Not overly feminine

• Soft rounded corners

• Gentle shadows

• Smooth animations

• Calm transitions

• Lots of whitespace

Think:

"a cozy mystery game made for someone you love."

The UI should feel polished and premium.

------------------------------------

Device Support

Design primarily for:

• iPhone

• Android phones

• iPad

The layout should be responsive.

Phones should be the priority.

Do NOT design for desktop-first.

------------------------------------

Progress Saving

Persist ALL progress using localStorage.

This includes:

• unlocked games

• completed games

• current progress

• anything important

Refreshing the browser or accidentally closing it should never reset progress.

------------------------------------

App Flow

When the app opens:

Show ONLY a lock screen.

The lock screen should resemble a modern phone PIN entry.

Display:

"Enter the 4-digit passcode"

Below it:

A numeric keypad similar to an iPhone keypad.

Correct code:

0811

When entered correctly:

Play a subtle unlock animation.

Then transition to the Home screen.

------------------------------------

Wrong Passcode

If the code is incorrect:

Show:

"Incorrect passcode."

Then display a button:

Need a hint?

If tapped:

Show this message:

"Kiss me first before I give you the hint ❤️"

Then show a button:

"I did 😌"

When tapped:

Reveal:

"The date we officially became us."

Do NOT reveal the actual numbers.

Allow unlimited attempts.

------------------------------------

Homepage

After unlocking:

Display a beautiful homepage.

Top section:

A romantic title.

Example:

"Our Little Adventure"

Below it:

A short subtitle similar to:

"Nine little mysteries await you."

Then display 9 game icons arranged in a neat responsive grid.

Use placeholders only.

Do NOT build the games yet.

Each tile should contain:

• cute icon

• Game 1

• Game 2

...

Game 9

Completed games should eventually display a small checkmark badge (just prepare the UI).

Locked games are NOT needed.

All 9 should be visible.

------------------------------------

Animations

Use subtle animations only.

Examples:

• fade in

• scale slightly on tap

• soft card hover (for iPad)

• smooth page transitions

Avoid flashy effects.

------------------------------------

Code Quality

Organize the project cleanly.

Separate components where appropriate.

Keep the code easy to extend because each mini game will be built in later prompts.

Do not implement the mini games yet.

Just create placeholder pages that can later be replaced.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kesh-lixa-4th-anniversary.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0b63f59e-25ae-44b0-bef0-aeb99b5b7748).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
