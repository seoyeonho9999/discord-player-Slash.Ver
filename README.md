# DISCORD-PLAYER
## 적용하기
discord-player slashcommand ver

https://github.com/seoyeonho9999/discord-player-Slash.Ver

모듈을 전과 동일합니다
discord-player, discord.js, opusscript, ffmpeg-static, yt-vimeo-thumbnail, comma-number

오류 DM 받습니다
DM은 seoyeonho9999#4988 여기 또는 seoyeonho1234#3212 으로 보내주세요
2차 수정가능합니다. 2차 배포는 금지합니다. 라이센스 표기 안하셔도 됩니다

핸들러
//index.js
client.on("interactionCreate", async interaction =>{
    
    if(!interaction.isCommand()) return;
    const command = client.slashcommands.get(interaction.commandName)
    const { MessageEmbed } = require('discord.js')
    if(!command) return
    try {
            await command.execute(interaction, client, player)
    } catch (err) {
        console.error(err)
        await interaction.reply({content: "오류가 발생했습니다", ephemeral: true })
    }
})
플레이어
//index.js
const { Player } = require('discord-player')
const player = new Player(client, {
    ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 32 * 1024 * 1024
    }
  })

이벤트
//index.js
const comma = require('comma-number')
player.on("trackStart", (queue, track) => {
    const { getYouTubeThumbnail } = require("yt-vimeo-thumbnail/dist/youtube/getYouTube");
            let playl = new (require('discord.js')).MessageEmbed()
                      .setColor("BLUE")
                      .setTitle(":notes: 노래를 재생합니다! :notes:")
                      .setURL(`${track.url}`)
                      .setDescription(`<a:o_:941623085788975206>`+ `\`${ track.title }\`` + `(이)가 지금 재생되고 있습니다!`)
                      .addField("길이", `${track.duration}`, true)
                      .addField("조회수", `${comma(track.views)}`, true)
                      .addField("게시자", `${track.author}`, true)
                    .setThumbnail(getYouTubeThumbnail(`${track.url}`))
                      queue.metadata.send({ embeds: [playl] })
          })
player.on("trackAdd", (queue, track) => {
            const { getYouTubeThumbnail } = require("yt-vimeo-thumbnail/dist/youtube/getYouTube");
 

        let playgo = new (require('discord.js')).MessageEmbed()
                  .setColor("BLUE")
                  .setTitle(":notes: 노래를 재생목록에 추가합니다! :notes:")
                  .setURL(`${track.url}`)
                  .setDescription(`<a:o_:941623085788975206>`+ `\`${ track.title }\`` + `(이)가 재생목록에 추가되었습니다!`)
                  .addField("길이", `${track.duration}`, true)
                  .addField("조회수", `${comma(track.views)}`, true)
                  .addField("게시자", `${track.author}`, true)
                    .setThumbnail(getYouTubeThumbnail(`${track.url}`))
                  queue.metadata.send({ embeds: [playgo] })
          })
    
    player.on("queueEnd", (queue, track) => {
        let playl = new (require('discord.js')).MessageEmbed()
                  .setColor("BLUE")
                  .setTitle("끝!")
                  .setDescription(`노래가 끝났어요!`)
                  queue.metadata.send({ embeds: [playl] })
      })

