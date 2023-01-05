const Schema = require("../../Schemas/Chatbot");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message) {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return;

      if (
        message.channel.id !== data.Channel ||
        !message.guild ||
        message.author.bot
      )
        return;
      try {
        channel.sendTyping();
        const res = await axios.get(
          `http://api.brainshop.ai/get?bid=170682&key=B1l2GDjlTJgjt5W2&uid=1&msg=${encodeURIComponent(
            message.content
          )}`
        );
        message.reply({ content: `<@${message.member.id}> ${res.data.cnt}` });
      } catch (err) {
        const crash = await message.guild.channels.cache.get(data.CrashReport);
        const embed = new EmbedBuilder()
          .setAuthor({ name: "Crashed" })
          .setTitle("Anti Crash System")
          .setDescription(
            `It looks like that the that Anti Crash System protected Chatbot from crashing\nError: **${err}**\nNote: *If you are a developer please check the console for more information.*`
          )
          .setColor("Random")
          .setTimestamp();
        console.log(err);
        crash.send({ embeds: [embed] });
      }
    });
  },
};
