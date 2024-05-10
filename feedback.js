import { combineRgb } from '@companion-module/base'

export function feedbackDefinitions(self) {
  self.setFeedbackDefinitions({
    PresenceValue: {
      name: 'Change button style if online',
      type: 'boolean',
      label: 'Online',
      defaultStyle: {
        bgcolor: combineRgb(255,0,0),
        color: combineRgb(0,0,0),
      },
      callback: async (feedback,context) => {
        const online = self.getVariableValue('presenceValue')//  await context.parseVariablesInString('presenceValue')
        self.log('info',`Feedback is ${online}`)
        return online
      }
    },
    StatusText: {
      name: 'Change button style if custom status matches value',
      type: 'boolean',
      label: 'Custom Status',
      options: [
        {
          type: 'textinput',
          label: 'Status text value',
          id: 'statusTextValue'
        }
      ],
      defaultStyle: {
  			color: combineRgb(255, 255, 255),
  			bgcolor: combineRgb(0, 255, 0),
  		},
      callback: (feedback) => {
        const statusText = self.getVariableValue('statusMessage')
        return statusText === feedback.options.statusTextValue
  	  },
    }
  })
}