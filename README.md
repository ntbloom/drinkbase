
<img src=http://ntbloom.com/static/images/drinkBaseWhite.png width=250>
a cocktail-finding app built using a react frontend with python/flask backend


***
<br/>

### Build instructions

Install npm and create-react-app

```
$ [dnf/yum/apt-get] install npm
# npm install -g create-react-app
```
<br/>
Create throway folder for node dependencies

```
# create-react-app throwaway
```

<br/>
Clone git repo, move throwaway/node_modules to drinkbase/

```
# git clone https://github.com/ntbloom/drinkbase.git
# mv throwaway/node_modules drinkbase/
# rm -rf ../throwaway
```
<br/>
Install additional npm dependencies

```
# cd drinkbase/
# npm install react-router-dom
```
<br/>
Run development version 

```
# npm start
```

