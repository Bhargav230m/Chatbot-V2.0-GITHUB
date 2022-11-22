const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(interaction, client) {
    interaction.reply({
      content: `**PONG!** *Ping:* __${client.ws.ping}__`,
      ephemeral: true,
    });
  },
};
