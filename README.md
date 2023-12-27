# ms-bff-boilerplate
Microservice BFF Boilerplate with Node.js, Express and Typescript

# Packages
express\
  body-parser\
  cookie-parser\
  compression\
  cors\
  helmet\
  express-rate-limit\
  morgan\
  chalk\
winston, zod, eslint, prettier, lint-staged, typescript, husky, concurrently\

# Install Steps

npm i express body-parser cookie-parser compression cors helmet express-rate-limit\
npm i morgan winston\
npm i zod\
npm i -D typescript @types/express @types/node @types/morgan @types/body-parser @types/cookie-parser @types/compression @types/cors\
npm i -D prettier lint-staged husky\
npm i -D concurrently

npx tsc --init\
npm init @eslint/config\
node --eval "fs.writeFileSync('.prettierrc','{}\n')"

# References

[Best Practices REST API](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
