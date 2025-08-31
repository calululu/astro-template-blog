# Astro Blog Template
This is the default astro template to start building projects that require a blog.  
**It's divided into 2 different folders.** :
- The front-end, which is this whole github repo, ready to go. (It also contains Tailwind.)
- The backend, made in Sanity that must be created at the moment.

**Both of these folders need to be deployed on Netlify, Vercel etc.**

## To update the front-end folder
To update Astro run: `npx @astrojs/upgrade`  
To update Tailwind run: `npx @tailwindcss/upgrade`

## Sanity, backend
Log in with sanity on a web browser. Create a new project (and a new org if there are none).  
Add a new member, you, (besides the client) and give yourself the administrator role:
<img width="621" height="164" alt="image" src="https://github.com/user-attachments/assets/c5c409fb-a89b-4679-96e3-720ed7c5e721" />


### Backend
**This will install the backend. Do it on a new folder path**  
Run:
npm `create sanity@latest`  
Choose the production dataset, the clean template, typescript and the **new local path** where to install everything.  
Open VS code and: `npm run dev`  
It will establish a localhost connection at http://localhost:3333/ that requires to be logged in (with the sanity credentials) to enter.
#### Creating a default post
Add a new file in the `schemaTypes` folder named `postType.ts`:
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

## On the front-end folder, run these 2 commands:
```
npx astro add @sanity/astro -y
npm install astro-portabletext
```
# Everything is set up!
