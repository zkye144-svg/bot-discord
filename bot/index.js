const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ActionRowBuilder, 
  Events 
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  console.log(`Bot online como ${client.user.tag}`);

  const channel = client.channels.cache.get("1487584372835090562");

  const embed = new EmbedBuilder()
    .setTitle("Verificação")
    .setDescription("Clique no botão para se verificar")
    .setColor("#2b2d31");

  const botao = new ButtonBuilder()
    .setCustomId("verificar")
    .setLabel("Iniciar Verificação")
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(botao);

  channel.send({
    embeds: [embed],
    components: [row]
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'verificar') {
    const role = interaction.guild.roles.cache.find(r => r.name === "Membro");

    if (!role) {
      return interaction.reply({ content: "Cargo não encontrado!", ephemeral: true });
    }

    await interaction.member.roles.add(role);

    await interaction.reply({
      content: "✅ Você foi verificado!",
      ephemeral: true
    });
  }
});

client.login("MTQ4NzU5MzgwMzQzMzkwMjIzMA.GrPPuV.f8eBM4E3ms3C5jeQAS0nnOa7NCCPc3JbX_uWg0");