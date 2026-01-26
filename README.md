# 🐕 Dogecoin Core tRPC API

## 🌟 Project Description

The `dogecoin-core-trpc-api` project is a Node.js-based API designed to interact with Dogecoin Core. It uses modern TypeScript tooling and libraries like `trpc` for building APIs, `zod` for validation, and `ky` for HTTP requests. The project is modular and follows best practices for scalability and maintainability.

This API is designed to be private and limited in scope, providing a secure interface to the Dogecoin Core RPC API. It is intended to be accessed exclusively via a Cloudflare Tunnel and paired with a Cloudflare Workers project for seamless and secure access.

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime.
- **TypeScript**: Better tooling and type safety for JavaScript applications.
- **tRPC**: End-to-end type-safe APIs made easy.
- **Zod**: Schema declaration and validation library.
- **Ky**: A tiny and elegant HTTP client for making requests.
- **Cloudflare Tunnel**: Securely exposes the API to the Cloudflare network.

---

## 🛠️ Setup Commands

### 🔧 Development Mode

- **Command**: `npm run dev`
- **Description**: Starts the development server with live reloading using `tsx` and environment variables managed by `dotenvx`.

### 🏗️ Build

- **Command**: `npm run build`
- **Description**: Compiles the TypeScript code into a production-ready format using `tsup`.

---

## 📦 Installable Typesafe Client

You can install the client in a separate environment and make typesafe requests
against the deployed Dogecoin Core tRPC API.

```bash
npm install dogecoin-core-trpc-api
```

```ts
import { createDogecoinCoreClient } from "dogecoin-core-trpc-api/client";

const client = createDogecoinCoreClient();

const health = await client.health.query();
console.log(health);
```

By default, the client targets `https://rpc.dogeapi.io`.

To point at a custom deployment, provide a URL that matches your tRPC endpoint:

```ts
const client = createDogecoinCoreClient({
  url: "https://<your-tunnel-domain>/trpc",
});
```

---

## Library Usage

You can embed the server in another Node.js app by importing the router:

```ts
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "dogecoin-core-trpc-api/server";

const server = createHTTPServer({ router: appRouter });
server.listen(3000);
```

### 🚀 Start

- **Command**: `npm run start`
- **Description**: Runs the compiled application in production mode.

### 📦 Publish

- Deploy any way you like, for example using `rsync`:

```bash
rsync -avz <location-to-project>/dist/ root@<droplet-ip>:~/dogecoin-core-api/
pm2 restart API
```

- **Description**: Deploys the built application to a remote server using `rsync`.

---

## 🌐 Digital Ocean Server Setup

Follow these steps to set up a Digital Ocean server (Ubuntu 25.04, Basic Premium Intel NVMe SSD, 4GB, 2 CPUs) with a 250GB Block Storage volume attached:

### ⚙️ Initial Setup

```bash
sudo apt update && sudo apt upgrade -y
reboot
sudo apt install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils git
wget https://github.com/dogecoin/dogecoin/releases/download/v1.14.9/dogecoin-1.14.9-x86_64-linux-gnu.tar.gz
tar -xvzf dogecoin-1.14.9-x86_64-linux-gnu.tar.gz
mv dogecoin-1.14.9/bin/* /usr/local/bin/
mkdir -p ~/.dogecoin
touch ~/.dogecoin/dogecoin.conf
nano ~/.dogecoin/dogecoin.conf
```

### 📝 Dogecoin Configuration File

```ini
server=1
rpcuser=<your_rpc_username>
rpcpassword=<your_rpc_password>
rpcallowip=127.0.0.1

# Settings
maxconnections=125
datadir=/mnt/<your_volume_name>/dogecoin_data
blocksonly=0
maxuploadtarget=5G
txindex=1
```

### 🚀 Start Dogecoin Daemon

```bash
mkdir /mnt/volume_sfo3_01/dogecoin_data
dogecoind -daemon
```

### 📦 Install Node.js and PM2

```bash
sudo apt install nodejs npm -y
sudo npm install -g pm2
mkdir ~/dogecoin-core-api
```

### 🏗️ Build the Project and Deploy

Refer to the `build` and `publish` sections above for the necessary commands to build and deploy the project.

### 🌐 Set API Environment Variables

Set the following environment variables to configure the API:

```bash
export RPC_USER=<your_rpc_username>
export RPC_PASSWORD=<your_rpc_password>
export RPC_HOST=<your_dogecoin_node_ip>
```

### 🚀 Start the API

Use PM2 to start and manage the API process efficiently:

```bash
pm2 start ~/dogecoin-core-api/index.cjs --name "API"
```

### ☁️ Cloudflare Tunnel Setup

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
cloudflared tunnel login
cloudflared tunnel create dogecoin-core-node-internal-api
nano ~/.cloudflared/config.yml
```

### 🛠️ Cloudflare Tunnel Configuration

Configure `~/.cloudflared/config.yml`:

```yaml
tunnel: dogecoin-core-node-internal-api
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: <your-domain.com>
    service: http://localhost:3000
  - service: http_status:404
```

### ✅ Confirm the Tunnel Works

```bash
cloudflared tunnel run dogecoin-core-node-internal-api
```

### 🔄 Systemd Service Configuration

```bash
sudo nano /etc/systemd/system/cloudflared-doge.service
```

```ini
[Unit]
Description=Cloudflare Tunnel for Dogecoin Core Node
After=network.target

[Service]
ExecStart=/usr/local/bin/cloudflared tunnel --no-autoupdate run dogecoin-core-node-internal-api
Restart=always
User=root
Environment=HOME=/root

[Install]
WantedBy=multi-user.target
```

### 🔧 Enable and Start the Cloudflare Tunnel Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable cloudflared-doge
sudo systemctl start cloudflared-doge
```

## 🔖 Releasing

This project uses `standard-version` to generate changelogs and bump semantic versions.

Local release steps:

```bash
# install dev dependency
npm install --save-dev standard-version

# create a release based on Conventional Commits (or use --release-as)
npm run release

# push created tag and release commit (if not using CI)
git push --follow-tags origin main
```

If you prefer automated releases in CI, the repository includes a GitHub Actions workflow that runs `npm run release` on pushes to `main`. Ensure commits follow Conventional Commits (feat:, fix:, chore:, BREAKING CHANGE) to get automatic semantic versioning. If you don't follow that convention, you can control the bump with `--release-as <patch|minor|major>`.
