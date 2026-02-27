from confluent_kafka import Consumer

consumer_config = { "bootstrap.servers": "localhost:9092","group.id": "order-tracker", "auto.offset.reset": "earliest" }

consumer = Consumer(consumer_config)

consumer.subscribe(['orders'])

print("Consumer is listening for messages on 'orders' topic...")

try:
    while True:
        msg = consumer.poll(1.0)  # Wait for a message for up to 1 second
        if msg is None:
            continue  # No message received, continue polling
        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue

        print(f"Received order: {msg.value().decode('utf-8')}")
except KeyboardInterrupt:
    print("\n Stopping consumer...")
finally:
    consumer.close()