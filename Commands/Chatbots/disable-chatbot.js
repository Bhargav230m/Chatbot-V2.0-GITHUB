const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const chatbot = require("../../Schemas/Chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disable-chatbot")
    .setDescription("Disables chatbot functionality in your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const { guild } = interaction;
    const data = await chatbot.findOne({ Guild: guild.id });
    if (!data) {
      interaction.reply({
        content: `Chatbot is already disabled`,
        ephemeral: true,
      });
    }
    if (data) {
      await chatbot.findOneAndDelete({ Guild: guild.id });
      interaction.reply({
        content: "Successfully disabled chatbot",
        ephemeral: true,
      });
    }
  },
};
