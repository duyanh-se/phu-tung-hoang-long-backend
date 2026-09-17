import { BadRequestException } from '@nestjs/common';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { UploadsService } from './uploads.service';

describe('UploadsService', () => {
  let directory: string;

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'hoang-long-upload-'));
  });

  afterEach(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  it('stores a PNG with a generated name and returns its public path', async () => {
    const service = new UploadsService({
      get: () => directory,
    } as never);
    const file = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00,
    ]);

    const result = await service.saveProductImage({
      buffer: file,
      mimetype: 'image/png',
    });

    expect(result.imagePath).toMatch(/^\/uploads\/[0-9a-f-]+\.png$/);
    expect(result.imageUrl).toBe(`http://localhost:3000${result.imagePath}`);
    expect(
      await readFile(
        join(directory, result.imagePath.replace('/uploads/', '')),
      ),
    ).toEqual(file);
  });

  it('rejects a MIME type that does not match the image content', async () => {
    const service = new UploadsService({
      get: () => directory,
    } as never);

    await expect(
      service.saveProductImage({
        buffer: Buffer.from([0xff, 0xd8, 0xff]),
        mimetype: 'image/png',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
