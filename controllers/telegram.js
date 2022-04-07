import Telegraf from "telegraf";
import WizardScene from "telegraf/scenes/wizard/index.js";
import Stage from "telegraf/stage.js";
import session from "telegraf/session.js";
import dotenv from "dotenv";
dotenv.config();

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Initialize Session between requests
bot.use(session());
bot.use((ctx, next) => {
  if (ctx.from.id == process.env.ADMIN_TG_ID) {
    return next();
  }
  ctx.reply("You are not authorized to use this bot");
});

bot.command("start", (ctx) => {
  ctx.reply(
    "Hello, I am a bot. I can help you to find songs.\n\n" +
      "You can use the following commands:\n" +
      "/start - Start the bot\n" +
      "/help - Get help\n" +
      "/search - Search for a song\n" +
      "/songs - Get all songs\n" +
      "/albums - Get all albums\n" +
      "/artists - Get all artists\n" +
      "/genres - Get all genres\n" +
      "/request - Request a song\n" +
      "/stop - Stop the bot\n"
  );
});

// Function for sending Song Request to Admin.
const requestNewSong = async (data) => {
  console.log(data);
  const text = `Hey, Admin we have new request: \n\nUsername: ${data.name.toUpperCase()}\nEmail: ${
    data.email
  }\nType: ${data.requestType.toUpperCase()}\nName: ${data.songName.toUpperCase()}`;
  const res = await bot.telegram.sendMessage(
    process.env.TELEGRAM_ADMIN_CHAT_ID,
    text,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Approve 👍", callback_data: "approve" },
            { text: "Reject 👎", callback_data: "reject" },
          ],
        ],
      },
      parse_mode: "HTML",
    }
  );
  return res;
};

bot.action("approve", async (ctx) => {
  const entities = ctx.update.callback_query.message.text;
  await ctx.pinChatMessage(ctx.update.callback_query.message.message_id);
  if (entities.search(/\bSONG\b/) >= 0 == true) {
    const previousRequest =
      ctx.update.callback_query.message.text + "\n\nREQUEST ACCEPTED 👍";
    await ctx.editMessageText(previousRequest, { entities });
    const songName = ctx.update.callback_query.message.text
      .split("Name")[1]
      .replace(":", "")
      .trim();
    //   await getSongByName(songName, ctx);
    return;
  } else {
    console.log(entities.search);
    const previousRequest =
      ctx.update.callback_query.message.text + "\n\nREQUEST ACCEPTED 👍";
    await ctx.editMessageText(previousRequest, { entities });
    const albumName = ctx.update.callback_query.message.text
      .split("Name")[1]
      .replace(":", "")
      .trim();
    //   await getSongsByAlbum(albumName, ctx);
    return;
  }
});

bot.action("reject", async (ctx) => {
  const entities = ctx.update.callback_query.message.entities;
  const previousRequest =
    ctx.update.callback_query.message.text + "\n\nREQUEST REJECTED! 👎";
  await ctx.editMessageText(previousRequest, { entities });
  // await ctx.unpinChatMessage(ctx.update.callback_query.message.message_id)
});

bot.launch();

export { requestNewSong };
