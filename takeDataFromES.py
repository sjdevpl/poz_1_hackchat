#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Apr 13 05:12:32 2019

@author: Patryk J
"""

from elasticsearch import Elasticsearch
es = Elasticsearch()
res = es.search(index="test-index", body={"query": {"match_all": {}}})
print("Got %d Hits:" % res['hits']['total'])
for hit in res['hits']['hits']:
    print(f"{hit['_source']['message_text']}")

print()
x = 1000
res = es.search(index="test-index", body={"query": {"range": { "timestamp": { "gte": x}}}})
print("Got %d Hits:" % res['hits']['total'])
for hit in res['hits']['hits']:
    print(f"{hit['_source']['message_text']}")


