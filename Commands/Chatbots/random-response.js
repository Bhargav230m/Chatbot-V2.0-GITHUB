const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-response")
    .setDescription("Get a random response from the AI"),
  async execute(interaction, client) {
    try {
    Hi = "Hello there";
    const res = await axios.get(
      `http://api.brainshop.ai/get?bid=170682&key=B1l2GDjlTJgjt5W2&uid=1&msg=${encodeURIComponent(
        Hi
      )}`
    );
  interaction.reply({ content: `${res.data.cnt}`, ephemeral: true });
    }catch (err) {
      console.log("ERROR!")
    }
  },
};
