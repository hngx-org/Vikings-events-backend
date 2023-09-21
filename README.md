# VIKINGS EVENTS BACKEND
## Installation

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [npm](https://docs.npmjs.com/) and [Git](https://git-scm.com/downloads)

```text
Fork the repo https://github.com/hngx-org/Vikings-events-backend
```

```bash
git clone https://github.com/<your_github_username>/Vikings-events-backend

cd Vikings-events-backend

git remote add upstream https://github.com/hngx-org/Vikings-events-backend.git  

git pull upstream dev

git checkout <your_branch_name>
```

## Running Locally

```bash

npm install

# Copy env.sample to .env and input your keys

npm run dev

```


## Pushing your code

```bash
npm run lint

# add and commit your changes

git pull upstream dev

git push origin <your_branch_name>

# go and make a pull request to the dev branch
```
