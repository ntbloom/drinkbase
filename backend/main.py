#! usr/bin/env python3
# main.py, the main Flask app on drinkbase


from flask import Flask, render_template, request, redirect
import drinkFinder

app = Flask(__name__)

@app.route('/drinkbase/results', methods=['POST'])
def printDrinks():
    included = []
    excluded = []
    included.clear()
    excluded.clear()
    incl = request.form['includedIngredients']
    if len(incl)>1:
        incl = incl.split(',')
        for i in incl:
            i = i.strip()
            included.append(i)
    # print('\n\n', 'included: ', included) # for debugging
    excl = request.form['excludedIngredients']
    if len(excl)>1:
        excl = excl.split(',')
        for i in excl:
            i = i.strip()
            excluded.append(i)
    # print('\n\n', 'excluded: ', excluded) # for debugging
    rawDrinks = list(drinkFinder.drinkSearch(included, excluded))
    master = []
    for drink in rawDrinks:
        drinks = {}
        drinks['name'] = drink
        ingredients = drinkFinder.getRecipe(drink)
        drinks['recipe'] = ingredients
        master.append(drinks)
    # print('master: ', master) #for debugging
    if len(included)!=0:
        including = ', '.join(included)
    else:
        including = 'nothing'
    if len(excluded)!=0:
        excluding = ', '.join(excluded)
    else:
        excluding = 'nothing'
    if len(master)==0:
        return render_template('resultsEmpty.html')
    else:
        return render_template('results.html', drinks = master, qty = len(master), included = including, excluded = excluding)

@app.route('/drinkbase')
def index():
    return render_template('index.html')

@app.route('/')
def forwarding():
    return redirect('/drinkbase', code=302)

# error handling
@app.errorhandler(404)
def whoops(i):
    return render_template('404.html'), 404
@app.errorhandler(500)
def internal_server_error(error):
    return render_template('404.html'), 500
@app.errorhandler(405)
def whoops(i):
    return render_template('404.html'), 405

if __name__ == '__main__':
    app.run()

