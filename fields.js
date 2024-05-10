export const FIELDS = {
	StatusMessage: {
	  type: 'textinput',
    label: 'Status Message',
    id: 'statusMessage',
    default: 'Testing Companion',
    useVariables: 'true'
	},
  
  StatusEmoji: {
    type: 'textinput',
    label: 'Emoji code',
    id: 'statusEmoji',
    default: ':speech_baloon:'
  },
  
  Status: {
    type: 'dropdown',
    label: 'status',
    id: 'statusValue',
    default: 'auto',
    choices: [
      { id: 'auto', label: 'Auto'},
      { id: 'away', label: 'Away'},
    ]
  }
};
