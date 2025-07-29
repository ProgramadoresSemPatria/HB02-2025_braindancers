FROM golang:1.24-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

COPY . . 
RUN go build -o /bin/HB02-2025_braindancers ./cmd/main.go

FROM alpine:3.18
COPY --from=builder /bin/HB02-2025_braindancers /bin/HB02-2025_braindancers

EXPOSE 9090
ENTRYPOINT ["/bin/HB02-2025_braindancers"]