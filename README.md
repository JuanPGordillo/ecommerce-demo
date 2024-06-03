# Prerequisites

- Node.js (version 18 or higher)
- npm (version 6 or higher)

## Getting Started

Follow these steps to set up and run the Playwright tests.

### 1. Clone the Repository

First, clone the repository to your local machine and navigate to the project directory:

```
git clone https://github.com/JuanPGordillo/ecommerce-demo.git
cd playwright-tests
```

### 2. Install Dependencies
```
npm ci
```

### 3. Install Playwright Browsers
```
npx playwright install --with-deps
```

### 4. Set Environment Variables
Create a .env file in the root directory of the project and add the following variables:
```env
BASE_URL=https://ecommerce.tealiumdemo.com/
USERNAME=ecommerceTest@test.com
PASSWORD=VF6D62!5UiKj3
```

### 5. Run the Tests
```
npx playwright test
```
