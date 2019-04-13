#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 12 21:54:39 2019

@author: i
"""

from flask import Flask, request

app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def receive_message():
    print("hmmmm\n\n/n/n")
    return str(request).split("=")[2].split(".")[0].split("&")[0]


if __name__ == '__main__':
    app.run()
