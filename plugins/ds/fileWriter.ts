import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { logger } from './../../app/core/utils/logger';
import type { DsToken } from '~/ui/ds/core/tokens';
import { log } from 'console';



function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateScssVariables(obj: any, prefix = '$'): string[] {
  let scssLines: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const kebabKey = camelToKebab(key);
      const scssVarName = `${prefix}${kebabKey}`;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        scssLines = scssLines.concat(generateScssVariables(value, `${scssVarName}-`));
      } else {
        scssLines.push(`${scssVarName}: ${value};`);
      }
    }
  }

  return scssLines;
}

export async function generateScssFile(dsTokens: DsToken[], outputFilePath: string): Promise<void> {
  if (!dsTokens || !Array.isArray(dsTokens)) {
    logger.error('Invalid tokens array.');
    return;
  }

  logger.info(`Generating SCSS file at: ${dsTokens}`);

  const scssLines: string[] = [];

  for (const dsToken of dsTokens) {
    const name = dsToken.name;
    const value =  dsToken.value;
    logger.debug(`Processing token: ${name}`);
    if (value && typeof value === 'object') {
      scssLines.push(...generateScssVariables(value, `$${name}-`));
    } else {
      logger.warn(`Skipping invalid token: ${name}`);
    }
  }

  const scssContent = `${scssLines.join('\n')}\n`;

  const outputDir = path.dirname(outputFilePath);
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFilePath, scssContent, 'utf8');

  logger.info(`SCSS file generated successfully: ${outputFilePath}`);
}
