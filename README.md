
<img src=http://ntbloom.com/static/images/drinkBaseWhite.png width=250>
a cocktail-finding app built using a react frontend with python/flask backend

---

<br/>

### Build instructions for React front-end

Install npm

```
sudo [dnf/yum/apt-get] install npm
```
<br/>
Clone git repo, bring in JS libraries

```
git clone https://github.com/ntbloom/drinkbase.git
cd drinkbase/
npm install
```

<br/>

Run development version 

```
npm start
```


#### Troubleshooting node server
* make sure you have necessary dependencies (not hosted on repo):
  * images
* automatically update to latest js packages:
```npm install ```

---

<br/>

### Build instructions for Flask back-end

Install python

```
$ [dnf/yum/apt-get] install python3 python3-pip python3-venv
```

Create virtual environment and install python dependencies

```
cd ~/drinkbase/API/
python3 -m venv drinkEnv
source drinkEnv/bin/activate
pip3 install flask requests
```

Run development server

```
python3 main.py
```

#### Troubleshooting Flask server
* make sure virtual environment is activated
* ensure proper libraries installed:
  * Flask
  * Requests
* make sure localhost:5000 port is open
* see API/API_README for postgresql build instructions
