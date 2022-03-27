const Discord = require('discord.js')

module.exports = {
    name: "스킵",
    description: "노래를 스킵해요.",
    async execute(interaction, client, player){
        
        const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: '<a:x_:941623055703236639> 현재 재생되고 있는 음악이 없습니다.' })

        const currentTrack = queue.current;
        const success = queue.skip();

        return interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`<a:o_:941623085788975206> \`${currentTrack}\` (을)를 건너뛰었어요!`)
            ]
        });
    }
}