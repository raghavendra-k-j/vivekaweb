import path from 'path';
import { readFile, writeFile, unlink } from 'fs/promises';
import os from 'os';
import crypto from 'crypto';
import ts from 'typescript';
import { build } from 'esbuild';
import type { DsToken } from '~/ui/ds/core/tokens';
import { dsLogger } from './ds';



export async function bundleAndLoadTokens(originalFilePath: string): Promise<DsToken[]> {
  const tempJsFilePath = path.join(os.tmpdir(), `temp-tokens-${crypto.randomBytes(8).toString('hex')}.mjs`);

  await build({
    entryPoints: [originalFilePath],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: tempJsFilePath,
    sourcemap: false,
  });

  const fileUrl = `file://${tempJsFilePath.replace(/\\/g, '/')}`;
  const module = await import(fileUrl);
  await unlink(tempJsFilePath);
  const values = Object.values(module);

  let dsTokens: DsToken[] = [];
  if (Array.isArray(values) && values.length > 0) {
    dsTokens = values[0] as DsToken[];
  } else {
    dsLogger.error('Invalid tokens format. Expected an array of tokens.');
  }

  return dsTokens;
}
