# Hexanews API
Hexanews is an online publishing platform web application for people who want to read and create a content for everyone. In this project, the main technologies are TypeScript, React, Redux. 

## How to install
```
git clone https://github.com/dotaemon99/hexanews-service.git
cd hexanews-service
npm install
npm run dev
```

## Coding Style
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

## Database schema
### User
{
      email: String
      password: String
      name: String
      createdAt: Date
}

### Article
{
      title: String
      description:String
      author: String
      category: String
      createdAt: Date
}

## Authors
- **Timothy Alfares**
- **Audwin Oyong**
