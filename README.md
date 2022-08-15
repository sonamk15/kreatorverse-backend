# kreatorverse-backend
kreatorverse backend module

## Project Setup

1. Run `npm install` to install required dependencies

2. Run the `node seed.js` cpmmand for creating super admin initially

## App deplyed on Heroku

1. Login on Heroku using `heroku login` command
2. Create `Procfile` for targeting your app default heroku take websocket
3. Add your changes into the the heroku using `git add .`, `git commit -am "your commit"` and then run `git push heroku master` to deploy your app on heroku
4. Run `heroku ps:scale web=1` to start your app on websocket
5. Run `heroku logs --tail` to see your app logs