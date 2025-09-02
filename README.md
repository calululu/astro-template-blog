# Astro Blog Template
This is the default astro template to start building projects that require a blog.  
**It's divided into 2 different folders.** :
- The front-end, **which is this whole github repo**, ready to go. (It also contains Tailwind.)
- The backend, made in Sanity that must be created at the moment.
---

## Setup this github repo, the front-end
### To update this front-end folder
Try to `npm run dev` and see if it asks for a newer version of Astro. Run these 2 commands to update the dependencies:
- To update Astro run: `npx @astrojs/upgrade`  
- To update Tailwind run: `npx @tailwindcss/upgrade`

### Setup the blog
Run these 2 commands:
```
npx astro add @sanity/astro -y
npm install astro-portabletext
```
Update the `astro.config.mjs`:
```
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

export default defineConfig({
  site: "https://websiteURLexample.it", //edit website url
  vite: { plugins: [tailwindcss()] },
  integrations: [
    // 👇 Update these lines
    sanity({
      projectId: "MY-PROJECT-ID", // edit project id
      dataset: "MY-DATASET-NAME", // edit dataset name
      useCdn: false, // for static builds
    }),
  ],
});
```
#### Now Sanity posts can be displayed on the front-end
---

## Sanity, backend
The Sanity backend must be created at the moment.  
Log in with sanity on a web browser with the client account. Create a new project (and a new org if there are none).  
Add a new member, you, (besides the client) and give yourself the administrator role:
<img width="621" height="164" alt="image" src="https://github.com/user-attachments/assets/c5c409fb-a89b-4679-96e3-720ed7c5e721" />

### Backend
**This will install the backend. Do it on a new folder path**  
Run: `npm create sanity@latest`  
Choose the production dataset, the clean template, typescript and the **new local path** where to install everything.  
Open VS code and: `npm run dev`  
It will establish a localhost connection at http://localhost:3333/ that requires to be logged in (with the sanity credentials) to enter.
#### Creating a default post
Add a new file in the folder `schemaTypes` named `postType.ts`:
```
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
```
And add in the `index.ts` inside the `schemaType` folder the `postType.ts`:
```
import {postType} from './postType'
export const schemaTypes = [postType]
```
Now a new default post can be created.
---

# How to self-host both the front-end and the back-end
This example is for Netlify.  
Deploy both the studio backend and the astro front end on Netlify, to have 2 projects with 2 different URLs.  
The Astro front-end is already recognized by Netlify, but to deploy the studio:
- Add the build command `npm run build`.
- Add the folder path '*/dist*' in the Publish Directory.
- Add env table with the dataset and projectID when you are really publishing the website online.
- Leave other fields blank.

In the Sanity webpage go to `API --> CORS Origins --> Add CORS origin --> Insert the website URL`.  
Add in the Sanity Backend `sanity.cofig.ts` this: 
```
  basePath: '/studio', // Pick whatever name, watch out for route conflicts
```
It means that you will find the studio back end by going `yourAllowedDomain.com/studio`.  
Trigger the build process once again on the Sanity Back-End and you are ready.
