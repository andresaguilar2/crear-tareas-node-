# Tasks API (Node + Express + TypeScript)

Arquitectura por capas: `controller/`, `service/`, `repository/`, `model/`, `dto/`, `mapper/`.

## Endpoints
- `POST /tasks` → crea tarea
- `GET /tasks?status=PENDING|IN_PROGRESS|DONE` → lista/filtra
- `PATCH /tasks/:id/status` (body: `{ "status": "DONE" }`) → actualiza estado
- `DELETE /tasks/:id` → elimina
- `GET /tasks/overdue` → (opcional) vencidas

## Ejecutar
```bash
npm install
npm run dev   # modo desarrollo (ts-node-dev)
# o
npm run build && npm start
```
