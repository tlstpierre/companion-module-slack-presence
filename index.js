import {
  InstanceBase,
  runEntrypoint,
  InstanceStatus,
  //CompanionFeedbackDefinitions,
//  CompanionFeedbackDefinition,
  combineRgb
  
} from '@companion-module/base'
import { initActions } from './actions.js'
import { configFields } from'./config.js'
import { FIELDS } from './fields.js'
import { UpgradeScripts } from './upgrade.js'
import { 
  feedbackDefinitions,
} from './feedback.js'
import { variableDefinitions } from './variables.js'
import {
  getStatus,
  getPresence,
} from './slackapi.js'

class SlackPresenceInstance extends InstanceBase{
  configUpdated(config) {
    this.config = config
    this.updateVariables()
    this.initActions()
    this.initFeedbacks()
    getPresence(this)
    getStatus(this)
  }

  init(config){
    this.config = config
    this.initVariables()
    this.initActions()
    this.initFeedbacks()
    getPresence(this)
    getStatus(this)
  }
  
  getConfigFields(){
    return configFields
  }
  
  // When module gets deleted
  async destroy() {
    // Stop any running feedback timers
    for (const timer of Object.values(this.feedbackTimers)) {
        clearInterval(timer)
    }
  }
  
  initActions() {
     initActions(this)
  }

	feedbackTimers = {}
  
	initFeedbacks() {
    feedbackDefinitions(this)
  }
  
  initVariables() {
    variableDefinitions(this)
  }

}

runEntrypoint(SlackPresenceInstance, UpgradeScripts)
