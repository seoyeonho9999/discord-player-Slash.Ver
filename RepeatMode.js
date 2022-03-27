const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "반복재생",
    description: "노래를 반복재생해요",
    options: [
          {
            name: "mode",
            description: "모드를 선택해주세요",
            type: "STRING",
            required: true,
            choices: [
              {
                name: "켜기",
                value: "1",
              },
              {
                name: "끄기",
                value: "2",
              }
            ],
          },
        ],
  async execute(interaction, client, player) {
    const message = interaction
    const queue = player.getQueue(interaction.guild.id)
    const 옵션값 = interaction.options.getString("mode")

    if (!queue || !queue.playing) return interaction.reply({ content: '<a:x_:941623055703236639> 현재 재생되고 있는 음악이 없습니다.' })

    if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: '<a:x_:941623055703236639> 봇이 있는 음성 채널에 들어가 주십시오.' })
    if (옵션값 == '1') {
      queue.setRepeatMode(1)

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('🔁 반복재생 🔁')
      .setDescription(`<a:o_:941623085788975206> 반복재생 모드가 활성화 되었어요`)
      .addField("요청자", `${interaction.member.user}`, true)

      message.reply({ embeds: [embed] })
    } else if (옵션값 == '2') {
      queue.setRepeatMode(2)

      const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('🔁 반복재생 🔁')
      .setDescription(`<a:x_:941623055703236639> 반복재생 모드가 비활성화 되었어요`)
      .addField("요청자", `${interaction.member.user}`, true)

      interaction.reply({ embeds: [embed] })
    } else {
      return interaction.reply({ content: '<a:x_:941623055703236639> 잘못된 경로로 접근하셨습니다' })
    }
  }
}