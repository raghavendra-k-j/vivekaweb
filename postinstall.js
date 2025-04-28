import fse from 'fs-extra';
import path from 'path';

const topDir = import.meta.dirname;

// Clean up the 'public/tinymce' directory and copy files from 'node_modules'
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true });
