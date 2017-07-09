# Volunteer Matching API

## Overview

1. Volunteer Matching API (VMA) is the API part of Volunteer Matching System (VMS) which consists of API and UI.
1. VMS's purpose is to help matching the people who needs volunteers (clients) and the people who want to work as volunteers (members).
1. VMS needs to have following functions:
    1. User management
        1. Users consists of clients and members.
        1. A user can be a client and a member at the same time.
    1. Organization management
        1. Volunteers should belongs to one or more organizations.
        1. An organization manager can create/modify/delete members without email confirmation.
    1. Volunteer matching
        1. A client can create/modify/delete requests which he/she needs help from volunteers.
        1. Those requests should specify one or more organizations.
        1. Organization managers can make requests viewable from their members.
        1. Members can apply for the open requests.
        1. Matching is made on first come first served basis across specified organizations.
1. Volunteer Matching System is in the early stage of development. Any help is welcome.

## Installation

### Node.js via NVM

- See https://github.com/creationix/nvm.

### MongoDB

- See https://docs.mongodb.com/manual/installation/.
- Start MongoDB:
  ```
  $ mongod --fork --logpath /data/db/mongod.log
  ```
- Create administration user:
  ```
  $ mongo
  > use admin
  > db.createUser({
    user: 'admin',
    pwd: 'password',
    roles: [{
      role: 'userAdminAnyDatabase',
      db: 'admin'
    }]
  })
  ```
  - please change 'admin' and 'password' respectively.
- Start MongoDB with authentication:
  ```
  $ mongod --auth --fork --logpath /data/db/mongod.log
  ```
- Create collection and user:
  ```
  $ mongo -u admin -p password admin
  > use volunteer_matching_api_development
  > db.createUser({
    user: 'admin',
     pwd: 'password',
     roles: ["readWrite", "dbAdmin"]
  })
  ```

### LoopBack

- See http://loopback.io/doc/en/lb3/Installation.html.

### Volunteer Matching API

- Set environment variables in .bashrc:
  ```
  $ vim ~/.bashrc
    export MONGO_USER="admin"
    export MONGO_PASS="password"
    export ADMIN_PASS="password"
  $ source ~/.bashrc
  ```
- Install and start Volunteer Matching API:
  ```
  $ git clone git@github.com:journeyz/volunteer_matching_api.git
  $ cd volunteer_matching_api
  $ npm install
  $ node .
  ```
- Browse http://0.0.0.0:3000/ for API.
- Browse http://0.0.0.0:3000/explorer/ for LoopBack API Explorer.
  - You can login at `POST /User/login` section with the following user whose password is specified by ADMIN_PASS environment variable.
    ```
    {
      "username":"administrator",
      "password":"password"
    }
    ```
  - See http://loopback.io/doc/en/lb3/Introduction-to-User-model-authentication.html#login-as-the-new-user for how to login.
  - You can create new users after you set the Access Token of 'administrator'.
