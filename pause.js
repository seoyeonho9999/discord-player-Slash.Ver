const Discord = require('discord.js')

module.exports = {
    name: "일시정지",
    description: "노래를 일시정지해요.",
    async execute(interaction, client, player) {
      
      const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply('<a:x_:941623055703236639> 재생되고 있는 노래가 없습니다');
        const paused = queue.setPaused(true);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏸️ 일시정지 ⏸️")
          .setDescription(`<a:o_:941623085788975206>\`${queue.current.title}\`(이)가 일시정지 되었습니다`)
            interaction.reply({ embeds: [pausedembed] })
    }
}