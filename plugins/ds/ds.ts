import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin, ViteDevServer } from 'vite';
import { bundleAndLoadTokens } from './fileReader';
import { generateScssFile } from './fileWriter';
import { logger } from './../../app/core/utils/logger';

interface DsPluginOptions {
  sourceTokenFile: string;
  scssOutputPath: string;
}

export default function createDsPlugin(options: DsPluginOptions): Plugin {
  let resolvedSourcePath: string;
  let resolvedOutputPath: string;
  let serverInstance: ViteDevServer | null = null;

  // Helper function to log and handle regeneration
  async function regenerateTokens(sourcePath: string, outputPath: string) {
    logger.info(`[vite-plugin-ds-ts] Change detected in ${path.basename(sourcePath)}. Regenerating ${path.basename(outputPath)}...`);
    try {
      const loadedTokens = await bundleAndLoadTokens(sourcePath);
      if (loadedTokens !== null) {
        await generateScssFile(loadedTokens, outputPath);
        logger.info(`[vite-plugin-ds-ts] Successfully regenerated ${path.basename(outputPath)}.`);
      } else {
        logger.error(`[vite-plugin-ds-ts] Failed to load tokens after change. SCSS file not updated.`);
        serverInstance?.ws.send({
          type: 'error',
          err: { message: `Failed to process ${path.basename(sourcePath)} after change.`, stack: '', plugin: 'vite-plugin-ds-ts' }
        });
      }
    } catch (error: any) {
      logger.error(`[vite-plugin-ds-ts] Error during regeneration: ${error.message || error}`);
      serverInstance?.ws.send({
        type: 'error',
        err: { message: `Error regenerating ${path.basename(outputPath)}: ${error.message}`, stack: error.stack || '', plugin: 'vite-plugin-ds-ts' }
      });
    }
  }

  return {
    name: "vite-plugin-ds-ts",

    // Runs once when the build starts (both dev and build)
    configResolved(config) {
      const __filename = fileURLToPath(import.meta.url);
      const pluginDir = path.dirname(__filename);

      // Resolve the source and output paths based on the plugin options
      resolvedSourcePath = options.sourceTokenFile
        ? path.resolve(config.root, options.sourceTokenFile)
        : path.resolve(pluginDir, "../../ds/tokens.ts");

      resolvedOutputPath = options.scssOutputPath
        ? path.resolve(config.root, options.scssOutputPath)
        : path.resolve(pluginDir, "../../ds/tokens.scss");

      logger.info(`[vite-plugin-ds-ts] Source tokens path: ${resolvedSourcePath}`);
      logger.info(`[vite-plugin-ds-ts] Output SCSS path: ${resolvedOutputPath}`);
    },

    // Runs initial generation when the build process starts
    async buildStart() {
      logger.info(`[vite-plugin-ds-ts] buildStart: Running initial token processing...`);
      try {
        const loadedTokens = await bundleAndLoadTokens(resolvedSourcePath);
        if (loadedTokens !== null) {
          await generateScssFile(loadedTokens, resolvedOutputPath);
        } else {
          this.error(`Failed to load initial tokens from ${resolvedSourcePath}.`);
        }
      } catch (error: any) {
        logger.error(`[vite-plugin-ds-ts] Error during initial buildStart: ${error.message || error}`);
        this.error(`Failed during initial token processing: ${error.message || error}`);
      }
    },

    // Hook specifically for configuring the Vite development server
    configureServer(server: ViteDevServer) {
      serverInstance = server; // Store server instance for later use

      // Add the source token file to Vite's watch list
      server.watcher.add(resolvedSourcePath);
      logger.info(`[vite-plugin-ds-ts] Watching ${resolvedSourcePath} for changes.`);

      // Listen for 'change' events from the watcher
      server.watcher.on('change', async (filePath) => {
        // Ensure the changed file is the one we are watching
        if (path.normalize(filePath) === path.normalize(resolvedSourcePath)) {
          await regenerateTokens(resolvedSourcePath, resolvedOutputPath);
        }
      });
    },
  };
}
