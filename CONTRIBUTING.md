# Contributing Guideline

Welcome to the [syhrimr/quickwasend](https://github.com/syhrimr/quickwasend) 👋\
Thanks for helping out this project!

Before creating your pull request, make sure you already **read the whole guideline**. If you feel that this guideline is not clear enough or have any doubts, feel free to raise it in the [issues](https://github.com/syhrimr/quickwasend/issues/new).

## Project Structures

- The `/components` stores reusable components JSX scripts.
- The `/data` stores static JSON data.
- The `/hooks` stores the hook functions.
- The `/network` stores API request call functions.
- The `/pages` stores the app pages.
- The `/utils` stores reusable utility functions.

## Used API

> This app only request to one API endpoint of [ipgregistry.co](https://ipregistry.co/) to get IP location data to validate your country phone number. For the rest, there is no API request to any server to store any phone number from your input.

#### Get location data

```http
  GET /
```

| Parameter | Type     | Description                                                              |
| :-------- | :------- | :----------------------------------------------------------------------- |
| `key`     | `string` | **Required**. Your API key from [ipgregistry.co](https://ipregistry.co/) |

Please place the API Key value in `.env` file.

## Start Running in Local

**Pre-requisites:**

- Since this project use NextJS 13, please use Node v14.x.x or higher.

**Steps:**

1. After cloning this repository, please run package installation.

```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
```

2. Ensure to have an `.env` file with `NEXT_PUBLIC_API_KEY` before running the project (refer to [User API](#used-api) to get the value).
3. Run the project locally.

```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```

## Sending Pull Request(s)

Since this project has pre-commit configuration with ESLint, Prettier, and TypeScript rules, please to check your code convention before committing.

You can run this command below to check your code:

```bash
  npm run check-all
  # or
  yarn check-all
  # or
  pnpm check-all
```

As we want to have standardize commit messages, please follow this [commit message convention guide](https://www.conventionalcommits.org/en/v1.0.0/#summary) and [50/72 commit message rule format](https://initialcommit.com/blog/git-commit-messages-best-practices).
