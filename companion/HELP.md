## Slack Presence
#### Update your slack status and presence information

This module requires a Slack app to be approved in your workspace.  You will need the following API tokens:

- A bot token with users.read permissions
- A user token with users.profile:read and users.profile:write, as well as users:write and identity

Once you have the tokens, populate the appropriate config fields and apply.  The module should connect to the slack API and fetch your current presence and custom status information.

## Things you can do

- Set your presence to either auto or Away
- Set your custom status message and emoji (use the :emoji: format)
- Use a variable to display your current status message on a button
- Use feedbacks to display your presence status
- Use feedbacks to indicate if your status message matches a given string (light up the button if you have set lunch, for example)