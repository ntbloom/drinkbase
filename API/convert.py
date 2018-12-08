#!/usr/bin/python3
# convert.py
# converts floating point numbers to pretty mixed number fractions

from fractions import Fraction
import math
from decimal import Decimal

def mixNum(number):
    '''converts floating point number to mixed number as string'''
    wholeNum = math.floor(number)
    decimal = round(Decimal(number - wholeNum), 5)
    wholeNum = str(wholeNum)
    fraction = ''
    fraction = Fraction(decimal)
    #TODO: account for 1/3
    '''
    if fraction.numerator == 33:
        
    '''
    mixedNum = ''
    if wholeNum == "0":
        mixedNum = str(fraction)
    else:
        if decimal == 0:
            mixedNum = wholeNum
        else:
            mixedNum = wholeNum + " " + str(fraction)
    '''print("number: ",
            number,
            "\ndecimal: ",
            decimal, 
            "\nfraction: ",
            fraction,
            "\nmixedNum: ",
            mixedNum,
            "\n")
    '''
    return mixedNum

