import fs from 'fs';

(async () => {
  const template = `const secret = {
    mapboxToken: 'yourmapboxtoken',
    oneMapEmail: 'youronemap@email.com',
    oneMapPassword: 'youronemappassword',
    ltaAccountKey: 'yourltaaccountkey'
  };
  
  export { secret };  
  `;

  const filename = 'app.secret.js';
  if (fs.existsSync(filename)) {
    console.error(`${filename} already exists`);
  } else {
    fs.writeFileSync(filename, template);
    console.error(`${filename} generated`);
  }
})();
