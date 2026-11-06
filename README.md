# Threadbase - File Upload Server

Authenticated avatar uploads using Express and Multer.

## Setup

```bash
cp .env.example .env
npm install
npm start
```

The server starts at `http://localhost:3001`.

## Get an authentication token

Use the demo account:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ada","password":"password"}'
```

Copy the returned token and send it as `Authorization: Bearer <token>`.

## Upload an avatar

Send a multipart/form-data request:

- Method: `POST`
- URL: `http://localhost:3001/api/upload`
- Header: `Authorization: Bearer <token>`
- Form field: `avatar` (type **File**)

A successful upload returns HTTP 201:

```json
{
  "url": "/uploads/avatar-<timestamp>-<random>.png",
  "filename": "avatar-<timestamp>-<random>.png"
}
```

Open the returned URL at `http://localhost:3001<url>` to view the image.

## Upload validation

- Accepted MIME types: JPEG, PNG, WebP, and GIF.
- Maximum file size: 5 MB.
- Unsupported file types and oversized uploads return HTTP 400.
- Missing or invalid authentication returns HTTP 401 before Multer processes the file.

Uploaded files are stored in `uploads/`, which is ignored by Git. The `.gitkeep` file preserves the directory in a fresh clone.

**Production note:** Local disk storage is suitable for development and persistent single-server deployments. Use durable object storage such as S3 or Cloudinary when deploying to platforms with ephemeral filesystems.
