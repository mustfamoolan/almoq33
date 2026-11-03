# syntax=docker/dockerfile:1

# ---------- Frontend build ----------
FROM node:20-alpine AS frontend
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---------- Backend build ----------
FROM golang:1.26-alpine AS backend
WORKDIR /src
RUN apk add --no-cache git ca-certificates
COPY go.mod go.sum ./
RUN go mod download
COPY . .
COPY --from=frontend /src/public ./public
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/almoq3 .

# ---------- Runtime ----------
FROM alpine:3.21
WORKDIR /app
RUN apk add --no-cache ca-certificates tzdata \
    && addgroup -S app && adduser -S app -G app
COPY --from=backend /out/almoq3 ./almoq3
COPY --from=frontend /src/public ./public
RUN mkdir -p storage/logs storage/uploads storage/framework/cache \
    && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["./almoq3"]
