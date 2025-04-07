# 🏨 Sapphire Hotel Booking Application



## ✨ Overview

The Sapphire Hotel Booking Application is a modern web interface built with React, TypeScript, and Tailwind CSS that allows users to browse available rooms and make reservations at the Sapphire Hotel.

## 🚀 Features

- Browse available hotel rooms
- View detailed room information and amenities
- Make room reservations
- Manage bookings
- Responsive design with Tailwind CSS
- Beautiful UI components with shadcn/ui

## 📸 Screenshots

### Home Page
![Home Page](/public/home.png)

### Room Reservation
![Room Listings](/public/booking.png)

### Room History
![Booking Interface](/public/reservations.png)

## 🛠️ Technologies Used

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **API**: NESTJS/GraphQL


## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- GraphQL endpoint running on localhost:3000

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/redmoart23/sapphire-hotel-frontend
cd sapphire-hotel-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file based on the `.env.template`:

```bash
cp .env.template .env
```

Then edit the `.env` file and fill in your environment variables:

```
VITE_URL=your_graphql_endpoint
VITE_USER_ID=your_user_id
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is already in use).

## 🔗 GraphQL Integration

This application requires a GraphQL endpoint running on `localhost:3000`. Make sure your GraphQL server is up and running before starting the application.

## 📦 Build for Production

To build the application for production:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## 📄 Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run preview`: Locally preview the production build
- `npm run lint`: Runs ESLint to check code quality
- `npm run test`: Runs tests (if configured)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

Rafael Eduardo Monsalve - redmoart@gmail.com

---

Made with ❤️ for Sapphire Hotel
