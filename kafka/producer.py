import uuid
import json

from confluent_kafka import Producer

producer_config = {'bootstrap.servers': 'localhost:9092'}

producer = Producer(producer_config)
def delivery_report(err, msg):
    if err :
        print(f'Message delivery failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}] at offset {msg.offset()}')


order = {
    'order_id': str(uuid.uuid4()),
    'user': 'john_doe',
    "item": "laptop",
    'quantity': 1,
}

value = json.dumps(order).encode('utf-8')

producer.produce(topic='orders', value=value,
callback=delivery_report)




producer.flush() #buffered events are sent to the broker before the program exits   