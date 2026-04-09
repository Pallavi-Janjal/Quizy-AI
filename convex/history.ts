import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveHistory = mutation({
  args: {
    topic: v.string(),
    mode: v.union(v.literal("quiz"), v.literal("flashcard")),
    data: v.any(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const historyId = await ctx.db.insert("history", {
      topic: args.topic,
      mode: args.mode,
      data: args.data,
      userId: args.userId ?? "guest",
      createdAt: Date.now(),
    });
    return historyId;
  },
});

export const getHistory = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("history")
      .order("desc")
      .collect();
  },
});

export const getSingleSet = query({
  args: { id: v.id("history") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
