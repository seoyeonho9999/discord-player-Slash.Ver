const Discord = require('discord.js')

module.exports = {
    name: "재개",
    description: "노래를 재개해요.",
    async execute(interaction, client, player) {
      
      const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);
await queue.setPaused(false);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏯️ 재개 ⏯️")
          .setDescription(`<a:o_:941623085788975206>\`${queue.current.title}\`(이)가 재개 되고 있습니다`)
            interaction.reply({ embeds: [pausedembed] })
    }
}
