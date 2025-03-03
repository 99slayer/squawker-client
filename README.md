# Squawker-client
![logo](./public/squawker-logo.png)

Squawker is my final project for The Odin Project. It aims to replicate the core functionality of Twitter.

Checkout the live preview! 👉 **[Squawker Live Demo](https://99slayer.github.io/squawker-client)**\
**The demo is hosted on a free [render](https://render.com/) instance, so the app may need around one minute to spin up due to inactivity.**

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
Create these environment variables in a `.env` file.
```
VITE_API_URL=<backend_url>
VITE_SUPA_URL=<supabase_database_endpoint>
VITE_SUPA_PUBLIC_KEY=<supabase_public_api_key>
```
This project uses [supabase storage](https://supabase.com/docs/guides/storage) to store and manage user uploaded images.

The Squawker backend has a seperate repo and installation process you can find [here](https://github.com/99slayer/squawker-api).
