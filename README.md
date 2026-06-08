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
