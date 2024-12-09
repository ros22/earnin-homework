# earnin-homework 

This repo is written in playwright and run tests with docker.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Docker**: Make sure you have Docker installed and running. You can download it from [docker.com](https://www.docker.com/).
- **Node.js**: Playwright requires Node.js. You will be installing it inside the Docker container, but it's good to have it installed locally if you're running the tests outside Docker.
- **Playwright**: This is the library we are using for end-to-end testing, which is included in the Docker setup.

## Setting Up

### 1. Clone this repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ros22/earnin-homework.git
cd earnin-homework

run command below:
docker build -t earninhomework .
docker run --rm earninhomework
