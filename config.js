export const configFields = [
  {
    id: 'bottoken',
    type: 'textinput',
    label: 'Bot token for Slack API',
    width: 64
  },
  {
    id: 'usertoken',
    type: 'textinput',
    label: 'User token for Slack API',
    width: 64
  },
  {
    id: 'apibase',
    type: 'textinput',
    label: 'Slack API base URL',
    width: 24,
    default: 'https://slack.com/'
  },
  {
    id: 'userID',
    type: 'textinput',
    label: 'User ID code',
    width: 24,
    default: ''
  }
]