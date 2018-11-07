#*drinkbase*
---
a cocktail-finding app built using a react frontend with python/flask backend

***

##Build instructions
---
Install npm and create-react-app

```sudo dnf/yum/apt-get install npm
npm install -g create-react-appi```

Create throway folder

`create-react-app throwaway`

Clone git repo, move throwaway/node_modules to new directory

```git clone https://github.com/ntbloom/drinkbase.git
cd drinkbase
mv ../throwaway/node_modules ./```

Install npm dependencies

`npm install react-router-dom`

Run development version 

```cd ~/drinkbase
npm start```
