import amqp, { Channel, Connection, ChannelModel } from "amqplib";
import config from "../config/config";

class RabbitMQService {
    private connection!: ChannelModel;
    private channel!: Channel;

    constructor() {
        this.init();
    }

    async init() {
        try {
            this.connection = await amqp.connect(config.msgBrokerURL!);
            this.channel = await this.connection.createChannel();
            console.log("RabbitMQ connected");
        } catch (error) {
            console.error("RabbitMQ connection error:", error);
        }
    }

    async publish(queue: string, message: any) {
        if (!this.channel) await this.init();
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async consume(queue: string, callback: (msg: any) => void) {
        if (!this.channel) await this.init();
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, (msg) => {
            if (msg) {
                callback(JSON.parse(msg.content.toString()));
                this.channel.ack(msg);
            }
        });
    }
}

export const rabbitMQService = new RabbitMQService();
