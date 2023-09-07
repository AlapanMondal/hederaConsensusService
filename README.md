# ent-key-mgr
## Description
The `server` directory houses a Nest.js server constructed to operate using the gRPC (Google Remote Procedure Call) transport protocol. Within this server, there are two applications: `api-gateway` and `keymanager.`

The `api-gateway` application functions as the entry point for all incoming HTTP traffic within our application ecosystem. Its primary role is to act as a reverse proxy, forwarding these incoming HTTP requests to the `keymanager` microservice utilizing the gRPC transport protocol. 

The `keymanager` microservice is responsible for managing cryptographic keys within our application. It serves as the host for the key management application, handling operations related to key generation, storage, retrieval, and any other cryptographic functions required by our application.

In addition to the applications, there is a `common` library present in the server directory. This library houses shared or common assets and functionality utilized by both `api-gateway` and `keymanager.` Among the assets in the `common` library is the `keymanager.ts` file, which is generated from the protobuf (protocol buffer) definition file. Protocol buffers are a language-agnostic data serialization format used for efficiently encoding and decoding structured data, making it an excellent choice for inter-service communication in microservices architectures.


## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ cd server
# watch mode
$ pnpm run start:dev api-gateway
# open another terminal
$ pnpm run start:dev keymanager

# After running two servers, you can test the APIs using the following methods.
```

### Using curl
```mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```

To test the APIs implemented in the Nest.js application using `curl`, follow these steps. Ensure that `api-gateway` application is running at the appropriate address and port (e.g., `http://localhost:3000`).

### 1. Create a Key

Use `curl` to create a new key with the `Create Key` endpoint:

```bash
curl -X POST http://localhost:3000/keys -H "Content-Type: application/json" -d '{
  "keyName": "myKey",
  "keyAlgo": 2
}'
```
__Expected Result:__ If successful, you should receive a JSON response indicating success. An error message will be returned if the key name already exists or if the key algorithm is unsupported.

### 2. Delete a Key

Use `curl` to delete a key with the Delete Key endpoint:

```bash
curl -X DELETE http://localhost:3000/keys/myKey
```
__Expected Result:__ If successful, you should receive a JSON response indicating success. An error message will be returned if the key name is not found.

### 3.  Get the Secret (Private Key) for a Key

```bash
curl http://localhost:3000/keys/myKey/secret

```
__Expected Result:__ If successful, you should receive a JSON response containing the private key for the specified key name. An error message will be returned if the key name is not found.

### 3. List the keys

```bash
curl http://localhost:3000/keys

```
__Expected Result:__ You should receive a JSON response containing an array of key names currently stored in memory.



## License

Nest is [MIT licensed](LICENSE).

