# Instagram Remastered

### A real-time messaging interface built with React, TypeScript, and native WebSockets.

**Instagram Remastered** explores the frontend of an event-driven chat application: a focused messaging experience, a lightweight WebSocket transport, and a dedicated Go service on the other end of the connection.

Rather than hiding real-time communication behind a large client SDK, the project uses the browser's WebSocket API and a simple JSON event envelope. The result is an understandable foundation for building interactive conversations and evolving the protocol independently of the interface.

## Highlights

- **React + TypeScript UI** — component-based client built with Vite.
- **Native WebSocket integration** — establishes a browser connection to the companion Go service and handles incoming socket events.
- **Event-driven communication** — outgoing events and incoming messages follow a `type` / `payload` envelope.
- **Messaging interface** — a conversation view, message composer, and chatroom selection controls provide the basis for a full chat experience.
- **Composable interface elements** — Tailwind CSS for styling, with Headless UI and Heroicons for the header menu.
- **Separate frontend and backend** — the client and WebSocket server live in independent repositories with a clear protocol boundary.

## Architecture

```text
React application
├── Header
│   └── Options dropdown
└── Messenger
    ├── Chatroom controls
    ├── Message composer
    ├── WebSocket client
    └── Incoming event dispatcher
             │
             │  JSON events over WebSocket
             ▼
       Go WebSocket service
       ws://localhost:8080/ws
```

The interface currently recognizes a `new_message` event type and emits `send_message` events. Both sides share the concept of an event envelope, which provides a starting point for formalizing a typed protocol.

## Tech Stack

| Area                | Technology             |
| ------------------- | ---------------------- |
| UI                  | React 18, TypeScript   |
| Tooling             | Vite                   |
| Styling             | Tailwind CSS, PostCSS  |
| UI primitives       | Headless UI, Heroicons |
| Real-time transport | Browser WebSocket API  |
| Companion service   | Go, Gorilla WebSocket  |

## Getting Started

**Requirements:** Node.js and npm. Run the [companion Go server](https://github.com/dimkasss/websocket-golang) separately when working on the WebSocket integration.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The WebSocket endpoint is currently configured in `src/components/Messenger.tsx` as `ws://localhost:8080/ws`.

Other available commands:

```bash
npm run build
npm run lint
npm run preview
```

## Backend

The real-time transport service is maintained in a separate repository: **[websocket-golang](https://github.com/dimkasss/websocket-golang)**.
