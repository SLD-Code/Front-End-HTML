# -*- coding: utf-8 -*-
"""
Created on Fri Oct 15 18:07:06 2021

@author: nobin
"""
from flask import Flask,render_template,request,redirect,flash
import pymongo
client=pymongo.MongoClient()
Questions=client.Question_database
Question_Table=client.Question_table_database
question=Questions.Table
question_table=Question_Table.Table
Sample_Table=client.Sample_database
sample=Sample_Table.Table
page=Flask(__name__)

page.config['SECRET_KEY'] = 'super secret key'
@page.route("/",methods =["GET","POST"])
def gfg():
    if request.method == 'POST':
        userDetails = request.form
        return userDetails
    return render_template("audio.html")
box_ids=["hundreds","tens","ones"]
@page.route("/get_audio",methods=["POST"])
def random_box():
    if request.method=='POST':
        f = open("test.txt", "w")
        f.write(str(request.get_json()))
        f.close()
        return 'test'
    
if __name__ == '__main__':
    page.run(host='0.0.0.0',debug=True,port=5000)
