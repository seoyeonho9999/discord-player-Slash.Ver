const { QueryType } = require('discord-player')
const Discord = require('discord.js')

module.exports = {
  name: '재생',
  description: '노래를 재생해요.',
  options: [
      {
        name: "query",
        description: "노래 이름을 적어주세요",
        type: "STRING",
        required: true
    }
  ],
  async execute(interaction, client, player) {
    /**
     * @param { CommandInteraction } Interaction
     */ 
    const query = interaction.options.getString("query")
    const nickname = interaction.member.nickname || interaction.member.user
    
    const searchResult = await player.search(query, {
      requestedBy: interaction.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {})

    if (!searchResult || !searchResult.tracks.length) return interaction.reply('<a:x_:941623055703236639> 검색된 결과가 없습니다')

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel
    })

    try {
      if (!queue.connection) await queue.connect(interaction.member.voice.channel)
    } catch (error) {
      console.log(error)
      player.deleteQueue(interaction.guild.id)
      return interaction.reply('음성 채널에 참여할 수 없습니다')
    }
    let playembed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("로딩중..")
    .setDescription(`track..🎧`)
    .setTimestamp()
    interaction.reply({ embeds: [playembed] })
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
    if (!queue.playing) await queue.play()
          }
      }
      
