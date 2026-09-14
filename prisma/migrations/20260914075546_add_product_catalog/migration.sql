-- CreateTable
CREATE TABLE "manufacturers" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "price" DECIMAL(14,2),
    "currency" VARCHAR(3) NOT NULL DEFAULT 'VND',
    "image_path" TEXT,
    "source_manufacturer_id" INTEGER,
    "manufacturer_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_legacy_id_key" ON "manufacturers"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_legacy_id_key" ON "products"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE INDEX "products_manufacturer_id_idx" ON "products"("manufacturer_id");

-- CreateIndex
CREATE INDEX "products_created_at_id_idx" ON "products"("created_at", "id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
