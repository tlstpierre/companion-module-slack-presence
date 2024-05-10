import {
  InstanceStatus,  
} from '@companion-module/base'


export function getStatus(self){
    try {
      fetch (`${self.config.apibase}/api/users.profile.get`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${self.config.usertoken}`,
        }
      })
      .then(res => {
        if (res.ok){
          self.updateStatus(InstanceStatus.Ok)
          res.json()
          .then(data => {
            self.log('debug',`json response from users.profile.get is ${JSON.stringify(data)}`)
//            self.log('debug',`Current status is ${data.profile}`)
 //           self.log('info',`status text is ${data.profile.status_text}`)
            self.setVariableValues({
              ['statusMessage']: data.profile.status_text,
              ['statusEmoji']: data.profile.status_emoji,
              ['statusEmojiDescription']: data.profile.status_emoji_display_info.emoji_name,
              ['statusExpiration']: data.profile.status_expiration,
    				})

            self.checkFeedbacks()
          })
        } else {
          self.log('error',res.statusText)
          self.updateStatus(InstanceStatus.BadConfig)
        }
      })
    } catch (err) {
      self.log('error',`POST error was ${err.text}}`)
    }
  }
  
export function getPresence(self) {
  try {
    fetch (`${self.config.apibase}/api/users.getPresence?user=${self.config.userID}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${self.config.usertoken}`,
      }
    })
    .then(res => {
      if (res.ok){
        self.updateStatus(InstanceStatus.Ok)
        res.json()
        .then(data => {
//          self.log('debug',`Current status is ${data.presence}`)
          self.log('debug',`json response from users.getPresence is ${JSON.stringify(data)}`)

          let online = false
          if (data.presence != 'away') {
            online = true
          } else {
          }

  				self.setVariableValues({
  					['presenceValue']: online,
  				})

          self.checkFeedbacks('PresenceValue')
        })
      } else {
        self.log('error',res.statusText)
        self.updateStatus(InstanceStatus.BadConfig)
      }
    })
  } catch (err) {
    self.log('error',`POST error was ${err.text}}`)
  }
}