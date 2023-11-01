# Pickleball Scheduler

## Deployment

To deploy this with your current local version, run

```sh
npm run deploy
```

See deployement [here](https://krisvan.github.io/Pickleball-Scheduler/).

**Introduction** This web application allows users to schedule a time and day with multiple users, and provides a calender that displays a how many people are available. Also shows weather info.

## Project Overview

This repo contains a barebones React app with a single component. You will use this as the "base" version of your Interactive Front-end application for HW Assignment #4. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/).

```sh
git clone <repo-name>
cd <repo-name>
npm install
npm start
```

After executing these commands, your React frontend should now be running on [localhost:3000](http://localhost:3000/). You can visit this page in your web browser to view your front-end user interface.

## Testing with Continuous Integration

**Note that you are not required to test your project with Jest for HW3, however, we have enabled this functionality in case you would like to use it. If you would like to remove the tests, you can remove the `.github` directory from the repo.**

Currently, this repo is set up to run the Jest tests in the `App.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed.

Note that we have included the [`jest-dom`](https://testing-library.com/docs/ecosystem-jest-dom/) library for your tests. This allows you to check DOM elements in your tests.

You can find the [GitHub Actions](https://github.com/features/actions) script for this CI job [here](.github/workflows/ci.yml) if you want to learn more.

## Additional Resources

For more information about using Node.js on Heroku, see these Heroku Dev Center articles:

- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [Express Documentation](https://expressjs.com/en/5x/api.html)
- [Supertest Documentation](https://www.npmjs.com/package/supertest)
- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
