# React Todo App

## Overview

This demo TODO app features login, signup and TODO listing pages. Application uses bootstrap for the design and layouts. 
Authentication is implemented so that only logged in users can access the TODO listing page and perform the operations.
Same way, if an already logged in user tries to access the login or sign up pages, he will be redirected to the TODO listing page.

### Login Page

Login page features email and password fields. 
Pasword field has option to toggle password visibility.
If user tries to login without username or password, corresponding error message will displayed in a Toast message.
Once the user clicks after entering any random username or password, it will store a dummy user data and redirects the user to TODO listing page

### Sign Up Page

Signup page consists of fields for First Name, Last Name, Email and Password. 
All fields are controlled inputs. API call is not implemented.
Upon clicking signup, user will be redirected to login page

### TODO Listing Page

The listing page will display preloaded TODO items (loaded from a dummy json data) in bootstrap grid.
The listing page features filtering options. Users can enter keyword (searched against title) and choose TODO state to filter the list. Combination of both can be used to filter.
Users can also easily switch the status of TODO items from the table itself.
The table also features sorting functionality. By clicking on the table head, list will be sorted based on that filed. If clicked again on same filed, it will be sorted in desceding order.
There is an option for users to add new TODO item and the form will be displayed in a modal. Upon submit, item will be added to the list and displayed.
Each row in the list consist of option to View, Edit and Delete.
Clicking on View will display the TODO item details in a modal.
Clicking Edit will load a form with prefilled data in a modal. Upon saving, the changes will be reflected in the list.
Clicking on dlete will remove the item from the list.
All these actions will show approriate success messages in a toaster upon completion.
No APIs are integrated and all data are stored in state. 


## Instructions

First clone this repository.
```bash
$ git clone https://github.com/ajanthvofox/todo-app.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install
```

Run it
```bash
$ npm start
```

Build it
```bash
$ npm run build
```