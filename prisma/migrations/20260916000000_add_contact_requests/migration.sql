CREATE TYPE "ContactRequestStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED');

CREATE TABLE "contact_requests" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "phone_number" VARCHAR(16) NOT NULL,
    "reason" VARCHAR(200),
    "status" "ContactRequestStatus" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "contact_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "contact_requests_created_at_id_idx" ON "contact_requests"("created_at", "id");
CREATE INDEX "contact_requests_status_created_at_id_idx" ON "contact_requests"("status", "created_at", "id");
