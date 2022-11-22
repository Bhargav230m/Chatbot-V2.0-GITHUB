const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const chatbot = require("../../Schemas/Chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enable-chatbot")
    .setDescription("Set up your chatbot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel for chatbot.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("crash-reports")
        .setDescription("Channel where bot will send crash reports")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const channel = options.getChannel("channel");
    const crash = options.getChannel("crash-reports");
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.SendMessages
      )
    ) {
      interaction.reply({
        content: "I don't have permissions for this.",
        ephemeral: true,
      });
    }

    chatbot.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (data) {
        interaction.reply({
          content:
            "We are sorry! But you can't create more than one chatbot channel",
          ephemeral: true,
        });
        return;
      }

      if (!data) {
        await chatbot.create({
          Guild: interaction.guild.id,
          Channel: channel.id,
          CrashReport: crash.id,
        });
      }
      interaction.reply({
        content: "Succesfully enabled Chatbot",
        ephemeral: true,
      });

      const embeds = new EmbedBuilder()
        .setAuthor({ name: "Chatbot Anti Crash System V2.0" })
        .setDescription(
          "Chatbot Anti Crash System been enabled for this channel"
        )
        .setColor("Random");

      const embed = new EmbedBuilder()
        .setAuthor({ name: "Chatbot System V2.0" })
        .setDescription("Chatbot has been enabled for this channel")
        .setColor("Random");

      channel.send({ embeds: [embed] });
      crash.send({ embeds: [embeds] });
    });
  },
};
