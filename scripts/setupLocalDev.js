const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const backendEnvPath = path.join(rootDir, 'backend', '.env');
const backendEnvExamplePath = path.join(rootDir, 'backend', '.env.example');
const frontendEnvLocalPath = path.join(rootDir, 'frontend', '.env.local');

function ensureFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    return false;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function main() {
  const createdBackendEnv = ensureFile(
    backendEnvPath,
    fs.existsSync(backendEnvExamplePath)
      ? fs.readFileSync(backendEnvExamplePath, 'utf8')
      : 'DATABASE_URL="mysql://root:password@localhost:3306/argpiscinas"\nJWT_SECRET="change-me"\nJWT_EXPIRES_IN="7d"\nPORT=3001\nNODE_ENV=development\nFRONTEND_URL="http://localhost:5173"\n'
  );

  const createdFrontendEnv = ensureFile(
    frontendEnvLocalPath,
    'VITE_API_URL=http://localhost:3001\n'
  );

  console.log('Setup local completado.');
  console.log(createdBackendEnv ? '- Creado backend/.env' : '- backend/.env ya existe');
  console.log(createdFrontendEnv ? '- Creado frontend/.env.local' : '- frontend/.env.local ya existe');
  console.log('Siguiente paso: instalar dependencias y ejecutar migraciones en backend.');
}

main();
