
<img src=http://ntbloom.com/static/images/drinkBaseWhite.png width=250>
a cocktail-finding app built using a react frontend with python/flask backend


***
<br/>

### Build instructions for React front-end

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

***
<br/>
### Build instructions for Flask back-end

Install python

```
$ [dnf/yum/apt-get] install python3 python3-pip python3-venv
```

Create virtual environment and install Flask

```
# cd ~/drinkbase/backend/
# python3 -m venv drinkEnv
# source drinkEnv/bin/activate
(drinkEnv)# pip3 install flask
```

Run development server.  Make sure drinkEnv is activated.

```
(drinkEnv)# python3 main.py
```
