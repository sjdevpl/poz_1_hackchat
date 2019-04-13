#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 12 20:41:32 2019

@author: Papito
"""

#Python libraries that we need to import for our bot
import random
from flask import Flask, request
from pymessenger.bot import Bot
from elasticsearch import Elasticsearch

app = Flask(__name__)
ACCESS_TOKEN = 'EAAD9BihriWABACKPLWlgn3mVo5NHttTaWO93pBWBsptvzzutmk2LuC1wKyif7odJiK05IH2aXVgJIvGltD1VZCZCtf0JvUSfsUndEJN0Bm1MtAz0y2Jo6UeWayKPPBuONbU8JX5WMj3a0LuZA0dMnFAPSOCBdSnxdR6LS6nEiXD6ZAWZBo6rZC'
VERIFY_TOKEN = 'VERIFY_TOKEN'
bot = Bot(ACCESS_TOKEN)
es = Elasticsearch()

#We will receive messages that Facebook sends our bot at this endpoint 
@app.route("/", methods=['GET', 'POST'])
def receive_message():
    if request.method == 'GET':
        print("1")
        """Before allowing people to message your bot, Facebook has implemented a verify token
        that confirms all requests that your bot receives came from Facebook.""" 
        token_sent = request.args.get("hub.verify_token")
        return verify_fb_token(token_sent)
    #if the request was not get, it must be POST and we can just proceed with sending a message back to user
    else:
        # get whatever message a user sent the bot
       output = request.get_json()
       for event in output['entry']:
          print()
          print(event)
          print()
          messaging = event['messaging']
          for message in messaging:
            if message.get('message'):
                #Facebook Messenger ID for user so we know where to send response back to
                sender_id = message['sender']['id']
                #recipient_id -> z allegro
                message_id = message['message']['mid']
                message_text = message['message'].get('text', '')
                timestamp = message['timestamp']
                attachments = [x['payload']['url'] for x in message.get('attachments', []) if x['type'] == 'image']
                
                doc = {
                        'sender_id': sender_id,
                        'message_id': message_id,
                        #'recipient_id' = recipient_id,
                        'message_text': message_text,
                        'timestamp': timestamp,
                        'attachments': attachments                        
                        }
                
                es.index(index="test-index", doc_type='tweet', body=doc)
                
    return "Message Processed"


def verify_fb_token(token_sent):
    #take token sent by facebook and verify it matches the verify token you sent
    #if they match, allow the request, else return an error 
    if token_sent == VERIFY_TOKEN:
        return request.args.get("hub.challenge")
    return 'Invalid verification token'


#chooses a random message to send to the user
def get_message():
    sample_responses = ["You are stunning!", "We're proud of you.", "Keep on being you!", "We're greatful to know you :)"]
    # return selected item to the user
    return random.choice(sample_responses)

#uses PyMessenger to send response to user
def send_message(recipient_id, response):
    #sends user the text message provided via input response parameter
    bot.send_text_message(recipient_id, response)
    return "success"

if __name__ == "__main__":
    app.run()
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    