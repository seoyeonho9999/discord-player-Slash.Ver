const Discord = require('discord.js')

module.exports = {
    name: "볼륨",
    description: "볼륨을 조절해요.",
    options: [
        {
            name: "볼륨",
            description: "조절하고 싶은 볼륨을 적어주세요",
            type: "STRING",
            required: true

        }
    ],
    async execute(interaction, client, player) {
        
        const nickname = interaction.member.nickname || interaction.member.user
        const arg1 = interaction.options.getString("볼륨")
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: '현재 재생되고 있는 음악이 없습니다.' })
        
        if ((arg1) < 0 || (arg1) > 300) return void interaction.reply({ content: "볼륨은 0~300까지만 조절 할 수 있습니다" });
        const success = queue.setVolume(arg1);

        return interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("🎧 볼륨 🎧")
                    .setDescription(`${arg1}%`)
            ]
        })
    }
}