# Evangadi Forum Project

A Q&A platform similar to Stack Overflow, built with a team of 13 developers.

## Project Structure
- **Backend**: MySQL, Node.js/Express (or your stack)
- **Frontend**: React (or your framework)

## Team Assignments

### Backend Tasks

| Task # | Description | Dependencies | Assignees |
|--------|-------------|--------------|-----------|
| 1 | Create MySQL Database and Table Schema | Frontend Task 7 | Salim, Zemzem |

| 2 | API Documentation Tasks | Frontend Task 1 | Hailu |

| 3 | Implement Authentication Middleware | Frontend Task 2, Helps Task 9 | Meaza |

| 4 | Implement Sign-up API Endpoint | Frontend Task 3 | Solomon, Tilahun |

| 5 | Implement Login API Endpoint | Task 4 | Woinshet |

| 6 | Get Answers for a Question | Frontend Task 5 | Selam |

| 7 | Post Answers for a Question | Frontend Task 9 | Jemal |

| 8 | Get All Questions | Frontend Task 8 | Evenezer, Gzachew |


| 9 | Get Single Question | Frontend Task 9 | Ramadan |


| 10 | Post Question | Frontend Task 6 | Wegari |

### Frontend Tasks

| Task # | Component | Assignees |
|--------|-----------|-----------|
| 1 | Header Component | Hailu |

| 2 | Footer Component | Meaza |

| 3 | Sign-up Component | Solomon, Tilahun |

| 4 | Login Component | Woinshet |

| 5 | About Component | Selam |

| 6 | Sign-up/Sign-in Page | Wegari |

| 7 | Home Page | Salim, Zemzem |

| 8 | Question Page | Evenezer, Gzachew |

| 9 | Answer Page | Jemal, Ramadan |


## Workflow Guidelines

1. **Branch Naming**: ` name/task-[number]` (e.g., `Hailu/task-2`) =>
  use BACK-END Task number

2. **Commits**: Use descriptive messages (e.g, "Implement auth middleware - JWT validation")

3. **Trello**: Update card status when:
   - Starting work → "In Progress"
   - Blocked → @mention lead in comments
   - Completed → "Done"

## Setup Instructions

```bash
# Backend
cd client
npm install
npm run dev

# Frontend
cd server
npm install
npm start