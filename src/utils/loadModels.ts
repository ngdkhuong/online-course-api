import fs from 'fs';

const loadModels = () => {
    fs.readdirSync('src/models/').forEach((file: string) => {
        if (file.indexOf('.ts') > -1 && file != 'app.ts')
            exports[file.replace('.ts', '')] = require('../models/' + file);
    });
};

export { loadModels };
