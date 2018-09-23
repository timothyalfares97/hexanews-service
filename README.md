# Hexanews API
Hexanews is an online publishing platform web application for people who want to read and create a content for everyone. In this project, the main technologies are TypeScript, React, Redux. The front-end application is located in here [Hexanews](https://github.com/dotaemon99/hexanews).

## Requirements

For development, you will only need Node.js installed on your environment.
And please use the appropriate [Visual Studio Code](https://code.visualstudio.com/) for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v8.11.3

    $ npm --version
    v5.6.0

## How to install
```
$ git clone https://github.com/dotaemon99/hexanews-service.git
$ cd hexanews-service
$ npm install
$ npm run dev
```

## Coding Styles
- Use ES6 Javascript features in the application
- Import statement divided (by extra spaces) into external library and internal files
- Do not use semicolon at the end of statement or import
- Variable naming should use camelCase style
- Use only let and const in declaring a variable
- Use single quote (') for string import, variable instead of double quote (")
- Always put code into component class when it is reusable
- Do not put a duplicate variable name that can confuse the usage
- Do not abbreviate variable name
- Always use braces for all control structures
- Use two spaces for indentation
- Column limit of 150 characters per line
- One statement per line
- Do not add any trailing whitespace
- Put all function arguments on the same line as the function name. If they exceed the column limit, the arguments must be line-wrapped for readibility
- Use Javadoc comment for every class, function and method

## API Endpoints

### Article Endpoint

|Node endpoint         | HTTP Method |Details                                                                    |
|----------------------|-------------|---------------------------------------------------------------------------|
|/articles             | POST        |	API endpoint for creating an article based on Article model              |
|/articles             | GET         |	API endpoint for getting all available articles within the application   |
|/articles/:articleId  | GET         |	API endpoint for getting a specific article based on its id              |
|/articles/:articleId  | PUT         |	API endpoint for editing a specific article based on its id              |
|/articles/:articleId  | DELETE      |	API endpoint for deleting a specific article based on its id             |

### Authentication Endpoint

|Node endpoint         | HTTP Method |Details                                                                    |
|----------------------|-------------|---------------------------------------------------------------------------|
|/auth/login           | POST        |	API endpoint for logging in through application with email and password  |
|/auth/changePassword  | POST        |	API endpoint for changing password of a specific user                    |
|/auth/resetPassword   | POST        |	API endpoint for resetting password of a specific user                   |

### Category Endpoint

|Node endpoint         | HTTP Method |Details                                                                    |
|----------------------|-------------|---------------------------------------------------------------------------|
|/categories           | GET         |	API endpoint for getting all available categories within the application |

### User Endpoint

|Node endpoint         | HTTP Method |Details                                                                    |
|----------------------|-------------|---------------------------------------------------------------------------|
|/users                | POST        |	API endpoint for creating a user based on User model                     |
|/users                | GET         |	API endpoint for getting all available users within the application      |
|/users/:userId        | GET         |	API endpoint for getting a specific user based on its id                 |
|/users/:userId        | PUT         |	API endpoint for editing a specific user based on its id                 |
|/users/:userId        | DELETE      |	API endpoint for deleting a specific user based on its id                |

## Model Schemas

```
User
{
    email        : String
    password     : String
    name         : String
    description  : String
    createdAt    : Date
}
```

```
Article
{
    title        : String
    description  : String
    authorId     : String
    category     : String
    isFeatured   : Boolean
    views        : Number
    createdAt    : Date
} 
```

```
Category
{
    title        : String
    description  : String
} 
```

## Project Structure

Here is the project structure that we have within the application with a brief description of it.

```
Hexanews-service
|
├── /lib
│   ├── /constants        where all config and string file live
│   ├── /controllers      where the implementation of each object live
│   ├── /models           where the model of application live
│   ├── /routes           where the route of application live
│   ├── /validations      where the validation of each route live
│   ├── app.ts            the entry class for set up the application
│   ├── server.ts         the entry point of application
├── package.json          the whole configuration file with every dependency and script
├── tsconfig.json         typescript config file
├── tslint.json           typescript linter configuration file
└── README.md             this file
```

## Dependencies

- [expressjs](https://github.com/expressjs/express) - Library for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Library for generating JWT token in authentication
- [mongoose](https://github.com/Automattic/mongoose) - Library for modeling and mapping MongoDB data to javascript
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library for hashing password in the application
- [helmet](https://helmetjs.github.io/) - Library for securing https application header
- [joi](https://github.com/hapijs/joi) - Library for route validation in the application
- [node-mailer](https://nodemailer.com/about/) - Library for sending email through node JS

## Authors
- **Timothy Alfares**
- **Audwin Oyong**
