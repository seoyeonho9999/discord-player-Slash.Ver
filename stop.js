const Discord = require('discord.js')

module.exports = {
    name: "정지",
    description: "노래를 정지해요.",
    async execute(interaction, client, player) {
        
        const nickname = interaction.member.nickname || interaction.member.user
        const queue1 = player.getQueue(interaction.guild.id);
        if (!queue1 || !queue1.playing) return interaction.reply('재생되고 있는 노래가 없습니다');
        if (queue1) queue1.destroy();

        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("정지")
                    .setDescription("<a:o_:941623085788975206> 노래를 정지했어요")
                ]
            })
        }
    }