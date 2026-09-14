# phu-tung-hoang-long-backend

Backend phụ tùng Hoàng Long sử dụng NestJS 11, TypeScript, Prisma ORM 7 và PostgreSQL.

## Chạy local

Yêu cầu Node.js >= 22.12, npm và PostgreSQL. Nếu dùng database đi kèm, cần mở Docker Desktop trước.

```powershell
cd phu-tung-hoang-long-backend
npm ci
# Chỉ copy nếu chưa có .env; thư mục hiện tại đã được tạo .env với JWT secret ngẫu nhiên.
Copy-Item .env.example .env
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
# Dán kết quả vào JWT_ACCESS_SECRET trong .env.
npm run db:up
npm run prisma:generate
npm run prisma:deploy
npm run start:dev
```

Nếu có PostgreSQL riêng, sửa `DATABASE_URL` trong `.env` và bỏ qua `db:up`. Database Docker dùng cổng `5433` để tránh trùng PostgreSQL đang chạy ở `5432`. Thông tin database trong Compose chỉ dành cho local.

- API: http://localhost:3000/api/v1
- Swagger UI: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/docs-json
- Health (liveness): http://localhost:3000/api/v1/health

`npm run db:down` dừng database Docker, vẫn giữ dữ liệu trong volume.

## API có sẵn

Tất cả đường dẫn dưới đây có tiền tố `/api/v1`.

| Method | Đường dẫn                | Quyền     | Chức năng                                     |
| ------ | ------------------------ | --------- | --------------------------------------------- |
| POST   | `/auth/register`         | Public    | Đăng ký, luôn tạo role USER                   |
| POST   | `/auth/login`            | Public    | Đăng nhập, trả cặp token                      |
| POST   | `/auth/refresh`          | Public    | Đổi refresh token lấy cặp token mới           |
| POST   | `/auth/logout`           | Đăng nhập | Thu hồi phiên hiện tại, trả 204               |
| GET    | `/auth/me`               | Đăng nhập | Hồ sơ cá nhân                                 |
| PATCH  | `/users/me`              | Đăng nhập | Sửa fullName                                  |
| GET    | `/users?page=1&limit=20` | ADMIN     | Danh sách người dùng                          |
| GET    | `/users/:id`             | ADMIN     | Chi tiết người dùng                           |
| PATCH  | `/users/:id/role`        | ADMIN     | Đổi USER/ADMIN, không cho đổi role chính mình |
| GET    | `/health`                | Public    | Kiểm tra tiến trình API                       |

Đăng ký mẫu:

```json
{
  "email": "customer@example.com",
  "password": "StrongPassword123!",
  "fullName": "Nguyễn Văn An"
}
```

Đăng nhập dùng `email` và `password`. Kết quả đăng ký/đăng nhập/làm mới token:

```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<64-character-hex-token>",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "<uuid>",
    "email": "customer@example.com",
    "fullName": "Nguyễn Văn An",
    "role": "USER",
    "createdAt": "2026-09-14T00:00:00.000Z",
    "updatedAt": "2026-09-14T00:00:00.000Z"
  }
}
```

Trong Swagger, đăng ký hoặc đăng nhập, copy `accessToken`, bấm **Authorize** và dán token. Với `/auth/refresh`, gửi `{ "refreshToken": "..." }`; lưu lại cả cặp token mới sau mỗi lần làm mới.

## Tạo admin đầu tiên

Điền `ADMIN_EMAIL` và `ADMIN_PASSWORD` trong `.env`, rồi chạy:

```powershell
npm run prisma:seed
```

Mật khẩu phải dài 8–128 ký tự, có chữ hoa, chữ thường và chữ số. Seed không đổi mật khẩu admin đã tồn tại và không tự nâng quyền tài khoản USER trùng email. Không có tài khoản hay mật khẩu admin mặc định.

## Cấu trúc

```text
prisma/
  schema.prisma          # User, Session, Role
  migrations/            # Migration khởi tạo đã có sẵn
  seed.ts                # Tạo admin từ biến môi trường
src/
  auth/
    decorators/          # @Public(), @Roles(), @CurrentUser()
    dto/                 # Register, Login, RefreshToken, AuthResponse
    guards/              # JWT/session guard, roles guard
    types/
  users/
    dto/                 # UpdateProfile, UpdateRole, response DTOs
    user.select.ts       # Select trường công khai, không lấy passwordHash
  common/
    decorators/          # Mô tả lỗi Swagger dùng chung
    dto/                 # Pagination và error response
  config/                # Kiểm tra cấu hình khi khởi động
  prisma/                # Prisma module/service và lifecycle
  generated/prisma/      # Sinh bằng prisma generate, không commit
  setup-app.ts           # Prefix, CORS, Helmet, validation, Swagger
  main.ts
 test/                   # E2E trên PostgreSQL thật
```

