# Shorting URL

Shorten the url using unique id.

## Installation

Clone it and install all dependencies

## Usage

* Make sure you have mongo DB installed and ready to use.
* In windows 7, open 2 cmd. (In cmd 1)Type mongod and enter so mongo starts to listen. (In cmd 2) type monogo and enter to start mongoDB.
* Commands to use after doing the above step :
1. db.help() - for help
2. show dbs - to show all db present
3. use (db_name) - to use the db
4. db.collection_name.find() - to display all data in that collection
5. db.dropDatabase() - to delete the current database. NOTE : Once deleted, can not be retrieved
6. exit - to exit mongoDB

# Remove LOCK for MONGODB
* Delete mongolock file in C:\data\db after exit in mongoDB.

## ENV
* add this in .env file "MONGO_URI=localhost/redirect"
