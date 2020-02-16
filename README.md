# Ebay Alert 
A web app to manage alerts for products prices on Ebay.com. Using Node.js, React, MongoDB and Docker.

## Requirements
 - docker ^19.03.1

## Installation
- Create a file named ".env" on the root folder with the information exemplified on the '.env.example' file;

- For the EBAY_APP_ID value you must create an account [here](https://developer.ebay.com/) and retrieve your AppID;

- (optional) If you are using your e-mail for the EMAIL_SENDER value and it is from Gmail, you must allow access to less secure apps [here](https://myaccount.google.com/lesssecureapps?pli=1);
 
- Apply the .env changes:
```bash
  docker-compose config
```
- Start the project for the first time:
```bash
  docker-compose up --build
```

## Useful tips
#### First time (after setting up the .env file)
```bash
  docker-compose config && docker-compose up --build
```
#### Everytime
```bash
  docker-compose up
```
#### When settings, such as packages, are changed
```bash
  docker-compose up --build
```
#### When the .env file is changed
```bash
  docker-compose config
```
#### Testing
```bash
  docker-compose -f docker-compose.test.yml up
```
#### Running without the database seed
```bash
  docker-compose up --scale db_seed=0
```

## Main libraries used
  [axios](https://www.npmjs.com/package/axios) 
  [express](https://expressjs.com)
  [handlebars](https://www.npmjs.com/package/handlebars)
  [mongoose](https://mongoosejs.com/)
  [nodemailer](https://nodemailer.com/about/)
  [antd](https://ant.design/docs/react/introduce)

