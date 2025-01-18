# BlackRose Frontend

## Overview
BlackRose Frontend is a React-based application designed for real-time charting, CSV record management, and seamless user authentication. It uses modern tools and libraries such as Tailwind CSS, Material-UI, Redux, and WebSocket for efficient and scalable frontend development.

## Features
- **Authentication**
  - Login functionality with JWT-based authorization.
  - Protected routes to secure specific pages.

- **Real-Time Charting**
  - Displays real-time OHLC data using Lightweight Charts.
  - WebSocket support for streaming data.

- **CSV Record Management**
  - View, edit, add, and delete records from a table.
  - Pagination support for large datasets.

## Project Structure
```plaintext
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   ├── ProtectedRoute.jsx
│   ├── Chart/
│   │   ├── RealTimeChart.jsx
│   ├── Shared/
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   ├── Table/
│   │   ├── DynamicTable.jsx
│   │   ├── EditableTable.jsx
├── contexts/
│   ├── WebSocketContext.js
├── hooks/
│   ├── useAuth.js
│   ├── useFetchData.js
│   ├── useWebSocket.js
├── pages/
│   ├── CsvRecordsPage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
├── redux/
│   ├── authSlice.js
│   ├── tableSlice.js
│   ├── store.js
├── routes/
│   ├── ProtectedRoute.jsx
│   ├── routesConfig.js
├── services/
│   ├── createSocketConnection.js
├── styles/
│   ├── tailwind.css
├── App.jsx
├── index.js
```

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- npm (>= 6.x)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/blackrose-frontend.git
   cd blackrose-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables
Update the `.env` file to configure your API and WebSocket server endpoints:
```env
REACT_APP_API_URL=https://blackrose-assignment.onrender.com
REACT_APP_SOCKET_URL=https://blackrose-assignment.onrender.com
```

## Dependencies
### Key Dependencies
- **React**: UI library.
- **Redux Toolkit**: State management.
- **Material-UI (MUI)**: UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Socket.IO**: WebSocket communication.
- **Lightweight Charts**: Financial charting library.

### Dev Dependencies
- **TailwindCSS**: Styling.
- **PostCSS**: CSS post-processing.
- **Chart.js Adapter for Date-FNS**: Date formatting for charts.

## Scripts
- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm test`: Runs tests.
- `npm run eject`: Ejects the configuration (not recommended).

## API Endpoints
### Authentication
- **POST** `/auth/login`: Logs in the user and returns a JWT token.

### Records
- **GET** `/record/`: Fetch all records.
- **POST** `/record/`: Add a new record.
- **PUT** `/record/{id}/`: Update an existing record.
- **DELETE** `/record/{id}/`: Delete a record.

### WebSocket
- **Endpoint**: `/ohlc-stream/`
  - Real-time OHLC data stream.

## WebSocket Integration
The application uses Socket.IO for real-time data. Here is an example WebSocket setup:
```javascript
const socket = io(serverUrl, {
  extraHeaders: {
    Authorization: `Bearer ${authToken}`,
  },
  transports: ["polling"],
});
```

## Components Overview
### Navbar
- Displays navigation links (`Dashboard`, `CSV Records`) with dynamic highlighting based on the active route.
- Logout functionality.

### RealTimeChart
- Implements a candlestick chart using Lightweight Charts.
- Consumes OHLC data from the WebSocket context.

### EditableTable
- Provides functionalities to view, edit, add, and delete records.
- Includes validation and error handling using Toasts.

## Contexts
### WebSocket Context
Centralizes WebSocket logic for sharing real-time data across components.

### Usage
```jsx
import { useWebSocketContext } from '../contexts/WebSocketContext';
const { data, sendMessage } = useWebSocketContext();
```

## Styling
### Tailwind CSS
The project uses Tailwind CSS for a consistent and responsive design. Key styles are defined in `tailwind.config.js`.

### Material-UI
Material-UI components are styled dynamically using the theme configuration.

## Running Tests
```bash
npm test
```

## Deployment
Build the application using the following command:
```bash
npm run build
```
The production-ready code will be available in the `build/` directory.

Deploy the `build/` directory to your preferred hosting service (e.g., Netlify, Vercel, or AWS S3).

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the changes:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

