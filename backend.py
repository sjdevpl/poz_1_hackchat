#!/usr/bin/env python3

from flask import Flask, request, session, abort
from flask_restful import Resource, Api, reqparse
from flask_restful.utils import cors
from flask_session import Session
from elasticsearch import Elasticsearch
from pymessenger.bot import Bot


import time

app = Flask(__name__)
api = Api(app)
api.decorators=[cors.crossdomain(origin='*')]
app.config['SECRET_KEY'] = '_5#y2L"F4Q8zsdhgfdh'
app.config['SESSION_TYPE'] = "filesystem"
Session(app)

ACCESS_TOKEN = 'EAAD9BihriWABACKPLWlgn3mVo5NHttTaWO93pBWBsptvzzutmk2LuC1wKyif7odJiK05IH2aXVgJIvGltD1VZCZCtf0JvUSfsUndEJN0Bm1MtAz0y2Jo6UeWayKPPBuONbU8JX5WMj3a0LuZA0dMnFAPSOCBdSnxdR6LS6nEiXD6ZAWZBo6rZC'
bot = Bot(ACCESS_TOKEN)

es = Elasticsearch()
ES_INDEX="messages"
ES_DOC_TYPE="message"


class Chat(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('message')
    parser.add_argument('buyer_id')

    def get(self, mtimestamp: int):
        if "login" in session:
            es.indices.refresh(index=ES_INDEX)
            res = es.search(index=ES_INDEX, body=
            {
             "from" : 0, "size" : 10000,
             "query":
                {"bool":
                    {"must": [
                        {"range": {"timestamp": {"gt": mtimestamp}}},
                        {"match": {"seller_id": session['login']}}
                    ]}
                }
            })
            return [x['_source'] for x in res['hits']['hits']]
        else:
            abort(401)

    def put(self, mtimestamp: int):
        if "login" in session:
            args = self.parser.parse_args()
            if args["message"] is None or args['buyer_id'] is None:
                abort(400)
            send_message(session['login'], args['buyer_id'], args["message"])
        return self.get(mtimestamp)


class Login(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('login')
    parser.add_argument('password')

    def post(self):
        args = self.parser.parse_args()
        if args['login'] == "sklep-mombasa1" and args['password'] == "admin":
            # init session
            session['login'] = args['login']
            return {"message": "Logged in successfully"}
        else:
            abort(401)


api.add_resource(Chat, '/api/chat/v1.0/message/<int:mtimestamp>')
api.add_resource(Login, '/api/chat/v1.0/login')


def send_message(seller_id, buyer_id, message):
    resp = bot.send_text_message(buyer_id, message)

    doc = {
        'buyer_id': buyer_id,
        'seller_id': seller_id,
        'offer_id': None,
        'direction': True,  # from seller to buyer
        'message_id': resp['message_id'],
        'message_text': message,
        'timestamp': int(time.time()*1000),
        'attachments': []
    }

    es.index(index=ES_INDEX, doc_type=ES_DOC_TYPE, body=doc)


if __name__ == '__main__':
    app.run(debug=True, port=5001, host="0.0.0.0")
