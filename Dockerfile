FROM mcr.microsoft.com/playwright:focal

# Create the directory where snapshots will be stored
RUN mkdir -p /tests/tests/budgetcalc.test.ts-snapshots/

# copy project (including tests)
COPY . /tests

WORKDIR /tests

# Install dependencies
RUN npm install
# Install browsers
RUN npx playwright install

# Run playwright test
CMD [ "npx", "playwright", "test", "--reporter=list", "--project=chromium" ]