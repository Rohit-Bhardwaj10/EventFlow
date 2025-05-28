import { NextApiRequest, NextApiResponse } from "next";
import { EventInfoModel } from "@/models/event";
import { dbConnect } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await EventInfoModel.find({});
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ message: "Failed to get events" });
      }
      break;
    case "POST":
      try {
        const newEvent = new EventInfoModel(body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
      } catch (error) {
        res.status(400).json({ message: "Failed to create event" });
      }
      break;
    case "PUT":
      try {
        const updatedEvent = await EventInfoModel.findByIdAndUpdate(
          body._id,
          body,
          { new: true }
        );
        res.status(200).json(updatedEvent);
      } catch (error) {
        res.status(400).json({ message: "Failed to update event" });
      }
      break;
    case "DELETE":
      try {
        const deletedEvent = await EventInfoModel.findByIdAndDelete(body._id);
        res.status(200).json(deletedEvent);
      } catch (error) {
        res.status(400).json({ message: "Failed to delete event" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
