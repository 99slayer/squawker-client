# Squawker-client
Squawker is my final project for The Odin Project. It aims to replicate the core functionality of Twitter.\
![Project image 1.](/public/squawker-1.png)\
![Project image 2.](/public/squawker-2.png)

🚨🚨🚨\
**The live preview is hosted on a free [render](https://render.com/) instance, and may need around one minute to spin up, due to inactivity, on login.**\
🚨🚨🚨

Checkout the live preview! 👉 **[Squawker Live Preview](https://99slayer.github.io/squawker-client)**\
Checkout the back-end repo! 👉 **[Squawker-api](https://github.com/99slayer/squawker-api)**

#### Features
- Account creation
- Account updating
- Homepage timeline
- User profiles
- User profile pictures and profile headers
- User followers and following
- Post/comment creation (including images!)
- Post/comment editing
- Post/comment quoting and reposting
- Post/comment liking
- Guest login

#### Client Tech Stack
- HTML5
- CSS
- Tailwind
- React
- TypeScript
- Supabase

#### Installation
To install the project locally run the following commands.
```
git clone git@github.com:99slayer/squawker-client.git
cd squawker-client
npm install
```
Start the development server with `npm run dev`

#### Usage
Create the following .env files and variables in the project’s root directory.

.env.development
```
VITE_SUPA_URL=<supabase development project url>
VITE_SUPA_PUBLIC_KEY=<supabase development project public api key>
VITE_API_URL=<development backend url>
VITE_BUCKET=<supabase development project bucket>
```
.env.production
```
VITE_SUPA_URL=<supabase production project url>
VITE_SUPA_PUBLIC_KEY=<supabase production project public api key>
VITE_API_URL=<production backend url>
VITE_BUCKET=<supabase production project bucket>
```
This project uses [supabase storage](https://supabase.com/docs/guides/storage) to store and manage user uploaded images.

The Squawker backend has a seperate repo and installation process you can find [here](https://github.com/99slayer/squawker-api).
