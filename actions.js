import { FIELDS } from './fields.js'
import {
  InstanceStatus,  
} from '@companion-module/base'

export function initActions(self) {
  self.log('info','Sending log message from initActions')
  self.setActionDefinitions({
    setPresence: {
      name: 'Set Presence',
      options: [FIELDS.Status],
      callback: async(action,context) => {
        self.log('info','Running set status')
        const body = {
          presence: action.options.statusValue,
        };
        self.log('info',`${body.presence}`)
        try {
          fetch (`${self.config.apibase}/api/users.setPresence`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
              'Content-type': 'application/json;  charset=utf8',
              'Authorization': `Bearer ${self.config.usertoken}`,
            }
          })
          .then(res => {
            if (res.ok){
//              self.log('info','Result was ok')
	            self.updateStatus(InstanceStatus.Ok)
              res.json()
              .then(data => {
                self.log('debug',`json from users.setPresence is ${JSON.stringify(data)}`)
                if (data.ok) {
                  if(action.options.statusValue === 'away'){
                    self.setVariableValues({
                      'presenceValue': false,
                    })
                  } else {
                    self.setVariableValues({
                      'presenceValue': true,
                    })
                  }
                  self.checkFeedbacks()
                } else {
                  self.updateStatus(InstanceStatus.BadConfig)
                }
              })
              
            } else {
              self.log('error from self.setPresence',res.statusText)
            }
          })
        } catch (err) {
          self.log('error',`POST error was ${err.text}}`)
        }
      }
    },
    setCustomStatus: {
      name: 'Set Status',
      options: [FIELDS.StatusMessage,FIELDS.StatusEmoji],
      callback: async(action,context) => {
        self.log('info','Running set custom status')
        const body = {
          profile: {
            status_text: action.options.statusMessage,
            status_emoji: action.options.statusEmoji
          }
        };
        self.log('debug',`Setting custom status to ${body.profile.status_text}`)
        try {
          fetch (`${self.config.apibase}/api/users.profile.set`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
              'Content-type': 'application/json; charset=utf8',
              'Authorization': `Bearer ${self.config.usertoken}`,
            }
          })
          .then(res => {
            if (res.ok){
//              self.log('debug','Result was ok')
	            self.updateStatus(InstanceStatus.Ok)
              res.json()
              .then(data => {
                self.log('debug',`json response from users.profile.set is ${JSON.stringify(data)}`)              
                if (data.ok) {
          				self.setVariableValues({
          					['statusMessage']: data.profile.status_text,
                    ['statusEmoji']: data.profile.status_emoji,
                    ['myUsername']: data.username
          				})
                  self.checkFeedbacks('StatusText')
                } else {
                  self.updateStatus(InstanceStatus.BadConfig)
                }
              })
            } else {
              self.log('error',res.statusText)
            }
          })
        } catch (err) {
          self.log('error',`POST error was ${err.text}}`)
        }
      }
    }   
  }) 
}