DTO sử dụng `class-validator`, `class-transformer`, `ApiProperty` và mapped types từ `@nestjs/swagger`. `ValidationPipe` áp dụng toàn cục, transform query/body và từ chối trường ngoài DTO. Response và lỗi HTTP có schema Swagger. Profile DTO chỉ cho sửa `fullName`.

## Xác thực và phân quyền

- Mật khẩu hash bằng Argon2id; API không trả password hash hoặc refresh token hash.
- Access token JWT HS256 mặc định 15 phút; refresh session có hạn tuyệt đối 7 ngày (cấu hình trong `.env`). Refresh không kéo dài hạn phiên.
- Refresh token ngẫu nhiên 256 bit, chỉ lưu SHA-256 trong DB. Mỗi refresh token dùng được một lần; cập nhật có điều kiện đảm bảo hai request đồng thời chỉ một request thành công.
- Đăng xuất thu hồi phiên hiện tại, vô hiệu cả access/refresh token của phiên đó; các phiên khác vẫn hoạt động.
- Guard kiểm tra phiên và lấy role hiện tại từ DB trên mỗi request. Đổi role có hiệu lực ngay với token đã cấp.
- Mặc định endpoint cần đăng nhập; gắn `@Public()` cho endpoint mở và `@Roles(Role.ADMIN)` để giới hạn quyền.
- Rate limit mặc định 100 request/phút/IP, đăng ký 5 và đăng nhập 10. Storage hiện tại ở bộ nhớ từng tiến trình; khi chạy nhiều instance cần dùng storage dùng chung. Nếu chạy sau reverse proxy, cấu hình trust proxy theo hạ tầng thực tế.
- `CORS_ORIGINS` nhận danh sách origin ngăn bằng dấu phẩy. Swagger mặc định tắt khi `NODE_ENV=production` nếu không đặt `SWAGGER_ENABLED`; đặt rõ `SWAGGER_ENABLED=false` khi dùng file env local cho production.
- Có thể định kỳ dọn Session đã hết hạn/thu hồi; starter chưa có tác vụ tự dọn.

## Lệnh phát triển

```powershell
npm run build
npm run lint
npm test
npm run prisma:migrate -- --name ten_thay_doi
npm run prisma:studio
```

Chạy production sau khi cấu hình env và database:

```powershell
npm ci
npm run build
npm run prisma:deploy
npm run start:prod
```

Các dependency gián tiếp `multer`, `deepmerge-ts`, `mysql2` được override lên bản đã vá theo npm audit; build, migration, seed và E2E cần tiếp tục được chạy khi nâng các phiên bản này.

## E2E trên database riêng

Tạo database test (tên phải kết thúc bằng `_test`), áp dụng migration rồi chạy:

```powershell
$env:TEST_DATABASE_URL='postgresql://hoanglong:hoanglong_local@localhost:5433/phu_tung_hoang_long_test?schema=public'
$env:DATABASE_URL=$env:TEST_DATABASE_URL
npm run prisma:deploy
npm run test:e2e
Remove-Item Env:DATABASE_URL
Remove-Item Env:TEST_DATABASE_URL
```

Với Compose, tạo database test bằng `docker compose exec db createdb -U hoanglong phu_tung_hoang_long_test` trước lần chạy đầu.

Test tạo tài khoản có email ngẫu nhiên và chỉ xóa tài khoản test đó sau khi chạy, không reset database. Kiểm tra validation, schema Swagger, hash mật khẩu, email trùng, token sai/hết hạn, role USER/ADMIN, phân trang, refresh đồng thời, logout, phiên hết hạn và rate limit.

Tài liệu tham khảo: [NestJS Authentication](https://docs.nestjs.com/security/authentication), [Authorization](https://docs.nestjs.com/security/authorization), [Validation](https://docs.nestjs.com/techniques/validation), [Prisma + NestJS](https://docs.prisma.io/docs/guides/frameworks/nestjs).
