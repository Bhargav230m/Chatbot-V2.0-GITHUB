const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const color = require("chalk");
const { loadEvents } = require("../../Handlers/eventHandler");
const { loadCommands } = require("../../Handlers/commandHandler");
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("Refreshes the whole Bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    try {
      console.log(" ");
      console.log(" ");
      console.log(" ");
      console.log(color.green("Running refresh...."));
      console.clear();
      loadEvents(client);
      loadCommands(client);
      interaction.reply({ content: "Bot has been refreshed", ephemeral: true });
    } catch (err) {
      console.log(color.red("A Error occurred while refreshing the bot"));
      console.log(err);
      interaction.reply({
        content: "An error occured!\nPlease check the console for any error",
        ephemeral: true,
      });
    }
  },
};
