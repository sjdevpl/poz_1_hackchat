#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 12 20:41:32 2019

@author: Papito
"""

# Python libraries that we need to import for our bot
import random
from flask import Flask, request
from pymessenger.bot import Bot
from elasticsearch import Elasticsearch

app = Flask(__name__)
ACCESS_TOKEN = 'EAAD9BihriWABACKPLWlgn3mVo5NHttTaWO93pBWBsptvzzutmk2LuC1wKyif7odJiK05IH2aXVgJIvGltD1VZCZCtf0JvUSfsUndEJN0Bm1MtAz0y2Jo6UeWayKPPBuONbU8JX5WMj3a0LuZA0dMnFAPSOCBdSnxdR6LS6nEiXD6ZAWZBo6rZC'
VERIFY_TOKEN = 'VERIFY_TOKEN'
bot = Bot(ACCESS_TOKEN)
es = Elasticsearch()

# We will receive messages that Facebook sends our bot at this endpoint
@app.route("/", methods=['GET', 'POST'])
def receive_message():
    if request.method == 'GET':
        """Before allowing people to message your bot, Facebook has implemented a verify token
        that confirms all requests that your bot receives came from Facebook.""" 
        token_sent = request.args.get("hub.verify_token")
        return verify_fb_token(token_sent)
    # if the request was not get, it must be POST and we can just proceed with sending a message back to user
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
                # Facebook Messenger ID for user so we know where to send response back to
                sender_id = message['sender']['id']
                message_id = message['message']['mid']
                message_text = message['message'].get('text', '')
                timestamp = message['timestamp']
                attachments = [x['payload']['url'] for x in message['message'].get('attachments', []) if x['type'] == 'image']
                print(f"attachemnts= {attachments}")

                # allegro parsing and data sending
                # TODO: seller_id
                # TODO: offer_id
                seller_id = "sklep-mombasa1"
                offer_id = 7894993139

                doc = {
                        'buyer_id': sender_id,
                        'seller_id': seller_id,
                        'offer_id': offer_id,
                        'direction': False,             # from buyer to seller
                        'message_id': message_id,
                        'message_text': message_text,
                        'timestamp': timestamp,
                        'attachments': attachments
                        }
                
                es.index(index="test-index", doc_type='tweet', body=doc)
                
    return "Message Processed"


def verify_fb_token(token_sent):
    # take token sent by facebook and verify it matches the verify token you sent
    # if they match, allow the request, else return an error
    if token_sent == VERIFY_TOKEN:
        return request.args.get("hub.challenge")
    return 'Invalid verification token'


# uses PyMessenger to send response to user
def send_message(recipient_id, response):
    # sends user the text message provided via input response parameter
    bot.send_text_message(recipient_id, response)
    return "success"


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
