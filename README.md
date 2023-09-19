# task-api

Task API is a task management application (ToDo app) designed with AdonisJS v5 and a MySQL database. It allows users to create, view, update, and delete their own tasks once they are logged in.

## Features

- User authentication
- Task creation
- Displaying user tasks
- Modifying user tasks
- Deleting user tasks

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [pnpm](https://pnpm.io/) (v6 or higher)
- [MySQL](https://dev.mysql.com/downloads/) (v5.7 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Marshall-Mathey/task-api.git
   cd task-api
   ```

2. Install dependencies with pnpm:

   ```pnpm install```

3. Copy the .env.example file as .env and configure the necessary environment variables, including database configuration and authentication keys.

4. Run database migrations to create the required tables:

   ```node ace migration:run```

5. Start the application:

   ```pnpm run dev```

The Task-App API should now be accessible at http://localhost:3000.

## Usage

To use the API, you will need to create a user account using the registration endpoint and then log in to obtain an authentication token. You can then use this token to access the task management features.

Be sure to check the list of endpoints:
```node ace list:routes```
