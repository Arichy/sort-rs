const { readdirSync, read } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');

function main() {
  const npmDir = readdirSync(resolve(__dirname, './npm'));
  npmDir.forEach(dir => {
    const packageDir = resolve(__dirname, `./npm/${dir}`);
    const packageJson = require(`${packageDir}/package.json`);
    const { name, version } = packageJson;
    execSync(`npm unpublish ${name} --force`, { cwd: packageDir, stdio: 'inherit' });
  });

  const rootDir = resolve(__dirname, './');
  const packageJson = require(`${rootDir}/package.json`);
  const { name, version } = packageJson;
  execSync(`npm unpublish ${name} --force`, { cwd: packageDir, stdio: 'inherit' });
}

main();
