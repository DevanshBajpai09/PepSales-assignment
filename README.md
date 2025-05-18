# Full-Stack Notification Service

This is a full-stack notification service built with a modern web development stack. The project allows users to receive different types of notifications (In-app, Email, SMS) and provides APIs to send and view notifications. The backend uses **PostgreSQL**, **NeonDB**, **RabbitMQ**, and **Twilio**, while the frontend is built using **Next.js**, **TailwindCSS**, **Shadcn UI**, and **React Icons**.

## Features

- **In-app notifications** for user interactions.
- **Email notifications** using **Resend**.
- **SMS notifications** using **Twilio API**.
- API endpoints to **send** and **view** notifications.
- Responsive and interactive frontend with **Next.js**, **TailwindCSS**, and **Shadcn UI**.
- Real-time updates with **RabbitMQ** message queue.
- Fully functional user interface with **React Icons** for icons.

## Technologies Used

### Backend
- **Node.js**: Server-side environment to handle API requests.
- **Next.js**: Full-stack React framework used for building both frontend and backend.
- **Prisma ORM**: For interacting with the PostgreSQL database.
- **PostgreSQL/NeonDB**: Relational database to store notification data.
- **RabbitMQ**: Message queue for handling notification events asynchronously.
- **Twilio**: For sending SMS and email notifications via their respective APIs.

### Frontend
- **Next.js**: Full-stack React framework.
- **TailwindCSS**: Utility-first CSS framework for building responsive and styled components.
- **Shadcn UI**: A design system for building clean and customizable UI components.
- **React Icons**: For adding icons to UI components.

### APIs
- **`/api/notifications`**: Endpoint for sending notifications.
- **`/api/user/[id]/notifications`**: Endpoint for viewing notifications of a specific user.

## Setup

### 1. Clone the Repository
To get started, clone the repository to your local machine:

```bash
git clone https://github.com/DevanshBajpai09/PepSales-assignment.git
cd Pepsales-assignment


