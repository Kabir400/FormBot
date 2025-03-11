# Form Builder App

## Project Overview
This Form Builder app allows users to create and manage forms while enabling others to fill out those forms via public links. It features account creation, form editing, response tracking, and a customizable interface with light/dark mode support.

---

## Features & Functionality

### 1. Authentication (Login & Signup)
- Implemented JWT-based authentication for secure user management.
- Passwords are encrypted using `bcryptjs` to ensure security.
- Users can log in to create forms, manage responses, and track submissions.

### 2. Form Creation & Management
- Users can create forms with customizable input fields and placeholders.
- Forms can be grouped under folders for better organization.
- Features include the ability to:
  - Create, edit, and delete forms.
  - Create and delete folders.

### 3. Form Responses
- Users can view submission data for their created forms.
- Submissions include user details (name and email) for improved tracking.
- Form submissions update only when all required fields are filled.

### 4. Sharing & Accessibility
- Forms are accessible through public links for easy distribution.
- Users can invite others via email for collaboration and sharing.

### 5. UI/UX Enhancements
- Designed a pixel-perfect UI following the provided [Figma Design](https://www.figma.com/design/wH7YMU2fX7KXog0nwiIinF/MERN-Final-Evaluation-DEC24?node-id=0-1&p=f&t=dAbZBrvuLdKnDnB8-0).
- Developed a responsive design for both desktop and mobile views (for form-filling only).
- Added light/dark mode for improved user experience.

### 6. Error Handling & Validations
- Implemented comprehensive error handling for both frontend and backend.
- Integrated basic form validations to ensure data accuracy.

---

## Tech Stack
- **Frontend:** React, Vanilla CSS (with modular CSS structure)
- **Backend:** Node.js (Express), MongoDB
- **Authentication:** JWT (using `jsonwebtoken`) with password encryption via `bcryptjs`
- **Toasts & Notifications:** Integrated a toast library for improved user feedback

---

## Installation Instructions

### Step 1: Clone the Repository
```bash
git clone <repo_link>
cd <repo_name>
```

### Step 2: Install Dependencies
For Server:
```bash
cd server
npm install
```

For Client:
```bash
cd client
npm install
```

### Step 3: Environment Variables

#### Server `.env` Sample
```
PORT=8000
MONGO_URI=<your_mongodb_connection_string>
TOKEN_SECRET_KEY=<your_jwt_secret>
```

#### Client `.env.local` Sample
```
VITE_BASE_URL=<your_backend_url>
```

### Step 4: Run Locally
For the client:
```bash
cd client
npm start
```

For the server:
```bash
cd server
node index.js
```

---

## Project UI

### Auth Page
![Landing Page](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668719/Signup_Screen_ulyrbv.png)

### Landing Page
![Landing Page](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668718/Landing_Page_kqzuxm.png)

### Dashboard
![Dashboard](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668718/Post_Login_Screen_nzegip.png)

### Form Creation
![Form Creation](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668862/Screen_with_multiple_form_lgnqhj.png)

![Form Creation](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668716/Container_2_kgrktp.png)


### Form Responses
![Form Responses](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668716/Analytics_teqfjj.png)


### Form Fill Up
![Form Fill Up](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741668718/Publish_form_Desktop_rd358z.png)


---

 


