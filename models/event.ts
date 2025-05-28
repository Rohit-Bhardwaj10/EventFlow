import { Document, model, Schema } from "mongoose";

export interface EventInfo extends Document {
  name: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  category: string;
  coverImage: string;
  ticketLink: string;
  paid: boolean; 
  price: number | null;
}

const eventInfoSchema = new Schema<EventInfo>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: { type: String, required: true },
    ticketLink: { type: String, required: true },
    paid: { type: Boolean, required: true },
    price: { type: Number, required: false  },    
  },
  {
    timestamps: true,
  }
);

export const EventInfoModel = model<EventInfo>("EventInfo", eventInfoSchema);
