1. npm install express knex sqlite3 bcryptjs nodemon helmet cors express-session jsonwebtoken
2. knex init
   -useNullAsDefault: 'true'
3. npm init -y
4. npm install --save-dev dotenv (zero-dependency module that loads environment variables from a .env file into process.env)
   - gives us a .env file
   - must add to package.json(server) [-r dotenv/config]
   - instructs our app to read our .env file
5. npm install cookie-parser (parse cookie header and populate req.cookies with an obj keyed by the cookie names)
6. create index.js (servers)
7. create users folder
   - user-router
   - user-models
8. create auth folder
   - auth-router
9. create database migration
   - config.js
   - knex migrate:make [tableName]
   - knex migrate:latest / rollback
10. create middleware folder
    - restricted.js

# NOTES

- If fail, restart server
- cookies have cookie jar, a way to have clientts persist a small chunk of data locally
- session stored on server
- cookie stored on client
- Need a central place for sessions
