# Iniflux

A simple, self-hosted client for the [Miniflux](https://github.com/miniflux) RSS reader built with React and Express.

Currently read-only.

![screenshot](https://user-images.githubusercontent.com/5141427/132085068-a4d7dbd7-0c74-4ca9-9a55-c4192b1ac1a4.png)

This is mainly a way for me to learn to create a full-stack React app but was also motivated by the desire for a better viewing experience with Miniflux. I appreciated the philosophy of the project but wanted something with a little more flare.

## Requirements

You must have an installation of Miniflux running as well as an API key generated (Settings -> API Keys -> Create a new API key).

## Development

```sh
# Clone repository
git clone https://github.com/jchue/iniflux.git

# Install dependencies
cd iniflux
npm install
cd client
npm install

# Set backend
cd ..
touch .env
```

Populate `.env` with the environment variables listed below. Then:

```sh
npm run dev
```

## Installation

Clone this repository first.

### docker run

```sh
docker build -t iniflux .

docker run -e MINIFLUX_API_KEY=<Miniflux API key> -e MINIFLUX_BASE_URL=<Miniflux installation URL> -p 3001:3001 iniflux
```

### docker-compose

```yml
---
version: "3.8"
services:
  iniflux:
    build: .
    environment:
      - MINIFLUX_API_KEY=<Miniflux API key>
      - MINIFLUX_BASE_URL=<Miniflux installation URL>
    ports:
      - "3001:3001"
```

## Environment Variables

Variable|Description|Example
-|-|-
MINIFLUX_API_KEY|The API key generated from Miniflux|aR3allylongsTR1ngoFcharaC+ErsNumB=RsandsYmbol$
MINIFLUX_BASE_URL|The base URL of your Miniflux installation (not the API endpoint)|http://localhost:8080
