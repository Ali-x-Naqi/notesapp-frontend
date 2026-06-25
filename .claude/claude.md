# NotesApp Frontend — Claude Code Context

## Project

Full-stack Notes CRUD app.
Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4
Backend: Separate Django repo (notesapp-backend)

## This Repo — Frontend Only

No API routes here. Backend is Django on port 8000.
All fetch calls go to: process.env.NEXT_PUBLIC_API_URL

## Folder Structure

src/app/ — pages and routing only
src/components/ — UI components, one job each
src/hooks/ — logic only, no UI
src/types/ — TypeScript interfaces
src/utils/ — pure helper functions
src/**tests**/ — all tests

## Rules

- Named imports always: import { x } from '@/lib/x'
- Early returns — no nested if/else
- No API routes in this repo
- Run npm run lint && npm test before every PR

## Environment Variables

NEXT_PUBLIC_API_URL=http://localhost:8000

## Test Command

npm test — must show tests passing

## Trello Board

https://trello.com/b/oB2VfLcf/training-ali-naqi
