# Voya

We are implementing a collaborative travel planning website called Voya. Users will be able to browse activities at different locations across the globe and add them to itineraries, as well as manually adding trips found elsewhere. They will have the ability to share itineraries between users, and each user will be able to edit them.

To run our project locally, run `npm install`, then `npm run dev` to see it locally.

## Routes:

`/` - Home Page
- The landing page of Voya

`/plan-a-trip` - Plan A Trip
- Users can search for destinations

`/signin` - Sign In
- Users can sign in to their profile

`/signup` - Sign Up
- Users can create a new account

`/add-trip` - Add Trip
- Users can manually add a trip that they've found elsewhere

`/destination/:destinationId` - Destination
- The details page of an individual destination, where the destinationId is the name of the destination

`*` - Page Not Found
- A 404 page for any other URL

### Protected Routes:

`/profile` - Profile
- Users can edit their profiles

`/trips` - Trips
- Users can see and edit the trips that they've added

`/shared-trips` - Shared Trips
- Users can see and edit the trips that other users have shared with them

## Live URLs:
- Vercel deployment: https://voya-travel-planner.vercel.app/
- Render: https://voya-3gua.onrender.com

## Tech stack list:

### Frontend:
- React
- Vite
- React Router
- JavaScript / JSX
- CSS, CSS Modules, Tailwind CSS
- React Hot Toast

### Backend:
- Node.js
- Express.js
- REST API
- Mongoose
- bcrypt
- JWT

### Database:
- MongoDB
- MongoDB Atlas

### Deployment:
- Vercel
- Render
- MongoDB Atlas

### Development:
- Git + GitHub
- Figma


## What we Learned:

We learned what goes into building a full stack application, both frontend and backend design and implementation. This includes how to design our site in figma and then use AI to turn that into a base we can start with, how to design and implement a database, and connect it to our frontend, how to make reusable and dynamic react components, how to fetch and parse API data, and how to manage and divide tasks efficiently. We learned how to work in a group towards a goal and change project scope as needed.